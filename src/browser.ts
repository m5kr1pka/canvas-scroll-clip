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

const Boomer = new Boomerang();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).boomerang = Boomer // instead of casting window to any, you can extend the Window interface: https://stackoverflow.com/a/43513740/5433572

Boomer.events.on('viewport.events.resize', () => {
  console.log('viewport.events.resize callback triggered.');
});

Boomer.events.on('viewport.events.scroll', () => {
  console.log('viewport.events.scroll callback triggered.');
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
