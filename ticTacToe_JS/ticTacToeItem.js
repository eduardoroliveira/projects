export function lineColumnItem(nextUser, handleOnClick) {
  return new Item({ nextUser, handleOnClick, cssClasses: ["line", "column"] });
}

export function lineItem(nextUser, handleOnClick) {
  return new Item({ nextUser, handleOnClick, cssClasses: ["line"] });
}

export function columnItem(nextUser, handleOnClick) {
  return new Item({ nextUser, handleOnClick, cssClasses: ["column"] });
}

export function simpleItem(nextUser, handleOnClick) {
  return new Item({ nextUser, handleOnClick });
}

export class Item {
  constructor({ nextUser, handleOnClick, cssClasses }) {
    // super();
    this.nextUser = nextUser;
    this.handleOnClick = handleOnClick;
    const cssClasses2 = cssClasses
      ? Array.isArray(cssClasses)
        ? cssClasses.join(" ")
        : cssClasses
      : "";
    this.value = "";
    this.className = "col item " + cssClasses2;
  }

  render() {
    const column = document.createElement("div");
    column.setAttribute("class", this.className);
    column.onclick = () => this.handleOnClick(this);
    column.appendChild(document.createTextNode(this.value));
    return column;
  }
}
