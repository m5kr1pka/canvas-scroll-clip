# Canvas Scroll Clip
[![Build Status](https://github.com/m5kr1pka/canvas-scroll-clip/actions/workflows/build.yml/badge.svg)](https://github.com/m5kr1pka/canvas-scroll-clip/actions/workflows/build.yml) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://m5kr1pka.github.io/canvas-scroll-clip/?path=/story/canvas-scroll-clip--default)


Canvas Scroll Clip is a standalone JavaScript micro-library for a fancy scroll based image sequence animation in canvas. There is no third party dependencies. 
- Check the **[demo](https://m5kr1pka.github.io/canvas-scroll-clip/?path=/story/canvas-scroll-clip--default)**. 
- View [example](https://github.com/m5kr1pka/canvas-scroll-clip/blob/main/www/index.html) implementation.
- React component [Gist example](https://gist.github.com/m5kr1pka/f02c2afcaf5c73cc38546a801c48368a)

## Install
```
yarn add canvas-scroll-clip
```
```
npm install --save canvas-scroll-clip
```

## Usage
Initialize Canvas Scroll Clip on an element with options:

```
import CanvasScrollClip from "canvas-scroll-clip";

new CanvasScrollClip(document.querySelector('.element'), {
  framePath: "{url_of_first_frame_in_a_sequence}",
  frameCount: 101,
  scrollArea: 2000
})
```

### require('...').default
When importing a module using require use .default `const CanvasScrollClip = require('canvas-scroll-clip').default`. Decided to stick with pure ES6 module semantics and keep the code generation as clean as possible.

## Options
Options object is required and takes these parameters:

#### framePath (required)
Type: ```String```
URL of first image of a sequence.

**Important note:** Sequence should start with leading 0, minimum 2 digits and at the end of the name. for example: ```https://<URL>/frame_0001.jpg```. 

#### frameCount (required)
Type: ```Number```
Number of in total in a sequence.

#### scrollArea (recommended)
Type: ```Number```<br>
Default: ```2x the IMAGE height```

Scrollable area height that is used to play the image sequence.

#### identifier
Type: ```String```
Used for container and child element css classes.

## Events

### viewport.scroll
Callback params: ```scrollTop```<br/>
Type: ```Number```

Event is triggered with scroll event. Returns ```scrollTop``` position.

#### Usage

```
CanvasScrollClip.events.on('viewport.scroll', function(scrollTop){
  console.log(scrollTop);
});
```

### viewport.resize
Event is triggerent on window resize.

#### Usage
```
CanvasScrollClip.events.on('viewport.resize', function(){
  console.log("window resized");
});
```

### images.loaded
Event is triggered after all images preloaded. Good place to implement loader animation.

#### Usage
```
CanvasScrollClip.events.on('images.loaded', function() {
  console.log("images.loaded");
});
```

### images.progress
Callback params (```object```): <br/>
```total: frameCount```<br/>
```loaded: loadedImageCount```<br/>

Event is triggered after every image preloaded. Good place to implement progress bar.

#### Usage
```
CanvasScrollClip.events.on('images.progress', function(progress) {
  console.log(progress);
});
```

### License
MIT license

### Esbuild and UMD pending feature
Pending esbuild UMD format feature [--format=umd](https://github.com/evanw/esbuild/issues/507) support.
