import React, { Component } from "react";
import { connect } from "react-redux";
import Radium from "radium";

//import "../othello.css";
import * as mouse from "../actions/mouseActions"
import {setHistory, actionBoard} from "../actions/historyActions"
import {SelectColor} from "./bgColor"
import {Board} from "./board"
import {rules, checkAvailableMove, winner} from "./rules"
import {AppBarExampleIconButton} from "./reset"
import styles from "../styles/board-game"

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {checkStoreUpdate} from "../store"

const rowSize = 10;
const columnSize = 10;

export function initBoard(){
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

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

@Radium
export class Game extends Component{
  props:{
      bgColor: string,
      stepNr: number,
      player1: boolean,
      //history: Array<Array<string>>
      history: object,
      jumpTo: (number) => void,
      updateMove: (object, Array<Array<string>>, number) => void,
      updateBG: (string) => void,
  }
  state:{
    playAvailable: number;
  }

  constructor(props){
    super(props);
    this.state = { playAvailable: 0 }
  }

  updateBG(color) {
    let body = document.querySelector('body');
    body.style.background = color;
  }

  componentDidUpdate() {
    if(this.state.playAvailable >= 2 || this.props.stepNr === 96){
      const history = this.props.history.slice(0,this.props.stepNr+1);
      const current = history[history.length - 1];
      const board = current.squares.slice().map( (row) => row.slice());
      const[player1,player2] = winner(board);
      if(player1 > player2) { alert(`Player1 won with ${player1} points`) }
      else { alert(`Player2 won with ${player2} points`) }
    }
    this.updateBG(this.props.bgColor)
  }

  handleClick(i,j) {
    const history = this.props.history.slice(0,this.props.stepNr+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice().map( (row) => row.slice());

    const [validMove, board] = rules (this.props.player1, squares, i, j, false);
    if (validMove){
      this.props.updateMove(history, board)

      if(checkAvailableMove(!this.props.player1, board)){
        this.props.updatePlayer(this.props.player1)
        if(this.state.playAvailable > 0){
          this.setState({ playAvailable: this.state.playAvailable-1 })
        }
      } else {
          this.setState({ playAvailable: this.state.playAvailable+1 })
      }
    }
  }

  mouseOver(i,j){
    let square = document.getElementById(`square${i}${j}`);
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

  // componentWillMount(){
  // }

  // componentDidMount(){
  // }

  resetBoard(){
    // console.log("WAAAHAHAHAHHA")
     this.props.setBoard(initBoard(), true, 0);
  }

  render(){
    const history = this.props.history;
    const moves = history.map((step,move) => {
        const desc  = move ? 'Move #' + move : 'Game start';
        return (
          <li key={move}>
            <a href="#" onClick={() => this.props.jumpTo(move)}>{desc}</a>
          </li>
        );
    });
    const current = history[this.props.stepNr];

    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBarExampleIconButton handleTouchTap={() => this.resetBoard()}/>
          <div className="header" style={styles.header}>
            <h1 style={styles.base}>Welcome to Othello</h1>
            <label>Select screen color
              <SelectColor value={this.props.bgColor} onColorChange={(color) =>
                  this.props.updateBG(color)}/>
            </label>
            <div className="game">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i,j) => this.handleClick(i,j)}
                  onMouseEnter={(i,j) => this.mouseOver(i,j)}
                  onMouseLeave={(i,j) => this.mouseOut(i,j)}
                  status={this.props.player1}
                  player={"blue"}
                  player2={"red"}
                />
              </div>
              <div className="game-info">
                <div>Game history:</div>
                <ol>{moves}</ol>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}


const mapStateToProps = (store) => ({
    bgColor: store.mouse.bgColor,
    stepNr:  store.mouse.stepNumber,
    player1: store.mouse.player,
    history: store.history.history,
})

const mapDispatchToProps = (dispatch) => ({
    jumpTo: (move) => dispatch(mouse.jumpTo(move)),
    updateMove: (history, board) => {
      dispatch(mouse.setStepNumber(history.length))
      dispatch(setHistory(history,board))
    },
    updatePlayer: (player) => dispatch(mouse.changePlayer(!player)),
    updateBG: (color) => dispatch(mouse.changeBackground(color)),
    setBoard: (board, player, stepNumber) => {
      dispatch(actionBoard(board))
      dispatch(mouse.changePlayer(player))
      dispatch(mouse.setStepNumber(stepNumber))
    }
})

const gameConnect = connect(
   mapStateToProps,
   mapDispatchToProps
)(Game);

export default gameConnect

// export default connect(store => {
//   return{
//     bgColor: store.mouse.bgColor,
//     stepNr: store.mouse.stepNumber,
//     player1: store.mouse.player,
//     history: store.history.history,
//   }
// })(Game);

/*============== Decorator ===================*/
// @connect((store) =>{
//   return{
//     bgColor: store.mouse.bgColor,
//     player1: store.mouse.player1,
//     stepNr: store.mouse.stepNumber,
//   }
// })
/*============================================*/
