export function setHistory(history, squares){
  return{
    type: "SET_HISTORY",
    squares: squares,
    history: history,
  }
}

export function actionBoard(squares){
  return {
    type: "INIT_BOARD",
    board: squares,
  };
}
