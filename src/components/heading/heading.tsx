import React from "react";
import Socials from "../socials/socials";
import styles from './heading.module.scss';

export default function Heading(props: {hCells: number}) {
    return (
        <div id={styles.headingContainer}>
            <div>
                <Socials/>
            </div>
            <h1 className={props.hCells > 57 ? styles.show : ''}>
                █▀▄▀█ ▄▀█ █░█ ▀█ ░ █ █▀█<br/>
                █░▀░█ █▀█ █▄█ █▄ ▄ █ █▄█
            </h1>
        </div>
    )
} 