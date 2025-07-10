import loaderCss from "../modules/loaderCss.js";
import styles from "./PixelcongaChar.css?raw";

const OFFSET = 256;

class PixelcongaChar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.status = "walk";
  }

  get direction() {
    return this.x < this.target ? "right" : "left";
  }

  connectedCallback() {
    const currentPosition = Math.random() < 0.5 ? 0 - OFFSET : innerWidth + OFFSET;
    this.updateX(currentPosition);
    this.setRandomTarget();
    this.render();
  }

  setNick(username) {
    this.shadowRoot.querySelector(".username").textContent = username;
  }

  setRandomTarget() {
    const randomPosition = Math.floor(~~(Math.random() * innerWidth));
    this.setTarget(randomPosition);
  }

  setTarget(target) {
    this.target = target;
  }

  setColor(color) {
    this.style.setProperty("--color", color);
  }

  move() {
    switch (this.status) {
      case "walk": {
        if (this.x < this.target) {
          this.updateX(this.x + 1);
        } else if (this.x > this.target) {
          this.updateX(this.x - 1);
        } else {
          this.status = "idle";
          this.waitingCounter = 2000;
        }

        break;
      }
      case "idle": {
        if (this.waitingCounter > 0) {
          this.waitingCounter--;
        } else {
          this.status = "inactive";
        }

        break;
      }
      case "inactive": {
      /* ... */
        this.setRandomTarget();
        this.status = "walk";

        break;
      }
    // No default
    }
  }

  updateX(x) {
    this.x = x;
    this.style.setProperty("--x", `${x}px`);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="username"></div>
      <div class="char">
      </div>
    `);
    this.shadowRoot.adoptedStyleSheets.push(loaderCss(styles));
  }
}

customElements.define("pixelconga-char", PixelcongaChar);
