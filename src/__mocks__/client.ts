import { JSDOM } from "jsdom";
import { mockCanvas } from "./canvas";

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
const window = dom.window;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.window as any) = window;
global.document = window.document;
mockCanvas(window);