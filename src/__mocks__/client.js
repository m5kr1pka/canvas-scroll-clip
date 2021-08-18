const JSDOM = require("jsdom").JSDOM;

const dom = new JSDOM();
const window = dom.window;
let document = window.document;

global.document = document;
global.window = window;