$(window).load(function() {
    $('#darthphader').darthphader({
        'animationDuration' : 500,
        'waitTime' : 2000,
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

