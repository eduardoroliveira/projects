// import _ from "lodash";
import {
  simpleItem,
  lineItem,
  columnItem,
  lineColumnItem
} from "./ticTacToeItem.js";

import { showMessage } from "./util.js";

const isXWinner = itemsArr => {
  return isWinner(itemsArr, "X");
};

const isOWinner = itemsArr => {
  return isWinner(itemsArr, "O");
};

const isWinner = (itemsArr, expected) => {
  if (!itemsArr) return false;
  return itemsArr.every(function(item) {
    return item.value === expected;
  });
};

const getChances = tttItems => {
  return [
    // per row
    [tttItems[0][0], tttItems[0][1], tttItems[0][2]],
    [tttItems[1][0], tttItems[1][1], tttItems[1][2]],
    [tttItems[2][0], tttItems[2][1], tttItems[2][2]],
    [tttItems[0][0], tttItems[1][0], tttItems[2][0]],
    [tttItems[0][1], tttItems[1][1], tttItems[2][1]],
    [tttItems[0][2], tttItems[1][2], tttItems[2][2]],
    [tttItems[0][0], tttItems[1][1], tttItems[2][2]],
    [tttItems[2][0], tttItems[1][1], tttItems[0][2]]
  ];
};

const minIteractionsToWin = 5;
let counter = 0;
let winner = null;
let message;

const checkWinner = tttItems => {
  message = `Next gamer: ${nextUser}`;
  if (counter < minIteractionsToWin) return;
  const chances = getChances(tttItems);
  for (let changesRowKey in chances) {
    const tttItem = chances[changesRowKey];
    winner = isXWinner(tttItem) ? "X" : isOWinner(tttItem) ? "O" : null;
    if (winner) {
      Object.keys(tttItem).forEach(
        key => (tttItem[key].className += " winner")
      );
      message = `${winner} won!`;
      return;
    }
  }
  console.log(counter);
  if (counter === 9) message = "No winner this time!";
};

let nextUser = "X";
const getNextUser = () => {
  let next = nextUser;
  nextUser = nextUser === "X" ? "O" : "X";
  counter++;
  return next;
};

const handleOnClick = _this => {
  if (winner) return;
  _this.value = _this.value === "" ? getNextUser() : _this.value;
  checkWinner(tttItems);
  ticTacToeRender(tttItems);
};

let tttItems;
const getTttItems = () => {
  return [
    [
      lineItem(getNextUser, handleOnClick),
      lineColumnItem(getNextUser, handleOnClick),
      lineColumnItem(getNextUser, handleOnClick)
    ],
    [
      lineItem(getNextUser, handleOnClick),
      lineColumnItem(getNextUser, handleOnClick),
      lineColumnItem(getNextUser, handleOnClick)
    ],
    [
      simpleItem(getNextUser, handleOnClick),
      columnItem(getNextUser, handleOnClick),
      columnItem(getNextUser, handleOnClick)
    ]
  ];
};

const addNewGameBtn = () => {
  const newGameBtn = document.createElement("button");
  newGameBtn.onclick = () => newGame();
  newGameBtn.appendChild(document.createTextNode("New Game"));
  newGameBtn.setAttribute("class", "tttBtn");

  const btnContainer = document.getElementById("btnContainer");
  while (btnContainer.childNodes.length > 0) {
    btnContainer.removeChild(btnContainer.childNodes[0]);
  }
  btnContainer.appendChild(newGameBtn);
};

const tttRender = (ticTacToeItems, main) => {
  const nodes = Array.from(main.childNodes);
  showMessage(message);

  if (Array.isArray(nodes)) {
    nodes.map(child => main.removeChild(child));
  }
  for (let lineIndex in ticTacToeItems) {
    let rowData = ticTacToeItems[lineIndex];
    const newUiRow = document.createElement("div");
    newUiRow.setAttribute("class", "row");
    for (let columnIndex in rowData) {
      newUiRow.appendChild(rowData[columnIndex].render());
    }
    main.appendChild(newUiRow);
  }
  addNewGameBtn();
};

const ticTacToeRender = tttItems => {
  let main = document.getElementById("main");
  const tttBody = document.createElement("div");

  tttBody.setAttribute("class", "tttBody");
  if (main.childNodes.length > 0) {
    main.removeChild(main.childNodes[0]);
  }
  main = main.appendChild(tttBody);
  tttRender(tttItems, main);
};

const newGame = () => {
  message = `Next gamer: ${nextUser}`;
  winner = "";
  counter = 0;
  tttItems = getTttItems();
  ticTacToeRender(tttItems);
};

newGame();
