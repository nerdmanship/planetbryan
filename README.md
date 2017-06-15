# Title

![Picture](https://carrrs.com/wp-content/uploads/2015/04/placeholder-1000x400.png "Placeholder")

#### [Click to launch demo](#) or [live site](#)

## What is this?

This is...

## Purpose of the project

The purpose is to achieve...

## Biggest challenge

The tricky thing was...

## `Usage`

[Right click here](https://github.com/nerdmanship/WeCon/raw/master/dist/js/weconLogoAnimation.min.js) and choose *'Save link as...'* to download the script to your /js directory.

**index.html**

```html
<!-- Create a container for the animation -->
<div id="animation"></div>

<!-- Load the script at end of body -->
<script type="text/javascript" src="script.js"></script>

```

**index.js**

```js
// Call the initialising function at page load and pass the ID of the container
window.addEventListener("load", startAnimation("wrapper"));
```

**styles.css**

```css
/* Style the container as a normal div */
#wrapper {
  /* Styles */
}
```

## `Options`

**index.js**

```js
// You may pass an options object as a second argument
window.addEventListener("load", startAnimation("wrapper", { key: value, key: value }));
```

| Key | Comment | Example |
| - | - | - |
| delay | seconds | 5 |
| repeat | -1 is infinite | 3 |

## Dependencies
(Included in script.min.js)
* GSAP TweenMax
* GSAP MorphSVGPlugin
* GSAP DrawSVGPlugin

## Tech spec
* Size: X Kb including dependencies
* FPS: X
* Compatibility: All modern browsers

## Added value

This animation was also exported as...

## Delivery

#### [Click to download delivery package](https://www.dropbox.com/s/1kez3hpt3biqs97/wecon_delivery.zip?dl=1)
(Files are encrypted and password protected)

## Follow Nerdmanship
* [Facebook](http://www.facebook.com/nerdmanship)
* [Twitter](http://www.twitter.com/stromqvist)
* [Dribbble](http://www.dribbble.com/stromqvist)
* [Codepen](http://www.codepen.io/nerdmanship)

## License

The code is available under the [MIT license](LICENSE.txt).