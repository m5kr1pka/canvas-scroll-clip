import { JSDOM } from "jsdom";

const dom = new JSDOM();
const window = dom.window;
let document = window.document;

global.document = document;