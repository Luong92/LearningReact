import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"

import {StyleRoot} from 'radium'

import Game from "./Othello/components/game"
import store from "./Othello/store"

require("./Othello/styles/othello.css");

const app = document.getElementById('root');

ReactDOM.render(
  <StyleRoot>
    <Provider store={store}>
      <Game />
    </Provider>
  </StyleRoot>, app);
