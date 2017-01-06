import React, { Component } from 'react';

function gamePiece(color){
  return(
    <svg width="30" height="30">
     <circle cx="15" cy="15" r="10" stroke={color} strokeWidth="4" fill={color} />
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
    >
      {props.value}
    </button>
  );
}

export class Board extends Component{
  renderSquare(i,j){
    let color = "white"
    if(this.props.squares[i][j]){
        color = (this.props.squares[i][j] === 'X') ? this.props.player : this.props.player2
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
    let status = "Next player: "
    let player = (this.props.status) ? gamePiece(this.props.player) : gamePiece(this.props.player2)

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
