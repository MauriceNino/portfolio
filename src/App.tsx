import React from 'react';
import './App.css';

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

    const borderVerticalLine = '+' + '-'.repeat(verticalCellCount - 6) + '+';
    const borderHorizontalLine = '|'.repeat(horizontalCellCount - 4);

    const consoleWidth = `${Math.ceil(verticalCellCount * 9.6 + 1)}px`;
    const consoleHeight = `${Math.ceil(horizontalCellCount * 21 + 1)}px`;

    return (
      <>
        <div id="console-container" style={{width: consoleWidth, height: consoleHeight}}>
          <div style={{position: 'absolute', top: '0', right: '0'}}>{verticalCellCount} / {horizontalCellCount}</div>

          <div className="bordered">
            <div>{borderVerticalLine}</div>
            <div className="content-flex">
              <div>{borderHorizontalLine}</div>
              <div>
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
              </div>
              <div>{borderHorizontalLine}</div>
            </div>
            <div>{borderVerticalLine}</div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
