
export function changeBackground(color) {
  return{
    type: "CHANGE_BG_COLOR",
    color: color,
  }
}

export function changePlayer(player) {
  return{
    type: "CHANGE_PLAYER",
    player: player,
  }
}

export function setStepNumber(number) {
  return{
    type: "SET_STEP_NUMBER",
    stepNumber: number,
  }
}

export function jumpTo(step){
  return{
    type: "JUMP_TO",
    stepNumber: step,
    player: (step % 2) ? false : true
  }
}
