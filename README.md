# jquery.DarthPhader plugin

Turns a ```<ul>``` into a very simple fading carousel.

Under 3KB compressed!

[Demo with auto fading enabled](http://pdincubus.github.com/jquery.DarthPhader/phade.html)

## Basic example

### HTML

```html
<div id="phaderContainer">
    <ul class="cf" id="phader">
        <li>
            <!--content of slide-->
        </li>
        <li>
            <!--content of slide-->
        </li>
        <li>
            <!--content of slide-->
        </li>
    </ul>
    <!--this is for the nav next/prev/counter-->
    <div id="phaderNav"></div>
</div>
```

### CSS

Here's a basic idea of some CSS that will get you on your way:

```css
#phaderContainer {
    width: 500px;
    height: 330px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

#phaderNav {
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 1000;
    font-size: 18px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #fff;
    padding: 4px;
}

#phaderNav span.phadePrev, #phadeNav span.phadeNext {
    cursor: pointer;
    padding: 2px 5px;
    display: inline-block;
}

#phaderNav span.disabled {
    color: #ccc;
}

#phaderNav span.phadeNav {
    margin: 2px 10px;
    display: inline-block;
}

ul#phader {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 500px;
    height: 330px;
}

ul#phader li {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
}

ul#phader li img {
    max-width: 100%;
}
```

### jQuery

Make sure you have called jQuery, pulled in the shlider js file (and easing if you want those effects too) before you try to run Shlider:

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="http://cachedcommons.org/cache/jquery-easing/1.3.0/javascripts/jquery-easing-min.js"></script>
<script type="text/javascript" src="/path/to/js/jquery.DarthPhader.js"></script>
```

Call shlider to run on the ```<ul>``` inside your ```<div>``` container. Ensure you have set an ID on it! This can be on ```$(document).ready()``` if you prefer. I use ```$(window).load``` so that I know all images, etc have finished loading before anything happens.

Here are all the possible settings, and their defaults

```javascript
$(window).load(function() {
    $('#phader').darthPhader({
        'animationDuration' : 2000,     //milliseconds
        'slideEasing' : 'swing',        //default options are swing or linear
        'includeNav' : true,            //do you want to output next/prev buttons?
        'navId' : 'phaderNav',          //create a blank div with an id
        'navIncludeNumSlides' : true,   //left and right nav plus number of slides shown
        'navNextId' : 'phadeNext',      //pick an ID
        'navPrevId' : 'phadePrev',      //see above
        'navNumClass' : 'phadeNum',     //pick a class
        'autoPhader' : false,           //wait for user interaction?
        'waitTime' : 5000,              //how long between auto phading?
        'opacity' : 0,                  //fadeOut or just opacity hide? Default - fadeOut
        'loopButtons' : false           //do buttons ever get disabled?
    });
});
```

Yeah, that's right. Even though it only fades in and out I left the option in for easing. Any why not? Exactly. Doesn't matter if it's a bit useless here, you can do some flickery smooshy lovely fades with it.

## Browsers

It's pretty simple as a plugin so should work on any graphical browser with javascript enabled. I've tested in Firefox and Chrome. So likely it will work in Opera, Safari, IE10, IE9, IE8, and maybe IE7 & IE6 at a push. Maybe.

## Photos

My dad takes nice photos. He let me use them because he's nice. [You should go and look at them](http://www.flickr.com/photos/dsnine). All rights reserved and all that kind of stuff, yeah?
