import React from 'react';
import './App.scss';
import BorderBox from '../components/border-box/BorderBox';
import ConsoleContainer from '../components/console-container/ConsoleContainer';
import Heading from '../components/heading/heading';
import SplashPage from '../components/splash-page/splash-page';

class App extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);

    this.state = { 
      horizontalCellCount: window.innerHeight,
      verticalCellCount: window.innerWidth
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const horizontalCellCount = Math.floor(width / 9.6);
    const verticalCellCount = Math.floor(height / 21);


    if(this.state.horizontalCellCount !== horizontalCellCount
      || this.state.verticalCellCount !== verticalCellCount) {
      this.setState({
        horizontalCellCount: horizontalCellCount,
        verticalCellCount: verticalCellCount
      });
    }
  }

  render() {
    const horizontalCellCount = this.state.horizontalCellCount;
    const verticalCellCount = this.state.verticalCellCount;

    return (
      <>
      <ConsoleContainer vCells={verticalCellCount} hCells={horizontalCellCount} showDimensions={true}>
        <Heading/>
        <br></br>

        <BorderBox vCells={verticalCellCount - 7} hCells={horizontalCellCount - 6} minVCells={5}>
          <SplashPage vCells={verticalCellCount - 7} hCells={horizontalCellCount - 6}/>
        </BorderBox>
      </ConsoleContainer>
      </>
    );
  }
}

export default App;