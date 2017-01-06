export default function reducer(state={
    bgColor: "orange",
    player: true,
    stepNumber: 0,
  }, action){
  switch (action.type) {
    case "CHANGE_BG_COLOR": {
      return {...state, bgColor: action.color}
    }
    case "CHANGE_PLAYER": {
      return {...state, player: action.player}
    }
    case "SET_STEP_NUMBER": {
      return {...state, stepNumber: action.stepNumber}
    }
    case "JUMP_TO":{
      return {...state, stepNumber: action.stepNumber, player: action.player}
    }
    default: { return state; }
  }
}
