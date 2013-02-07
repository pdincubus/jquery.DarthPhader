/**
* DarthPhader plugin
* I find your lack of configuration options disturbing
* @author Phil Steer
* https://github.com/pdincubus/jquery.DarthPhader
*/

(function($) {
    $.fn.darthPhader = function(options) {

        // settings
        var settings = $.extend({
            'animationDuration' : 1000,     //milliseconds
            'slideEasing' : 'swing',        //default options are swing or linear
            'includeNav' : true,            //do you want to output next/prev buttons?
            'navId' : 'phaderNav',          //create a blank div with an id
            'navIncludeNumSlides' : true,   //left and right nav plus number of slides shown
            'navNextId' : 'phadeNext',      //pick an ID
            'navPrevId' : 'phadePrev',      //see above
            'navNumClass' : 'phadeNum',     //pick a class
            'autoPhader' : false,           //wait for user interaction?
            'waitTime' : 4000               //how long between auto phading?
        }, options);

        return this.each(function() {
            //figure out slides, and number of slides, set where we're at and figure out the width of a slide
            var slides = '#' + $(this).attr('id');
            var slide = slides + ' > li';
            var numSlides = $(slide).size();
            var currentSlide = 1;

            $(slide).animate({
                opacity: 0
            }, 10)

            $(slide).eq(0).animate({
                opacity: 1
            }, 10);


            if (settings.autoPhader == true) {

                //set auto slide timer
                var autoSlideTimer = setInterval(autoSliding, settings.waitTime);

                //what to do when the timer function is called
                function autoSliding() {
                    if (currentSlide == numSlides) {
                        //we're at the beginning, rewind and reset
                        currentSlide = 1;

                        $('#' + settings.navNextId).removeClass('disabled');
                        $('#' + settings.navPrevId).addClass('disabled');

                        //do the phading
                        $(slide).eq(0).animate({
                            opacity: 1
                        }, 10);

                        $(slide).not(':first').animate({
                            opacity: 0
                        }, settings.animationDuration, settings.slideEasing);

                        $('#' + settings.navId + ' .' + settings.navNumClass).text('1 of ' + numSlides);
                    }else {
                        if (settings.includeNav == true) {
                            //ensure we don't have any disabled buttons
                            $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');
                        }

                        //do the phading
                        $(slide).eq(currentSlide-1).animate({
                            opacity: 0
                        }, settings.animationDuration, settings.slideEasing);

                        $(slide).eq(currentSlide).animate({
                            opacity: 1
                        }, settings.animationDuration, settings.slideEasing);

                        //increment the counter
                        currentSlide++;

                        //update nav counter
                        if (settings.navIncludeNumSlides == true && settings.includeNav == true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + numSlides);
                        }

                        //disable button if we've just reached the last slide
                        if (currentSlide == numSlides && settings.includeNav == true) {
                            $('#' + settings.navNextId).addClass('disabled');
                        }
                    }
                }
            }//end autoSlide


            if (settings.includeNav == true) {

                //create left and right nav
                var navHtml = '<span id="' + settings.navPrevId + '">&lt;</span>';
                if (settings.navIncludeNumSlides == true) {
                    //do we want to know what slide we're on?
                    var navHtml = navHtml + '<span class="' + settings.navNumClass + '">1 of ' + numSlides + '</span>';
                }
                var navHtml = navHtml + '<span id="' + settings.navNextId + '">&gt;</span>';

                //add the nav to the nav element
                $('#' + settings.navId).append(navHtml);
                //diable previous to start with, I mean we're already at the beginning.
                $('#' + settings.navPrevId).addClass('disabled');

                //what happens when we click previous?
                $('#' + settings.navPrevId).on('click', function() {

                    //interrupt the timer for auto if it's going
                    if (settings.autoPhader == true) {
                        clearInterval(autoSlideTimer);
                    }

                    //prevent animation queueing
                    if ($(slide).is(':animated') === true) {
                        return;
                    }

                    if (currentSlide == 1) {
                        //we're at the beginning, just disable the button
                        if (settings.autoPhader == true) {
                            autoSlideTimer = setInterval(autoSliding, settings.waitTime);
                        }

                        return;
                    }else {
                        //ensure we don't have any disabled buttons
                        $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');

                        //do the phading
                        $(slide).eq(currentSlide-2).animate({
                            opacity: 1
                        }, settings.animationDuration, settings.slideEasing);

                        $(slide).eq(currentSlide-1).animate({
                            opacity: 0
                        }, settings.animationDuration, settings.slideEasing);

                        //decrement counter
                        currentSlide--;

                        //update nav counter
                        if (settings.navIncludeNumSlides == true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + numSlides);
                        }

                        //disable button if we've just reached the first slide again
                        if (currentSlide == 1) {
                            $('#' + settings.navPrevId).addClass('disabled');
                        }
                    }

                    if (settings.autoPhader == true) {
                        autoSlideTimer = setInterval(autoSliding, settings.waitTime);
                    }
                });

                //what happens when we click next?
                $('#' + settings.navNextId).on('click', function() {

                    //interrupt the timer for auto if it's going
                    if (settings.autoPhader == true) {
                        clearInterval(autoSlideTimer);
                    }

                    //prevent animation queueing
                    if ($(slide).is(':animated') === true) {
                        return;
                    }

                    if (currentSlide == numSlides) {
                        //we're at the beginning, just disable the button

                        if (settings.autoPhader == true) {
                            autoSlideTimer = setInterval(autoSliding, settings.waitTime);
                        }

                        return;
                    }else {
                        //ensure we don't have any disabled buttons
                        $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');

                        //do the phading
                        $(slide).eq(currentSlide-1).animate({
                            opacity: 0
                        }, settings.animationDuration, settings.slideEasing);

                        $(slide).eq(currentSlide).animate({
                            opacity: 1
                        }, settings.animationDuration, settings.slideEasing);

                        //increment the counter
                        currentSlide++;

                        //update nav counter
                        if (settings.navIncludeNumSlides == true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + numSlides);
                        }

                        //disable button if we've just reached the last slide
                        if (currentSlide == numSlides) {
                            $('#' + settings.navNextId).addClass('disabled');
                        }
                    }

                    if (settings.autoPhader == true) {
                        autoSlideTimer = setInterval(autoSliding, settings.waitTime);
                    }
                });

            }//end includeNav stuff
        });
    };
})(jQuery);
