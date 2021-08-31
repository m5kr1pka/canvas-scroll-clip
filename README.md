# Canvas Scroll Clip
[![Build Status](https://github.com/m5kr1pka/canvas-scroll-clip/actions/workflows/build.yml/badge.svg)](https://github.com/m5kr1pka/canvas-scroll-clip/actions/workflows/build.yml)

Canvas Scroll Clip is a standalone JavaScript micro-library for a fancy scroll based image sequence animation in canvas. Zero dependencies.

## Install
```
yarn add canvas-scroll-clip
```

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

## Usage
Initialize CSC on an element with required options:
```
new CanvasScrollClip(document.querySelector('.element'), {
  framePath: "{first_frame_url_of_a_sequence}",
  frameCount: 101,
  scrollArea: 2000
})
```


## Events

### viewport.scroll
Callback params: ```scrollTop```<br/>
Type: ```Number```

Event is triggered with scroll event. Returns ```scrollTop``` position.

#### Usage

```
CSCInstance.events.on('viewport.scroll', function(scrollTop){
  console.log(scrollTop);
});
```

### viewport.resize
Event is triggerent on window resize.

#### Usage
```
CSCInstance.events.on('viewport.resize', function(){
  console.log("window resized");
});
```

### images.loaded
Event is triggered after all images preloaded. Good place to implement loader animation.

#### Usage
```
CSCInstance.events.on('images.loaded', function() {
  console.log("images.loaded");
});
```

## Other

### License
MIT license

### Esbuild and UMD pending feature
Pending esbuild UMD format feature [--format=umd](https://github.com/evanw/esbuild/issues/507) support.
