import { JSDOM } from "jsdom";

const dom = new JSDOM();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.window as any) = dom.window;
global.document = dom.window.document;