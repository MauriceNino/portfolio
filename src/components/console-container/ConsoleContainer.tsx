import './ConsoleContainer.scss';

export default function ConsoleContainer (props: any) {

    const consoleWidth = `${Math.ceil(props.vCells * 9.6 + 1)}px`;
    const consoleHeight = `${Math.ceil(props.hCells * 21 + 1)}px`;

    const dimensions = (
        <div style={{position: 'absolute', top: '0', right: '0'}}>
            {props.vCells} / {props.hCells}
        </div>
    );

    return (
        <div className="t-console-container" style={{width: consoleWidth, height: consoleHeight}}>
            {props.showDimensions && dimensions}
            {props.children}
        </div>
    );
}