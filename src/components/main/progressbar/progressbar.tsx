import './progressbar.scss';

const htmlWhitespace = (str: string) => str.replaceAll(' ', '&nbsp;');

export default function Progressbar(props: any) {
    const { hCells, title, percent } = props;

    const usingCells = hCells - 2;
    const filledCells = Math.round(usingCells / 100 * percent);

    const colorClass = percent > 74 ? 'green' : percent > 49 ? 'yellow' : 'red';


    let progressText = '|'.repeat(filledCells) + ' '.repeat(usingCells - filledCells);

    progressText = `${title} ${progressText.substring(title.length + 1, progressText.length - percent.toString().length - 1)}${percent}%`;

    progressText = `[<span class="${colorClass}">${htmlWhitespace(progressText.substring(0, filledCells))}</span>`
        + `${htmlWhitespace(progressText.substring(filledCells))}]`;



    return (
        <div className="progress-item" dangerouslySetInnerHTML={{ __html: progressText }} ></div>
    );
}