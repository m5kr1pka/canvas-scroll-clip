import "./main.css";

import { Story, Meta } from '@storybook/html';
import { IUserInputs } from './helpers/intefaces';
import CanvasScrollClip from './main';

/**
 * Storybook config
 */
export default {
  title: 'Canvas Scroll Clip',
  argTypes: {
    framePath: { control: 'text' },
    frameCount: { control: 'number' },
    scrollArea: { control: 'number' },
    identifier: { control: 'text' },
    eventOnViewporResize: { action: 'resized' },
    eventOnViewportScroll: { action: 'scrollTop' },
    eventOnImagesLoaded: { action: 'loaded' },
    EventOnImagesProgress: { action: 'progress' }
  }
} as Meta;

/**
 * Interface props
 */
export interface ICSCProps extends IUserInputs {
  dummyContent?: boolean;
  eventOnImagesLoaded: () => void;
  eventOnViewportScroll?: () => void;
  eventOnViewporResize?: () => void;
  eventOnImageLoadProgress?: () => void;
}

/**
 * Default template
 * 
 * @param args 
 * @returns 
 */
const createPageTemplate = (args: ICSCProps) => {
  const container = document.createElement('div');
  container.classList.add('main');
  container.innerHTML = [
    '<div class="scroll-indicator">',
    '<span class="scroll-indicator-icon"></span>',
    '<span>scroll down</span>',
    '</div>'
  ].join('');

  if (args.dummyContent) {
    const dummyBegining = document.createElement('div');
    dummyBegining.innerText = "Some content";
    dummyBegining.classList.add('dummy');
    container.appendChild(dummyBegining);
  }

  const canvas = document.createElement('div');
  canvas.classList.add(args.identifier || 'undefined');

  const csc = new CanvasScrollClip(canvas, {
    framePath: args.framePath,
    frameCount: args.frameCount,
    scrollArea: args.scrollArea,
    identifier: args.identifier
  }, args.eventOnImagesLoaded);

  if (args.eventOnViewportScroll !== undefined) {
    csc.events.on('viewport.scroll', args.eventOnViewportScroll)
  }

  if (args.eventOnViewporResize !== undefined) {
    csc.events.on('viewport.resize', args.eventOnViewporResize)
  }

  if (args.eventOnImageLoadProgress !== undefined) {
    csc.events.on('images.progress', args.eventOnImageLoadProgress)
  }

  container.appendChild(canvas);

  if (args.dummyContent) {
    const dummyEnd = document.createElement('div');
    dummyEnd.innerText = "Enjoy!";
    dummyEnd.classList.add('dummy');
    container.appendChild(dummyEnd);
  }

  return container;
}

/**
 * Story Template
 * 
 * @param args 
 * @returns 
 */
const Template: Story<ICSCProps> = (args) => createPageTemplate(args);

/**
 * Default story
 * 
 * @param args 
 * @returns 
 */
export const Default = Template.bind({});
Default.args = {
  framePath: 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg',
  frameCount: 140,
  scrollArea: 2000
}

export const WithDummyContent = Template.bind({});
WithDummyContent.args = {
  framePath: 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg',
  frameCount: 140,
  scrollArea: 2000,
  dummyContent: true
};