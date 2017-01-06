import {initBoard} from '../components/game'

export default function reducer(state={
    history: [{
      squares: initBoard()
    }],
  }, action){

  switch(action.type){
    case "SET_HISTORY": {
      return {...state, history: action.history.concat([{squares: action.squares}])};
      //return {...state, history: [Object.assign({}, {squares: action.squares})]};
    }
    case "INIT_BOARD":{
      //state = Object({}, {history: [Object.assign({}, {squares: action.board})]})
      const board = {...state, history: [Object.assign({}, {squares: action.board})] }
      return board
    }
    default:{return state;}
  }
}
