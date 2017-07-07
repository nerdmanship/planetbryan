# Planet Bryan Animation

![Picture](https://carrrs.com/wp-content/uploads/2015/04/placeholder-1000x400.png "Placeholder")

#### [Click to launch demo](https://nerdmanship.github.io/planetbryan/dist/) or [live site](https://planetbryan.com)

## `Usage`

Download dependencies to your /css or /js directory respectively.
Right click and choose *'Save link as...'*

* [particles.min.js](#)
* [TweenMax.min.js](#)
* [bowser.min.js](#)
* [planetbryan.js](#)
* [planetbryan.css](#)

**index.html**

```html
<!-- Load styles in the page head -->
<link rel="stylesheet" type="text/css" href="css/planetbryan.css"/>

<!-- Create a container for the animation -->
<div id="myDiv"></div>

<!-- Load scripts at end of body -->
<script type="text/javascript" src="particles.min.js"></script>
<script type="text/javascript" src="TweenMax.min.js"></script>
<script type="text/javascript" src="bowser.min.js"></script>
<script type="text/javascript" src="planetbryan.js"></script>

```
  
**index.js**

```js
// Call the initialising function at page load and pass the ID of the container
window.addEventListener("load", initPlanetBryan("myDiv"));
```

## `Specify client browser rules`
Add your own rules in the `getMode()` function at line ~160 in planetbryan.js

## Tech spec
* Size: X Kb including dependencies
* FPS: X
* Compatibility: All modern browsers


## Follow Nerdmanship
* [Facebook](http://www.facebook.com/nerdmanship)
* [Twitter](http://www.twitter.com/stromqvist)
* [Dribbble](http://www.dribbble.com/stromqvist)
* [Codepen](http://www.codepen.io/nerdmanship)

## License

The code is available under the [MIT license](LICENSE.txt).