import { recommended } from "eslint-config-manzdev";

export default [
  ...recommended,
  {
    rules: {
      "wc/no-exports-with-element": "off"
    }
  }
];
