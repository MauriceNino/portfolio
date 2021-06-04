import React from 'react';
import './App.scss';
import BorderBox from '../components/border-box/BorderBox';
import ConsoleContainer from '../components/console-container/ConsoleContainer';
import Heading from '../components/heading/heading';
import SplashPage from '../components/splash/splash';
import Padded from '../components/padded/padded';
import MainPage from '../components/main/main';

class App extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);

    this.state = this.getCurrentState();
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  getCurrentState() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      horizontalCellCount: Math.floor(width / 9.6),
      verticalCellCount: Math.floor(height / 21)
    } 
  }

  handleResize() {
    const state = this.getCurrentState();


    if(this.state.horizontalCellCount !== state.horizontalCellCount
      || this.state.verticalCellCount !== state.verticalCellCount) {
      this.setState(state);
    }
  }

  render() {
    const horizontalCellCount = this.state.horizontalCellCount;
    const verticalCellCount = this.state.verticalCellCount;

    const disableSideLines = horizontalCellCount < 50;

    return (
      <>
      <ConsoleContainer vCells={verticalCellCount} hCells={horizontalCellCount} showDimensions={true}>
        <Padded bottom={0}>
          <Heading hCells={horizontalCellCount}/>
        </Padded>

        <Padded left={disableSideLines ? 0 : 1} right={disableSideLines ? 0 : 1}>
          <BorderBox vCells={verticalCellCount - 7} hCells={horizontalCellCount - (disableSideLines ? 0 : 2)} minVCells={6} disableSideLines={disableSideLines}>
            <SplashPage vCells={verticalCellCount - 7 > 6 ? verticalCellCount - 7 : 6} hCells={horizontalCellCount - (disableSideLines ? 0 : 4)}/>
            <MainPage vCells={verticalCellCount - 7 > 6 ? verticalCellCount - 7 : 6} hCells={horizontalCellCount - (disableSideLines ? 0 : 4)}/>
          </BorderBox>
        </Padded>
      </ConsoleContainer>
      </>
    );
  }
}

export default App;
