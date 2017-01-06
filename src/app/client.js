import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"

import Game from "./Othello/components/game"
import store from "./Othello/store"

require("./Othello/styles/othello.css");

const app = document.getElementById('root');

ReactDOM.render(<Provider store={store}>
  <Game />
</Provider>, app);
