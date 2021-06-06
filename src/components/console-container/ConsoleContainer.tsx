import styles from './ConsoleContainer.module.scss';

export default function ConsoleContainer (props: any) {

    const consoleWidth = `${Math.ceil(props.hCells * 9.6 + 1)}px`;
    const consoleHeight = `${Math.ceil(props.vCells * 21 + 1)}px`;

    const dimensions = (
        <div style={{position: 'absolute', bottom: '0', right: '19.2px'}}>
            {props.vCells}H / {props.hCells}W
        </div>
    );

    return (
        <div className={styles.tConsoleContainer} style={{width: consoleWidth, height: consoleHeight}}>
            {props.showDimensions && dimensions}
            {props.children}
        </div>
    );
}