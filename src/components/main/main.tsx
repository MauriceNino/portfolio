import { CellsConverter } from "../../helpers/cells-converter";
import Padded from "../padded/padded";
import './main.scss'
import AboutMe from "./parts/about-me";
import Projects from "./parts/projects";
import Skills from "./parts/skills";

export default function MainPage(props: any) {
    const hCells = props.hCells;
    const vCells = props.vCells;

    const maxCells = 130;

    const usingCells = hCells > maxCells ? maxCells : hCells;
    const marginLeft = hCells - usingCells > 0 ? Math.floor((hCells - usingCells) / 2) : 0;

    const isFullscreen = usingCells < 100;

    const leftCells = isFullscreen ? usingCells : Math.floor(usingCells / 3);
    const rightCells = isFullscreen ? usingCells : usingCells - leftCells;
               
    return (
        <div id="main-page" style={{minHeight: CellsConverter.cellsToHeight(vCells)}}>
            <div className={`flex-container ${isFullscreen ? 'fs' : ''}`} style={{
                    width: CellsConverter.cellsToWidth(usingCells),
                    marginLeft: CellsConverter.cellsToWidth(marginLeft),
                }}>
                <div style={{width: CellsConverter.cellsToWidth(leftCells)}}>
                    <Padded top={isFullscreen ? 1 : 5}>
                        <Skills hCells={leftCells - 2} />
                    </Padded>
                </div>
                <div style={{width: CellsConverter.cellsToWidth(rightCells)}} id="about-me">
                    <Padded top={isFullscreen ? 1 : 5} left={isFullscreen ? 1 : 10}>
                        <AboutMe isFullscreen={isFullscreen} />
                    </Padded>
                </div>
            </div>

            <div style={{
                    width: CellsConverter.cellsToWidth(usingCells),
                    marginLeft: CellsConverter.cellsToWidth(marginLeft),
                }}>
                <Padded top={isFullscreen ? 1 : 5}>
                    <Projects isFullscreen={isFullscreen} />
                </Padded>
            </div>
        </div>
    )
}