//to call the jqery plugin
/*
$(window).load(function() {
    $('#darthphader').darthphader({
        'animationDuration' : 1000,
        'waitTime' : 3000,
        'autoPhader' : true,
        'crossfade' : true,
        'slide' : '.slide',
        'container' : '.container',
        'prevClass' : '.prevSlide',
        'nextClass' : '.nextSlide',
        'accessible' : true,
        'showNav' : true,
        'navStyle' : 'nextPrev'
    });
});
*/

//to create and call a vanilla js
var phader1 = phaderModule.phader( $('#darthphader'), {'autoPhader' : false} );