import { useState, useEffect, useRef } from 'react';
import './progressbar.scss';

const htmlWhitespace = (str: string) => str.replaceAll(' ', '&nbsp;');

export default function Progressbar(props: any) {
    const { hCells, title, percent } = props;

    const [isVisible, setIsVisible] = useState(false);
    const thisRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkSize = () => {
            const bounding = thisRef.current?.getBoundingClientRect();

            if (bounding !== undefined 
                && bounding.top >= 200
                && bounding.left >= 0 
                && bounding.right <= window.innerWidth 
                && bounding.bottom <= window.innerHeight - 100) {
                setIsVisible(true);
                scrollableDiv?.removeEventListener('scroll', checkSize);
            }
        }

        const scrollableDiv = document.querySelector('.content-flex > .content');
        scrollableDiv?.addEventListener('scroll', checkSize, {passive: true});

        checkSize();

        return () => {
            scrollableDiv?.removeEventListener('scroll', checkSize);
        }
    }, []);

    const usingCells = hCells - 2;

    const progressText = getProgressText(usingCells, title, percent);
    const fakeProgressText = getFakeProgressText(usingCells, title, percent);

    return (
        <div className="progress-item" ref={thisRef}>
            <div className="progress-item-uncolored" dangerouslySetInnerHTML={{ __html: fakeProgressText }}></div>
            <div className={`progress-item-colored ${isVisible === false ? '' : 'loaded'}`} dangerouslySetInnerHTML={{ __html: progressText }}></div>
        </div>
    );
}

function getFakeProgressText(usingCells: number, title: string, percent: number) {
    const filledCells = usingCells - title.length - percent.toString().length - 2;

    return `[${title} ${'&nbsp;'.repeat(filledCells < 0 ? 0 : filledCells)}${percent}%]`;
}

function getProgressText(usingCells: number, title: string, percent: number) {
    const colorClass = percent > 74 ? 'green' : percent > 49 ? 'yellow' : 'red';
    const filledCells = Math.round(usingCells / 100 * percent);

    // Get the progressbar without the text
    let progressText = '|'.repeat(filledCells) + ' '.repeat(usingCells - filledCells);

    // Replace parts of progressbar with the text
    progressText = `${title} ${progressText.substring(title.length + 1, progressText.length - percent.toString().length - 1)}${percent}%`;

    // Apply color to the relevant parts in the progressbar and add bounds
    progressText = `[<span class="${colorClass}">${htmlWhitespace(progressText.substring(0, filledCells))}</span>`
        + `${htmlWhitespace(progressText.substring(filledCells))}]`;

    return progressText;
}
