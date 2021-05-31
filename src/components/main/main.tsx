import React from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import Padded from "../padded/padded";
import './main.scss'

export default function MainPage(props: any) {
    const hCells = props.hCells;
    const vCells = props.vCells;

    return (
        <div id="main-page" style={{minHeight: CellsConverter.cellsToHeight(vCells)}}>
            <div style={{width: CellsConverter.cellsToWidth(Math.floor(hCells / 2))}}>
                <Padded>
                    <h2>About Me</h2>
                    <br />

                    <div>
                        I am a 22 years old professional Full-Stack-Developer and currently located in Austria. My passion is in creating experiences for users.
                    <br /><br />
                    My projects range from small off-time project to big year-long projects of international companies.
                    <br /><br />
                    If you want me for your projects, feel free to contact me on <a href="https://www.linkedin.com/in/maurice-elbanna/" target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </Padded>
            </div>
            <div>
                <Padded style={{width: CellsConverter.cellsToWidth(Math.ceil(hCells / 2))}}>
                    <h2>My Skills</h2>
                    <br />

                    <table>
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
        </div>
    )
}