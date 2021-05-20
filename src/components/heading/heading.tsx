import React from "react";
import Socials from "../socials/socials";
import './heading.scss';

export default function Heading(props: {hCells: number}) {
    return (
        <div id="heading-container">
            <div>
                <Socials/>
            </div>
            {props.hCells > 57 && <h1>
                █▀▄▀█ ▄▀█ █░█ ▀█ ░ █ █▀█<br/>
                █░▀░█ █▀█ █▄█ █▄ ▄ █ █▄█
            </h1>}
        </div>
    )
} 