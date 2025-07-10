import "./PixelcongaChar.js";

import { client } from "mtmi";

import loaderCss from "../modules/loaderCss.js";
import styles from "./PixelcongaPool.css?raw";

const CHANNEL = "manzdev";

class PixelcongaPool extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    client.connect({ channels: [CHANNEL] });
    this.loop = this.loop.bind(this);
    this.characters = [];
  }

  connectedCallback() {
    this.render();
    this.container = this.shadowRoot.querySelector(".container");

    client.on("message", ({ username, messageInfo, userInfo }) => {
      const { rawMessage } = messageInfo;
      const { color } = userInfo;
      const isPixelConga = rawMessage.toLowerCase() === "!pixelconga";

      if (isPixelConga) {
        const char = document.createElement("pixelconga-char");
        this.container.append(char);
        char.setNick(username);
        char.setColor(color);
        this.characters.push(char);
      }
    });

    requestAnimationFrame(this.loop);
  }

  loop() {
    console.log("Frame");
    this.characters.forEach(char => char.move());
    requestAnimationFrame(this.loop);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="container">
      </div>
    `);
    this.shadowRoot.adoptedStyleSheets.push(loaderCss(styles));
  }
}

customElements.define("pixelconga-pool", PixelcongaPool);
