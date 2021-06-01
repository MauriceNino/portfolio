import React from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import Padded from "../padded/padded";
import './main.scss'
import Progressbar from "./progressbar/progressbar";

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
                        <h2>My Skills</h2>
                        <br />

                        <div>Frontend</div>
                        <Progressbar hCells={leftCells - 2} title="JavaScript(+TS)" percent={90}/>
                        <Progressbar hCells={leftCells - 2} title="Angular" percent={80}/>
                        <Progressbar hCells={leftCells - 2} title="HTML & CSS/SCSS" percent={70}/>
                        <Progressbar hCells={leftCells - 2} title="React" percent={20}/>
                        <br/>

                        <div>Backend</div>
                        <Progressbar hCells={leftCells - 2} title="Java" percent={75}/>
                        <Progressbar hCells={leftCells - 2} title="Node JS" percent={60}/>
                        <br/>

                        <div>Databases</div>
                        <Progressbar hCells={leftCells - 2} title="Oracle" percent={50}/>
                        <Progressbar hCells={leftCells - 2} title="PostgreSQL" percent={45}/>
                        <Progressbar hCells={leftCells - 2} title="MongoDB" percent={25}/>
                    </Padded>
                </div>
                <div style={{width: CellsConverter.cellsToWidth(rightCells)}} id="about-me">
                    <Padded top={isFullscreen ? 1 : 5} left={isFullscreen ? 1 : 10}>
                        <h2>About Me</h2>
                        <br />

                        <div>
                            <div className="avatar"></div>
                            I am a 22 year old full stack developer currently living in Austria. My passion is creating experiences for users, especially on the web.
                            <br /><br />
                            I've worked on small private projects as well as large long-term international projects. 
                            Despite having only 3 years of professional experience, I've been programming for over 10 years now.
                            <br /><br />
                            If you would like to have me on a project, feel free to contact me on <a href="https://www.linkedin.com/in/maurice-elbanna/" target="_blank" rel="noreferrer">LinkedIn</a>.
                        </div>
                    </Padded>
                </div>
            </div>

            <div style={{
                    width: CellsConverter.cellsToWidth(usingCells),
                    marginLeft: CellsConverter.cellsToWidth(marginLeft),
                }}>
                <Padded>
                    <h2>Some of my projects</h2>
                </Padded>
            </div>
        </div>
    )
}