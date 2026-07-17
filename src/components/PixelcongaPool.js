import { client } from "mtmi";

import CharList from "../modules/CharList.js";
import loaderCss from "../modules/loaderCss.js";
import styles from "./PixelcongaPool.css?raw";

const qs = new URL(location.href).searchParams;
const CHANNEL = qs.get("channel") ?? "manzdev";

class PixelcongaPool extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    client.connect({ channels: [CHANNEL] });
    this.loop = this.loop.bind(this);
    this.charList = new CharList();
  }

  connectedCallback() {
    this.render();
    this.container = this.shadowRoot.querySelector(".container");

    client.on("message", ({ username, messageInfo, userInfo }) => {
      const { rawMessage } = messageInfo;   // eslint-disable-line
      const { color } = userInfo;

      // const isPixelConga = rawMessage.toLowerCase() === "!pixelconga";
      const isPixelConga = true;

      if (isPixelConga) {
        const char = this.charList.add(username, { color });
        if (char) this.container.append(char);
      }
    });

    requestAnimationFrame(this.loop);
  }

  loop() {
    this.charList.forEach(char => char.style.setProperty("--hitbox", "transparent"));

    this.charList.forEach(char => {
      this.charList.forEach(opp => {
        if (char === opp) return;

        const isCollide = Math.abs(char.x - opp.x) < 64;

        if (isCollide) {
          char.style.setProperty("--hitbox", "red");
        }
      });
    });
    this.charList.forEach(char => char.move());
    requestAnimationFrame(this.loop);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`<div class="container"></div>`);  // eslint-disable-line
    this.shadowRoot.adoptedStyleSheets.push(loaderCss(styles));
  }
}

customElements.define("pixelconga-pool", PixelcongaPool);
