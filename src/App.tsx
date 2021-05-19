import React from 'react';
import './App.scss';
import BorderBox from './components/border-box/BorderBox';
import ConsoleContainer from './components/console-container/ConsoleContainer';

class App extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);

    this.state = { 
      height: window.innerHeight,
      width: window.innerWidth
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }

  render() {
    const width = this.state.width;
    const height = this.state.height;

    const verticalCellCount = Math.floor(width / 9.6);
    const horizontalCellCount = Math.floor(height / 21);

    return (
      <>
      <ConsoleContainer vCells={verticalCellCount} hCells={horizontalCellCount} showDimensions={true}>
        <BorderBox vCells={verticalCellCount} hCells={horizontalCellCount}>
          <h1 id="heading">
            █▀█ █▀█ █▀█ ▀█▀ █▀▀ █▀█ █░░ █ █▀█<br/>
            █▀▀ █▄█ █▀▄ ░█░ █▀░ █▄█ █▄▄ █ █▄█
          </h1>
          <br></br>
          
          <h2 id="sub-heading">Click one of the following links to navigate to somewhere:</h2>
          
          <br></br>

          <div className="links">
            <div>&gt; Text1</div>
            <div>&gt; Text2</div>
            <div>&gt; Text3</div>
          </div>
        </BorderBox>
      </ConsoleContainer>
      </>
    );
  }
}

export default App;
