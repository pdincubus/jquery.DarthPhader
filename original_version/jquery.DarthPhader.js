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
             'animationDuration' : 750,     //milliseconds
             'slideEasing' : 'swing',        //default options are swing or linear
             'includeNav' : true,            //do you want to output next/prev buttons?
             'navId' : 'phaderNav',          //create a blank div with an id
             'navIncludeNumSlides' : true,   //left and right nav plus number of slides shown (only on nextPrev nav style)
             'navNextId' : 'phadeNext',      //pick an ID
             'navPrevId' : 'phadePrev',      //see above
             'navNumClass' : 'phadeNum',     //pick a class
             'autoPhader' : true,            //automatically phade through slides?
             'waitTime' : 5000,              //how long between auto phading?
             'opacity' : 0,                  //fadeOut or just opacity hide? Default - fadeOut
             'loopButtons' : false,          //do buttons ever get disabled?
             'navStyle' : 'buttons'          //nextPrev or buttons?
         }, options);

         return this.each(function() {

             /*----------------------------------------------------
              *      init
              *----------------------------------------------------*/
             //figure out slides, and number of slides, set where we're at and figure out the width of a slide
             var slides = '#' + $(this).attr('id'),
                 slide = slides + ' > li',
                 numSlides = $(slide).size(),
                 currentSlide = 1;

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
             *      include nav?
             *----------------------------------------------------*/

             if ( settings.includeNav === true ) {
                 if ( !$('#' + settings.navPrevId).length ) {
                     var navHtml = '';

                     if ( settings.navStyle == 'nextPrev' ) {
                         //create left and right nav
                         navHtml = '<span id="' + settings.navPrevId + '">◄</span>';
                         if ( settings.navIncludeNumSlides === true ) {
                             //do we want to know what slide we're on?
                             navHtml = navHtml + '<span class="' + settings.navNumClass + '">1 of ' + slidings + '</span>';
                         }
                         navHtml = navHtml + '<span id="' + settings.navNextId + '">►</span>';

                         //disable previous to start with, I mean we're already at the beginning.
                         if(settings.loopButtons === false) {
                             $('#' + settings.navPrevId).addClass('disabled');
                         }
                     } else if ( settings.navStyle == 'buttons' ) {
                         navHtml = '<ul>';

                         $(slide).each(function() {
                             navHtml = navHtml + '<li>' + ( $(this).index() + 1 ) + '</li>';
                         });

                         navHtml = navHtml + '</ul>';
                     }

                     //add the nav to the nav element
                     $('#' + settings.navId).append(navHtml);

                     //add active class to first item
                     $('#' + settings.navId + ' > ul > li:first').addClass('active');
                 }
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
                         $(slide).eq(0).fadeIn(parseInt(settings.animationDuration,10));
                         $(slide).not(':first').fadeOut(parseInt(settings.animationDuration,10));
                     }

                     if (settings.navIncludeNumSlides === true && settings.includeNav === true) {
                         $('#' + settings.navId + ' .' + settings.navNumClass).text('1 of ' + numSlides);
                     }

                     if ( settings.includeNav === true && settings.navStyle == 'buttons' ) {
                        //add active class to first item
                        $('#' + settings.navId + ' > ul > li').removeClass('active');
                        //add active class to first item
                        $('#' + settings.navId + ' > ul > li:first').addClass('active');
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
                     if (settings.navIncludeNumSlides === true && settings.includeNav === true && settings.navStyle == 'nextPrev' ) {
                         $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + numSlides);
                     }

                     if ( settings.includeNav === true && settings.navStyle == 'buttons' ) {
                         $('#' + settings.navId + ' > ul > li').eq(currentSlide-1).addClass('active').siblings('li').removeClass('active');
                     }

                     //disable button if we've just reached the last slide
                     if (currentSlide === numSlides && settings.loopButtons === false) {
                         $('#' + settings.navNextId).addClass('disabled');
                     }
                 }
             }

             /*----------------------------------------------------
             *      Autophade enabled?
             *----------------------------------------------------*/

             if (settings.autoPhader === true) {
                 //set auto slide timer
                 var autoSlideTimer = setInterval(autoSliding, parseInt(settings.waitTime,10));
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

                     //disable button if we've just reached the first slide again
                     if (currentSlide === 1 && settings.loopButtons === false) {
                         $('#' + settings.navPrevId).addClass('disabled');
                     }
                 }

                 if (settings.autoPhader === true) {
                     autoSlideTimer = setInterval(autoSliding, parseInt(settings.waitTime,10));
                 }
             });

            /*----------------------------------------------------
             *      button list nav
             *----------------------------------------------------*/

            $('#' + settings.navId + ' > ul > li').on('click', function() {
                currentSlide = $(this).index();

                if (settings.autoPhader === true) {
                    clearInterval(autoSlideTimer);
                }

                //prevent animation queueing
                if ($(slide).is(':animated') === true) {
                    return;
                }

                //do the phading
                if(settings.opacity == 1) {
                    $(slide).not(':eq('+currentSlide+')').animate({
                        opacity: 0
                    }, parseInt(settings.animationDuration,10), settings.slideEasing);

                    $(slide).eq(currentSlide).animate({
                        opacity: 1
                    }, parseInt(settings.animationDuration,10), settings.slideEasing);
                } else {
                    $(slide).not(':eq('+currentSlide+')').fadeOut(parseInt(settings.animationDuration,10));
                    $(slide).eq(currentSlide).fadeIn(parseInt(settings.animationDuration,10));
                }

                //update button nav
                if ( settings.includeNav === true && settings.navStyle == 'buttons' ) {
                    $('#' + settings.navId + ' > ul > li').eq(currentSlide).addClass('active').siblings('li').removeClass('active');
                }

                if (settings.autoPhader === true) {
                    autoSlideTimer = setInterval(autoSliding, parseInt(settings.waitTime,10));
                }
            });
         });
     };
 })(jQuery);
