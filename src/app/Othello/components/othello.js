import React, { Component } from 'react';
import './othello.css';

const rowSize = 10;
const columnSize = 10;

function gamePiece(color){
  return(
    <svg width="25" height="30">
     <circle cx="12" cy="15" r="10" stroke={color} strokeWidth="4" fill={color} />
     Sorry, your browser does not support inline SVG.
    </svg>
  );
}
function Square(props){
  return(
    <button className="square"
            id={`square${props.i}${props.j}`}
            onClick={() => props.onClick()}
            onMouseEnter={() => props.onMouseEnter()}
            onMouseLeave={() => props.onMouseLeave()}
            hoverColor={"red"}
    >
      {props.value}
    </button>
  );
}

class Board extends Component{
  renderSquare(i,j){
    let color = "white"
    if(this.props.squares[i][j]){
        color = (this.props.squares[i][j] === 'X') ? this.props.player1 : this.props.player2
    }
    let value = (color !== "white" ) ? gamePiece(color) : null;

    return (<Square
        value={value}
        onClick={() => this.props.onClick(i,j)}
        onMouseEnter={() => this.props.onMouseEnter(i,j)}
        onMouseLeave={() => this.props.onMouseLeave(i,j)}
        i={i}
        j={j}
        key={`square${j}`}
        />);
  }

  render() {
    let square = this.props.squares.slice();
    let rows = []
    for(let i = 0; i < square.length; i++){
      rows[i] = [(i,j) => this.renderSquare(i,j), square[i].length];
    }
    //console.log(rows);
    let status = "Next player: "
    let player = (this.props.status) ? gamePiece(this.props.player1) : gamePiece(this.props.player2)

    return (
      <div>
        <div className="status" id="divBoard">
          <span>{status}</span><br/>
          <span id="playerIcon">{player}</span>
        </div>
        {rows.map(function(row,i){
              let rows = []
              const [square, cols] = row
              for(let j = 0; j < cols; j++){
                rows.push(square(i,j))
              }
              return <div className='board-row' key={`row${i}`}>{rows}</div>
            }
        )}
      </div>
    )
  }
}

class SelectColor extends Component{
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    e.preventDefault();
    const color = e.target.value
    if (this.props.onColorChange){
      this.props.onColorChange(color)
    }
  }
  render(){
    return(
        <select value={this.props.value} onChange={this.handleChange}>
          <option value="orangered">orangered</option>
          <option value="teal">teal</option>
          <option value="orange">orange</option>
          <option value="indigo">indigo</option>
          <option value="red">red</option>
        </select>
    )
  }
}

SelectColor.propTypes={
  value: React.PropTypes.string.isRequired,
  onColorChange: React.PropTypes.func
};

class Game extends Component{
  constructor(){
    super();
    this.state ={
      history: [{
        squares: this.initBoard()
        //Array(9).fill(null)
      }],
      bgColor: "orange",
      player1: true,
      stepNumber: 0
    }
    this.handleChangeBG = this.handleChangeBG.bind(this);
    this.updateBG = this.updateBG.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.initBoard = this.initBoard.bind(this);
  };

  initBoard(){
    const a = []
    for(let i = 0; i < rowSize; i++){
      a[i] = []
      for(let j = 0; j < columnSize; j++){
        a[i][j] = null
      }
    }
    a[4][4] = 'X';
    a[4][5] = 'O';
    a[5][4] = 'O';
    a[5][5] = 'X';
    return a;
  }

  handleChangeBG(color){
      this.setState({
        bgColor: color
      });
  }
  updateBG(){
    let body = document.querySelector('body')
    body.style.background = this.state.bgColor
  }

  // componentDidMount(){
  //   this.updateBG()
  // }
  componentDidUpdate(){
    this.updateBG()
  }

  handleClick(i,j) {
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[history.length - 1];
      const squares = current.squares.slice().map( (row) => row.slice());
      //calculateWinner(squares) ||
      console.log(history)
      if (squares[i][j]){
         return;
       }
      squares[i][j] = this.state.player1 ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        player1: !this.state.player1,
        stepNumber: history.length
      });



      // let squares = document.getElementById(`square${i}`);
      // square.style.hover(() => this.background:"white");
  }

  mouseOver(i,j){
    let square = document.getElementById(`square${i}${j}`);
    //square.style.background = "white";
    //console.log(square.textContent)
    if(square.textContent === ""){
      square.style.background = "yellow";
    }
  }

  mouseOut(i,j){
    let square = document.getElementById(`square${i}${j}`);
    if(square.style.background === "yellow"){
      square.style.background = "white";
    }
  }

  jumpTo(step){
    // const history = this.state.history.slice(0,this.state.stepNumber+1);
    // const current = history[history.length - 1];
    // const squares = current.squares.slice();

    // for(let i = 0; i < squares.length; i++){
    //   for(let j = 0; j < squares[i].length; j++){
    //     let square = document.getElementById(`square${i}${j}`);
    //     square.style.background = "white";
    //   }
    // }

    this.setState({
      stepNumber: step,
      player1: (step % 2) ? false : true
    })
  }

  render(){

      const history = this.state.history;
      const moves = history.map((step,move) => {
          const desc  = move ? 'Move #' + move : 'Game start';
          return (
            <li key={move}>
              <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
            </li>
          );
      });

      const current = history[this.state.stepNumber];
      console.log(current.squares)
      //const winner  = calculateWinner(current.squares);

      // const squares = current.squares.slice();
      // console.log(squares)

      // let status;
      // status = 'Next player: ' + (this.state.player1? 'X':'O');
      // if(winner) {
      //   let [player,...squares] = winner;
      //   status = 'Winner: ' + player;
      //   for(let i of squares){
      //
      //     let square = document.getElementById(`square${i}${j}`);
      //     square.style.background = "turquoise ";
      //   }
      // } else {
      //   status = 'Next player: ' + (this.state.player1? 'X':'O');
      // }
      return(
        <div>
          <div className="header">
            <h1>Welcome to Othello</h1>
            <label>Select screen color
              <SelectColor value={this.state.bgColor} onColorChange={this.handleChangeBG}/>
            </label>
          </div>
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i,j) => this.handleClick(i,j)} //send the function over
                onMouseEnter={this.mouseOver}
                onMouseLeave={this.mouseOut}
                status={this.state.player1}
                player1={"blue"}
                player2={"red"}
              />
            </div>
            <div className="game-info">
              <div>Game history:</div>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      )
  }
}


// function calculateWinner(squares){
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for(let i = 0; i < lines.length; i++){
//     const [a, b, c] = lines[i];
//     if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
//       return [squares[a],a,b,c];
//     }
//   }
//   return null;
// }

export {Game}
