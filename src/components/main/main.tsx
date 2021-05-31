import React from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import Padded from "../padded/padded";
import './main.scss'

export default function MainPage(props: any) {
    const hCells = props.hCells;
    const vCells = props.vCells;

    const maxCells = 130;

    const usingCells = hCells > maxCells ? maxCells : hCells;
    const marginLeft = hCells - usingCells > 0 ? Math.floor((hCells - usingCells) / 2) : 0;

    const leftCells = Math.floor(usingCells / 3);
    const rightCells = usingCells - leftCells - 10;

    const isFullscreen = usingCells < 100;

    return (
        <div id="main-page" style={{minHeight: CellsConverter.cellsToHeight(vCells)}}>
            <div className={`flex-container ${isFullscreen ? 'fs' : ''}`} style={{
                    width: CellsConverter.cellsToWidth(usingCells),
                    marginLeft: CellsConverter.cellsToWidth(marginLeft),
                }}>
                <div style={{width: CellsConverter.cellsToWidth(isFullscreen ? usingCells : leftCells)}}>
                    <Padded top={5}>
                        <h2>My Skills</h2>
                        <br />

                        <table id="skills-table">
                            <tbody>
                                <tr>
                                    <td>Angular</td>
                                    <td>[=================&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;][90%]</td>
                                </tr>
                                <tr>
                                    <td>React</td>
                                    <td>[=================&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;][90%]</td>
                                </tr>
                                <tr>
                                    <td>Java</td>
                                    <td>[=================&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;][60%]</td>
                                </tr>
                                <tr>
                                    <td>TypeScript</td>
                                    <td>[=================&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;][75%]</td>
                                </tr>
                            </tbody>
                        </table>
                    </Padded>
                </div>
                <div style={{width: CellsConverter.cellsToWidth(isFullscreen ? usingCells : rightCells)}} id="about-me">
                    <Padded top={5}>
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