# Boomerang.js
[![Build Status](https://travis-ci.com/m5kr1pka/boomerang.js.svg?branch=main)](https://travis-ci.com/m5kr1pka/boomerang.js)

Boomerang.js is a standalone JavaScript micro-library for fancy scroll based image sequence animation.

## Install
```
yarn add boomerang.js
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

## Usage

```
new Boomerang('.element', {
  framePath: "{first_frame_url_of_a_sequence}",
  frameCount: 111
})
```

## Events

### viewport.resize
Event is triggerent on window resize.

#### Usage
```
BoomerangInstance.events.on('viewport.resize', function(){
  console.log("window resized");
});
```

### viewport.scroll
Callback params: ```scrollTop```<br/>
Type: ```Number```

Event is triggered with scroll event. Returns ```scrollTop``` position.

#### Usage

```diff
!NOTE:
* Wrapper div element must have a `position: sticky` attribute. Refer to example source code.
```


```
BoomerangInstance.events.on('viewport.scroll', function(scrollTop){
  console.log(scrollTop);
});
```


### images.loaded
Event is triggered after all images preloaded. Good place to implement loader animation.

#### Usage
```
BoomerangInstance.events.on('images.loaded', function() {
  console.log("images.loaded");
});
```

## Other

### License
MIT license

### Esbuild and UMD pending feature
Pending esbuild UMD format feature [--format=umd](https://github.com/evanw/esbuild/issues/507) support.
