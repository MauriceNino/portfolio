import { CellsConverter } from "../../helpers/cells-converter";
import Padded from "../padded/padded";
import './main.scss'
import AboutMe from "./parts/about-me";
import Skills from "./parts/skills";
import GamerPals from "./projects/gamerpals";
import Mauz from "./projects/mauz";
import More from "./projects/more";
import QHelp from "./projects/qhelp";

export default function MainPage(props: any) {
    const hCells = props.hCells;
    const vCells = props.vCells;

    const maxCells = 130;

    const usingCells = hCells > maxCells ? maxCells : hCells;
    const marginLeft = hCells - usingCells > 0 ? Math.floor((hCells - usingCells) / 2) : 0;

    const isFullscreen = usingCells < 100;

    const leftCells = isFullscreen ? usingCells : Math.floor(usingCells / 3);
    const rightCells = isFullscreen ? usingCells : usingCells - leftCells;

    const qhelpLogo = QHelp.split('\n').map(q => <>{q.replaceAll(' ', '\u00A0')}<br/></>);
    const mauzLogo = Mauz.split('\n').map(q => <>{q.replaceAll(' ', '\u00A0')}<br/></>);
    const gamerpalsLogo = GamerPals.split('\n').map(q => <>{q.replaceAll(' ', '\u00A0')}<br/></>);
    const moreLogo = More.split('\n').map(q => <>{q.replaceAll(' ', '\u00A0')}<br/></>);
               
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
                        <AboutMe isFullscreen />
                    </Padded>
                </div>
            </div>

            <div style={{
                    width: CellsConverter.cellsToWidth(usingCells),
                    marginLeft: CellsConverter.cellsToWidth(marginLeft),
                }}>
                <Padded top={isFullscreen ? 1 : 5}>
                    <h2>Some of my projects</h2>
                    <br/>

                    <div id="projects-flex">
                        <div>
                            <h3>Portfolio</h3>
                            <div className="logo mauz">
                                <Padded bottom={3} left={3}>{mauzLogo}</Padded>
                            </div>
                            <Padded left={0} right={0} bottom={3}>
                                The website you are looking at right now was written by me to learn React 
                                and is the first one written by me in the framework (sorry for the bugs).  
                                The idea for it came to me when I saw the project <a href="https://k9scli.io/" target="_blank" rel="noreferrer">"k9s"</a>
                                and was impressed by the beautiful console application. I tried to create 
                                a more or less convincing CLI feeling while using the modern features of a 
                                browser for animations.

                                <br/><br/>

                                If you are interested in the code, look here: <a href="https://github.com/MauriceNino/portfolio" target="_blank" rel="noreferrer">github.com</a>
                            </Padded>
                            
                        </div>
                        <div>
                            <h3>Q-Help</h3>
                            <div className="logo qhelp">
                                <Padded bottom={3} right={3}>{qhelpLogo}</Padded>
                            </div>
                            <Padded left={0} right={0} bottom={3}>
                                At the start of the Corona crisis, myself and 2 colleagues thought that we
                                would like to help the people in need somehow. The problem was that people
                                who were in quarantine had no way to meet their daily needs, such as shopping, 
                                or walking the dog. Q-Help helps people by bringing them together based on 
                                geographical proximity. The project is based on Ionic/Angular and Firebase 
                                (Storage, Firestore, Functions, Authentication, ...).

                                <br/><br/>

                                You can view the project live here: <a href="https://qhelp.app/" target="_blank" rel="noreferrer">qhelp.app</a>
                            </Padded>
                        </div>
                        <div>
                            <h3>GamerPals</h3>
                            <div className="logo gamerpals">
                                <Padded bottom={3} left={3}>{gamerpalsLogo}</Padded>
                            </div>
                            <Padded left={0} right={0} bottom={3}>
                                As avid gamers, myself and a classmate teamed up to create the ultimate 
                                group finding platform. The goal was to bring groups together based on relevant 
                                criteria - be it guilds or even matchmaking groups. The relevant technologies 
                                are Angular/Electron on the frontend and a backend consisting of a C# REST 
                                service and a MongoDB database, where I worked mostly on the frontend.

                                <br/><br/>

                                You can view a demo of the project here: <a href="http://gamerpals-website.herokuapp.com/home" target="_blank" rel="noreferrer">gamerpals-website.herokuapp.com</a><br/>
                                If you are interested in the frontend code, look here: <a href="https://github.com/MauriceNino/gamerpals-webclient" target="_blank" rel="noreferrer">github.com</a>
                            </Padded>
                        </div>
                        <div>
                            <h3>More</h3>
                            <div className="logo more">
                                <Padded bottom={3} right={3}>{moreLogo}</Padded>
                            </div>
                            <Padded left={0} right={0} bottom={3}>
                                If you want to learn more about me, or if you want to check out some more of 
                                my projects, I encourage you to visit the following links:

                                <br/><br/>

                                - <a href="https://github.com/MauriceNino" target="_blank" rel="noreferrer">GitHub</a><br/>
                                - <a href="https://www.linkedin.com/in/maurice-elbanna/" target="_blank" rel="noreferrer">LinkedIn</a><br/>
                                - <a href="https://stackoverflow.com/users/9150652/mauricenino" target="_blank" rel="noreferrer">StackOverflow</a>
                            </Padded>
                        </div>
                    </div>
                </Padded>
            </div>
        </div>
    )
}