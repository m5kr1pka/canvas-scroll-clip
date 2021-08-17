const JSDOM = require("jsdom").JSDOM;

const dom = new JSDOM();

global.document = dom.window.document;
global.window = dom.window;