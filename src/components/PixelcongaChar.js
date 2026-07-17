import loaderCss from "../modules/loaderCss.js";
import styles from "./PixelcongaChar.css?raw";

const OFFSET = 256;

class PixelcongaChar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.status = "walk";
    this.speed = 5;
    this.frameCounter = 0;
    this.render();
  }

  get direction() {
    return this.x < this.target ? "right" : "left";
  }

  connectedCallback() {
    const randomPositionOutsideScreen = Math.random() < 0.5 ? 0 - OFFSET : innerWidth + OFFSET;
    this.updateX(randomPositionOutsideScreen);
    this.setRandomTarget();
  }

  setNick(username) {
    this.shadowRoot.querySelector(".username").textContent = username;
  }

  setRandomTarget() {
    const randomPosition = Math.floor(~~(Math.random() * innerWidth));
    this.setTarget(randomPosition);
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setRandomSpeed() {
    this.speed = 1 + Math.random() * 10;
  }

  setCharacter(name) {
    this.name = name;
    this.image = `/images/chars/${name}.png`;
    this.style.setProperty("--image", `url(${this.image})`);
  }

  setTarget(target) {
    this.target = target;

    if (this.x > target) {
      this.setAttribute("mirror", "");
    } else {
      this.removeAttribute("mirror", "");
    }
  }

  setColor(color) {
    this.style.setProperty("--color", color);
  }

  walk() {
    this.frameCounter++;

    if (this.frameCounter < this.speed) return;

    this.frameCounter = 0;
    this.setAttribute("animation", "walk");

    if (this.x < this.target) {
      this.updateX(this.x + 1);
    } else if (this.x > this.target) {
      this.updateX(this.x - 1);
    } else {
      this.removeAttribute("animation");
      this.status = "idle";
      this.waitingCounter = 2000;
    }
  }

  idle() {
    this.setAttribute("animation", "idle");
    if (this.waitingCounter > 0) {
      this.waitingCounter--;
    } else {
      this.status = "inactive";
    }
  }

  inactive() {
    this.setRandomTarget();
    this.status = "walk";
  }

  move() {
    switch (this.status) {
      case "walk": {
        this.walk();
        break;
      }
      case "idle": {
        this.idle();
        break;
      }
      case "inactive": {
        this.inactive();
        break;
      }
    }
  }

  updateX(x) {
    this.x = x;
    this.style.setProperty("--x", `${x}px`);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="username"></div>
      <div class="char"></div>
    `);
    this.shadowRoot.adoptedStyleSheets.push(loaderCss(styles));
  }
}

customElements.define("pixelconga-char", PixelcongaChar);
