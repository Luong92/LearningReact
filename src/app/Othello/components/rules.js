
export function rules(player, board, x, y, checkMove) {
  let valid = false;
  if(!board[x][y]){

    let playerPiece  =  player ? 'X' : 'O';
    let enemy   = !player ? 'X' : 'O';
    let [step, x_iterate, y_iterate] = [0,0,0];
    let x_sequence = Array(board[0].length).fill(null);
    let y_sequence = Array(board.length).fill(null);

    for(let i = -1; i <= 1; i += 2){
      for(let j = -1; j <= 1; j += 2){
        x_iterate = (i === -1) ? x + j : x;
        y_iterate = (i === -1) ? y : y + j;
        [x_iterate, y_iterate] = reachedBoundary(board, x_iterate, y_iterate)

        if (board[x_iterate][y_iterate] === enemy){
          step = 0;
          do {
            if (i === -1){
              y_sequence[step] = y;
              x_sequence[step] = x_iterate;
              x_iterate += j;
            } else {
              x_sequence[step] = x;
              y_sequence[step] = y_iterate;
              y_iterate += j;
            }
            step += 1;

            if (iterateCheck(board, x_iterate, y_iterate)) { break; }

            if (board[x_iterate][y_iterate] === playerPiece){
              valid = true;
              if(!checkMove){ fillColor(playerPiece, board, x, y, x_sequence, y_sequence, step) }
            }
          } while (board[x_iterate][y_iterate] === enemy);
        }

        x_iterate = x + i;
        y_iterate = y + j;
        [x_iterate, y_iterate] = reachedBoundary(board, x_iterate, y_iterate)
        if(board[x_iterate][y_iterate] === enemy){
          step = 0;
          do {
            x_sequence[step] = x_iterate;
            y_sequence[step] = y_iterate;
            x_iterate += i;
            y_iterate += j;
            step += 1;

            if (iterateCheck(board, x_iterate, y_iterate)) { break; }

            if (board[x_iterate][y_iterate] === playerPiece){
              valid = true;
              if(!checkMove){ fillColor(playerPiece, board, x, y, x_sequence, y_sequence, step) }
            }
          } while (board[x_iterate][y_iterate] === enemy)
        }
      }
    }
  }
  return [valid, board];
}

function fillColor(playerPiece, board, x, y, x_sequence, y_sequence, step){

  board[x][y] = playerPiece;
  for(let i = 0; i < step; i++){
    board[x_sequence[i]][y_sequence[i]] = playerPiece;
  }
}

function reachedBoundary(board, x_iterate, y_iterate){
  if (x_iterate <= 0 || x_iterate >= board[0].length-1){
    x_iterate = (x_iterate - (board.length-1) >= 0) ? board.length - 1 : 0;
  }
  if (y_iterate <= 0 || y_iterate >= board.length-1) {
    y_iterate = (y_iterate - (board.length-1) >= 0) ? board.length - 1 : 0;
  }
  return [x_iterate, y_iterate];
}

function iterateCheck(board, x_iterate, y_iterate){
  if (x_iterate < 0 || x_iterate > board[0].length-1){
    return true;
  }
  if (y_iterate < 0 || y_iterate > board.length-1){
    return true;
  }
  return false;
}

export function winner(board){

  let [player1, player2] = [0,0]

  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
        if(board[i][j] === 'X'){ player1 += 1 }
        else { player2 += 1 }
    }
  }
  return [player1, player2]
}

export function checkAvailableMove(player, board){

  let valid = false;
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      if(rules(player, board, i, j, true)[0]) {
        valid = true;
        break;
      }
    }
  }
  return valid;
}
