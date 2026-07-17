import "../components/PixelcongaChar.js";

export default class CharList {
  #list = new Map();

  constructor() {
  }

  add(username, options = {}) {
    if (this.#list.has(username)) return;

    const char = document.createElement("pixelconga-char");
    this.#list.set(username, char);
    char.setNick(username);
    char.setCharacter("fox");
    char.setColor(options.color);
    char.setRandomSpeed();

    // if (Math.random() < 0.25) {
    //   char.setSpeed(2);
    //   char.style.setProperty("--animation-time", "0.1s");
    // }

    return char;
  }

  forEach(method) {
    this.#list.forEach(method);
  }
}
