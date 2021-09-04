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
    _EventOnViewporResize: { action: 'resized' },
    _EventOnViewportScroll: { action: 'scrollTop' },
    _EventOnImagesLoaded: { action: 'loaded' }
  }
} as Meta;

/**
 * Interface props
 */
export interface ICSCProps extends IUserInputs {
  _EventOnImagesLoaded: () => void;
  _EventOnViewportScroll?: () => void;
  _EventOnViewporResize?: () => void;
}

/**
 * Default template
 * 
 * @param args 
 * @returns 
 */
const createPageTemplate = (args: ICSCProps) => {
  const canvas = document.createElement('div');
  canvas.classList.add(args.identifier || 'undefined');

  const csc = new CanvasScrollClip(canvas, {
    framePath: args.framePath,
    frameCount: args.frameCount,
    scrollArea: args.scrollArea,
    identifier: args.identifier
  }, args._EventOnImagesLoaded);

  if (args._EventOnViewportScroll !== undefined) {
    csc.events.on('viewport.scroll', args._EventOnViewportScroll)
  }

  if (args._EventOnViewporResize !== undefined) {
    csc.events.on('viewport.resize', args._EventOnViewporResize)
  }

  return canvas;
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
