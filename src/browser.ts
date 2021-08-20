import Boomerang from './main';
// import $ from "jquery";

// interface jQuery {
//   toggleVisibility(): JQuery;
//   check(): JQuery;
// }

// $.fn.extend({
//   check: function (checked: boolean) {
//     if (checked) {
//       $(this).parent().addClass('checked');
//     } else {
//       $(this).parent().removeClass('checked');
//     }

//     return this.prop('checked', checked);
//   }
// });

// console.log($)

// $.fn.extend({
//   Boomerang: () => {
//     console.log('sss')
//   }
// })

const frameCount = 148;
const firstFramePath = "https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/frame_0001.jpg"
const options = {
  framePath: firstFramePath,
  frameCount: frameCount
}
const Boomer = new Boomerang('.boomerang', options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).boomerang = Boomer // instead of casting window to any, you can extend the Window interface: https://stackoverflow.com/a/43513740/5433572

Boomer.events.on('viewport.resize', () => {
  console.log('viewport.events.resize event triggered.');
});

Boomer.events.on('viewport.scroll', () => {
  console.log('viewport.events.scroll event triggered.');
});

Boomer.events.on('images.loaded', () => {
  console.log('images.loaded event triggered.');
});

// $.fn.extend({
//   boomerang: function (a: any) {
//     console.log(a)
//     return new Boomerang();
//   }
// })

// document.addEventListener("DOMContentLoaded", () => {
  // console.log(window.$)
  // const app = new Boomerang();
// });
