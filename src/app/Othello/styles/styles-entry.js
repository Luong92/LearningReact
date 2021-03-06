/*body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}*/

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: orange;
}

ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  display: flex;
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
  /*position: relative;
  left: 30px;*/
}

/*.square:hover{
  background: yellow;
}

#square-done:hover{
  background: white;
}*/


.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.header{
  margin: 60px auto;
  width: 80%;
}

.divBoard{
  display: flex;
  flex-direction: row;
}

.game {
  display: flex;
  flex-direction: row;
  margin: 60px auto;
  width: 80%;
}

#playerIcon{
  padding-left:1.8em;
  margin-top:6em;
}

@media screen and (min-width: 500px){
  .header {
    width: 40%;
  }
}

h1, label{
  font-family: 'Arvo', serif;
  color: white;
}

.game-info {
  margin-left: 20px;
}

select {
  position: relative;
  left: 10px;
}
