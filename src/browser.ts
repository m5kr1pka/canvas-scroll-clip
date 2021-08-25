// import { IViewport } from '@/helpers/intefaces';
import Boomerang from './main';

const frameCount = 146;
const firstFramePath = "https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg"
const options = {
  framePath: firstFramePath,
  frameCount: frameCount
}
const Boomer = new Boomerang('.boomerang', options, () => {
  console.log('Boomerang loaded.')
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).boomerang = Boomer // instead of casting window to any, you can extend the Window interface: https://stackoverflow.com/a/43513740/5433572

// Boomer.events.on('viewport.resize', (viewport: IViewport) => {
//   console.log(viewport);
// });

// Boomer.events.on('viewport.scroll', () => {
//   console.log('viewport.events.scroll event triggered.');
// });

Boomer.events.on('images.loaded', () => {
  console.log('images.loaded event triggered.');
});