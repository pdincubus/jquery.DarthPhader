/**
* DarthPhader plugin
* I find your lack of configuration options disturbing
* @author Phil Steer
* https://github.com/pdincubus/jquery.DarthPhader
*/

(function($) {
    $.fn.darthPhader = function(options) {
        /*----------------------------------------------------
         *      default settings
         *----------------------------------------------------*/

        var settings = $.extend({
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
        }, options);

        return this.each(function() {

            /*----------------------------------------------------
             *      init
             *----------------------------------------------------*/
            //figure out slides, and number of slides, set where we're at and figure out the width of a slide
            var slides = '#' + $(this).attr('id');
            var slide = slides + ' > li';
            var numSlides = $(slide).size();
            var currentSlide = 1;

            //initial setup of slides
            if(settings.opacity == 1) {
                $(slide).animate({
                    opacity: 0
                }, 10);

                $(slide).eq(0).animate({
                    opacity: 1
                }, 10);
            } else {
                $(slide).hide();
                $(slide).eq(0).show();
            }

            /*----------------------------------------------------
             *      Auto fading
             *----------------------------------------------------*/
            function autoSliding() {
                if (currentSlide === numSlides) {
                    //we're at the beginning, rewind and reset
                    currentSlide = 1;

                    if(settings.loopButtons === false) {
                        $('#' + settings.navPrevId).addClass('disabled');
                    }

                    //do the phading
                    if(settings.opacity == 1) {
                        $(slide).eq(0).animate({
                            opacity: 1
                        }, 10);

                        $(slide).not(':first').animate({
                            opacity: 0
                        }, parseInt(settings.animationDuration,10), settings.slideEasing);
                    } else {
                        $(slide).eq(0).show();
                        $(slide).not(':first').fadeOut(parseInt(settings.animationDuration,10));
                    }

                    if (settings.navIncludeNumSlides === true && settings.includeNav === true) {
                        $('#' + settings.navId + ' .' + settings.navNumClass).text('1 of ' + numSlides);
                    }
                } else {
                    if (settings.includeNav === true && settings.loopButtons === false) {
                        //ensure we don't have any disabled buttons
                        $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');
                    }

                    //do the phading
                    if(settings.opacity == 1) {
                        $(slide).eq(currentSlide-1).animate({
                            opacity: 0
                        }, parseInt(settings.animationDuration,10), settings.slideEasing);

                        $(slide).eq(currentSlide).animate({
                            opacity: 1
                        }, parseInt(settings.animationDuration,10), settings.slideEasing);
                    } else {
                        $(slide).eq(currentSlide-1).fadeOut(parseInt(settings.animationDuration,10));
                        $(slide).eq(currentSlide).fadeIn(parseInt(settings.animationDuration,10));
                    }

                    //increment the counter
                    currentSlide++;

                    //update nav counter
                    if (settings.navIncludeNumSlides === true && settings.includeNav === true) {
                        $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + numSlides);
                    }

                    //disable button if we've just reached the last slide
                    if (currentSlide === numSlides && settings.loopButtons === false) {
                        $('#' + settings.navNextId).addClass('disabled');
                    }
                }
            }//end autoSliding function

            if (settings.autoPhader === true) {
                //set auto slide timer
                var autoSlideTimer = setInterval(autoSliding, parseInt(settings.waitTime,10));
            }

            /*----------------------------------------------------
             *      phader nav
             *----------------------------------------------------*/

            if (settings.includeNav === true) {
                //we only need to add it if it doesn't exist
                if(!$('#' + settings.navPrevId).length) {
                    //create left and right nav
                    var navHtml = '<span id="' + settings.navPrevId + '">&lt;</span>';

                    if (settings.navIncludeNumSlides === true) {
                        //do we want to know what slide we're on?
                        navHtml = navHtml + '<span class="' + settings.navNumClass + '">1 of ' + numSlides + '</span>';
                    }

                    navHtml = navHtml + '<span id="' + settings.navNextId + '">&gt;</span>';

                    //add the nav to the nav element
                    $('#' + settings.navId).append(navHtml);

                    //diable previous to start with, I mean we're already at the beginning.
                    if(settings.loopButtons === false) {
                        $('#' + settings.navPrevId).addClass('disabled');
                    }

                    /*----------------------------------------------------
                     *      prev button
                     *----------------------------------------------------*/

                    $('#' + settings.navPrevId).on('click', function() {
                        //interrupt the timer for auto if it's going
                        if (settings.autoPhader === true) {
                            clearInterval(autoSlideTimer);
                        }

                        //prevent animation queueing
                        if ($(slide).is(':animated') === true) {
                            return;
                        }

                        if (currentSlide === 1) {
                            if(settings.loopButtons === true) {
                                currentSlide = numSlides;

                                //do the phading
                                if(settings.opacity == 1) {
                                    $(slide).animate({
                                        opacity: 0
                                    }, parseInt(settings.animationDuration,10), settings.slideEasing);

                                    $(slide).eq(currentSlide).animate({
                                        opacity: 1
                                    }, 10);
                                } else {
                                    $(slide).eq(currentSlide-1).fadeIn(parseInt(settings.animationDuration,10));
                                    $(slide).eq(currentSlide-1).siblings().fadeOut(parseInt(settings.animationDuration,10));
                                }

                                $('#' + settings.navId + ' .' + settings.navNumClass).text('1 of ' + numSlides);
                            } else {
                                //we're at the beginning, just disable the button
                                $('#' + settings.navPrevId).addClass('disabled');
                                return;
                            }
                        } else {
                            //ensure we don't have any disabled buttons
                            if(settings.loopButtons === false) {
                                $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');
                            }

                            //do the phading
                            if(settings.opacity == 1) {
                                $(slide).eq(currentSlide-2).animate({
                                    opacity: 1
                                }, parseInt(settings.animationDuration,10), settings.slideEasing);

                                $(slide).eq(currentSlide-1).animate({
                                    opacity: 0
                                }, parseInt(settings.animationDuration,10), settings.slideEasing);
                            } else {
                                $(slide).eq(currentSlide-2).fadeIn(parseInt(settings.animationDuration,10));
                                $(slide).eq(currentSlide-1).fadeOut(parseInt(settings.animationDuration,10));
                            }

                            //decrement counter
                            currentSlide--;

                            //update nav counter
                            if (settings.navIncludeNumSlides === true) {
                                $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + numSlides);
                            }

                            //disable button if we've just reached the first slide again
                            if (currentSlide === 1 && settings.loopButtons === false) {
                                $('#' + settings.navPrevId).addClass('disabled');
                            }
                        }

                        if (settings.autoPhader === true) {
                            autoSlideTimer = setInterval(autoSliding, parseInt(settings.waitTime,10));
                        }
                    });
                }

                /*----------------------------------------------------
                 *      next button
                 *----------------------------------------------------*/

                $('#' + settings.navNextId).on('click', function() {

                    //interrupt the timer for auto if it's going
                    if (settings.autoPhader === true) {
                        clearInterval(autoSlideTimer);
                    }

                    //prevent animation queueing
                    if ($(slide).is(':animated') === true) {
                        return;
                    }

                    if (currentSlide === numSlides) {
                        if(settings.loopButtons === true) {
                            //we're at the beginning, rewind and reset
                            currentSlide = 1;

                            //do the phading
                            if(settings.opacity == 1) {
                                $(slide).eq(0).animate({
                                    opacity: 1
                                }, 10);

                                $(slide).not(':first').animate({
                                    opacity: 0
                                }, parseInt(settings.animationDuration,10), settings.slideEasing);
                            } else {
                                $(slide).eq(0).show();
                                $(slide).not(':first').fadeOut(parseInt(settings.animationDuration,10));
                            }
                        } else {
                            //we're at the end, just disable the button
                            $('#' + settings.navNextId).addClass('disabled');
                            return;
                        }

                        if (settings.navIncludeNumSlides === true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text('1 of ' + numSlides);
                        }
                    } else {
                        //ensure we don't have any disabled buttons
                        if(settings.loopButtons === true) {
                            $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');
                        }

                        //do the phading
                        if(settings.opacity == 1) {
                            $(slide).eq(currentSlide-1).animate({
                                opacity: 0
                            }, parseInt(settings.animationDuration,10), settings.slideEasing);

                            $(slide).eq(currentSlide).animate({
                                opacity: 1
                            }, parseInt(settings.animationDuration,10), settings.slideEasing);
                        } else {
                            $(slide).eq(currentSlide-1).fadeOut(parseInt(settings.animationDuration,10));
                            $(slide).eq(currentSlide).fadeIn(parseInt(settings.animationDuration,10));
                        }

                        //increment the counter
                        currentSlide++;

                        //update nav counter
                        if (settings.navIncludeNumSlides === true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + numSlides);
                        }

                        //disable button if we've just reached the last slide
                        if (currentSlide === numSlides && settings.loopButtons === false) {
                            $('#' + settings.navNextId).addClass('disabled');
                        }
                    }

                    if (settings.autoPhader === true) {
                        autoSlideTimer = setInterval(autoSliding, parseInt(settings.waitTime,10));
                    }
                });

            }//end includeNav stuff
        });
    };
})(jQuery);
