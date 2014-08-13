!function($) {
    var DarthPhader = function(elem, opts) {
        this.init('darthphader', elem, opts);
    };

    //------------------------------------------------------------------------------
    //    Init
    //------------------------------------------------------------------------------
    DarthPhader.prototype = {
        constructor: DarthPhader,
        init: function(type, elem, opts) {
            this.type = type;
            this.$element = $(elem);
            this.options = this.getOptions(opts);
            this.slides = [];
            this.setup();
        },

        getOptions: function(opts) {
            return $.extend({}, $.fn[this.type].defaults, this.$element.data(), opts);
        },

        //------------------------------------------------------------------------------
        //    Setup click events, triggers, base view of phader
        //------------------------------------------------------------------------------
        setup: function(opts) {
            var that = this;

            //------------------------------------------------------------------------------
            //    show first slide, hide the rest
            //------------------------------------------------------------------------------
            $(this.options.container + ' ' + this.options.slide).hide();
            $(this.options.container + ' ' + this.options.slide).eq(0).show().addClass('active');

            //------------------------------------------------------------------------------
            //    accessibility things
            //------------------------------------------------------------------------------
            if ( this.options.accessible === true ) {
                $(this.options.container + ' ' + this.options.slide).eq(0).attr('aria-live', 'assertive');
            }

            //------------------------------------------------------------------------------
            //    set up nav buttons
            //------------------------------------------------------------------------------
            if ( this.options.showNav === true ) {
                if ( this.options.navStyle == 'nextPrev' ) {
                    this.$element.append('<nav>
                        <button class="' + this.options.prevClass.replace('.','') + '">Previous</button>
                        <button class="' + this.options.nextClass.replace('.','') + '">Next</button>
                    </nav>');
                } else {
                    var buttonHtml = '';

                    $(this.options.slide).each(function() {
                        buttonHtml = buttonHtml + '<button data-slide="' + $(this).index() + '" class="' + that.options.buttonClass.replace('.','') + '">' + ( $(this).index() + 1 ) + '</button>';
                    });

                    this.$element.append('<nav>' + buttonHtml + '</nav>');
                }
            }

            //------------------------------------------------------------------------------
            //    Autophade
            //------------------------------------------------------------------------------
            if ( this.options.autoPhader === true ) {
                var autoPhaderTimer = setInterval(this.autoPhade(), parseInt(this.options.waitTime,10));
            }

            //------------------------------------------------------------------------------
            //    Next, previous and specific slide trigger functions
            //------------------------------------------------------------------------------
            this.slides = this.$element.on({
                'slide.next': function(e) {
                    //interrupt the timer for auto if it's going
                    if (that.options.autoPhader === true) {
                        console.log('clearing timer');
                        clearInterval(autoPhaderTimer);
                    }

                    var $slide = that.getNextSlide();

                    if ( $slide === null ) {
                        that.goToSlide(0);
                    } else {
                        that.goToSlide($slide.prevAll(that.options.slide).length);
                    }

                    //set timer going again
                    if (that.options.autoPhader === true) {
                        console.log('setting timer going');
                        autoPhaderTimer = setInterval(that.autoPhade(), parseInt(that.options.waitTime,10));
                    }
                },

                'slide.prev': function(e) {
                    //interrupt the timer for auto if it's going
                    if (that.options.autoPhader === true) {
                        console.log('clearing timer');
                        clearInterval(autoPhaderTimer);
                    }

                    var $slide = that.getPrevSlide();

                    if ( $slide === null ) {
                        that.goToSlide($(that.options.slide).length - 1);
                    } else {
                        that.goToSlide($slide.prevAll(that.options.slide).length);
                    }

                    //set timer going again
                    if (that.options.autoPhader === true) {
                        console.log('setting timer going');
                        autoPhaderTimer = setInterval(that.autoPhade(), parseInt(that.options.waitTime,10));
                    }
                },

                'slide.specific': function(e, slideNum) {
                    //interrupt the timer for auto if it's going
                    if (that.options.autoPhader === true) {
                        console.log('clearing timer');
                        clearInterval(autoPhaderTimer);
                    }

                    that.goToSpecificSlide(slideNum);

                    //set timer going again
                    if (that.options.autoPhader === true) {
                        console.log('setting timer going');
                        autoPhaderTimer = setInterval(that.autoPhade(), parseInt(that.options.waitTime,10));
                    }
                }
            });

            //------------------------------------------------------------------------------
            //    Next, previous and button click events
            //------------------------------------------------------------------------------
            this.$element.on('click', this.options.nextClass, function(e) {
                e.preventDefault();
                that.$element.trigger('slide.next');
            });

            this.$element.on('click', this.options.prevClass, function(e) {
                e.preventDefault();
                that.$element.trigger('slide.prev');
            });

            this.$element.on('click', this.options.buttonClass, function(e) {
                e.preventDefault();

                var slideNum = $(this).attr('data-slide');
                that.$element.trigger('slide.specific', [ slideNum ]);
            });
        },

        //------------------------------------------------------------------------------
        //    Work out what the current slide is
        //------------------------------------------------------------------------------
        getCurrentSlide: function() {
            return this.$element.find(this.options.slide + '.active');
        },

        //------------------------------------------------------------------------------
        //    Work out the next slide in sequence
        //------------------------------------------------------------------------------
        getNextSlide: function() {
            var $currentSlide = this.getCurrentSlide();

            if ( $currentSlide.length === 0) {
                return null;
            }

            var $nextSlide = $currentSlide.nextAll(this.options.slide).first();

            if ( $nextSlide.length === 0 ) {
                return null;
            }

            return $nextSlide;
        },

        //------------------------------------------------------------------------------
        //    Woek out previous slide in sequence
        //------------------------------------------------------------------------------
        getPrevSlide: function() {
            var $currentSlide = this.getCurrentSlide();

            if ( $currentSlide.length === 0) {
                return null;
            }

            var $prevSlide = $currentSlide.prevAll(this.options.slide).first();

            if ( $prevSlide.length === 0 ) {
                return null;
            }

            return $prevSlide;
        },

        //------------------------------------------------------------------------------
        //    Go to slide - used for only single slide jump
        //------------------------------------------------------------------------------
        goToSlide: function(slideNumber) {

            var $slides = this.$element.find(this.options.slide),
                $active = $slides.filter(function() { return $(this).hasClass('active'); }),
                $target = $slides.slice(slideNumber, slideNumber + 1);

            if ( this.options.crossfade === true ) {
                $active.finish().fadeOut(parseInt(this.options.animationDuration, 10)*1.5).removeClass('active');
                $target.finish().fadeIn(parseInt(this.options.animationDuration, 10)).addClass('active');
            } else {
                var that = this;

                $active.finish().fadeOut(parseInt(this.options.animationDuration, 10), function() {
                    $target.finish().fadeIn(parseInt(that.options.animationDuration, 10)).addClass('active');
                }).removeClass('active');
            }

            if ( this.options.accessible === true ) {
                $active.attr('aria-live', 'off');
                $target.attr('aria-live', 'assertive');
            }
        },

        //------------------------------------------------------------------------------
        //    Go to slide - used for jumping more than one slide at a time
        //------------------------------------------------------------------------------
        goToSpecificSlide: function(slideNumber) {
            var $slides = this.$element.find(this.options.slide),
                $target = $slides.eq(slideNumber);

            if ( this.options.crossfade === true ) {
                $slides.finish().fadeOut(parseInt(this.options.animationDuration, 10)*1.5).removeClass('active');
                $target.finish().fadeIn(parseInt(this.options.animationDuration, 10)).addClass('active');
            } else {
                var that = this;
                $slides.finish().fadeOut(parseInt(this.options.animationDuration, 10), function() {
                    $target.finish().fadeIn(parseInt(that.options.animationDuration, 10)).addClass('active');
                }).removeClass('active');
            }

            if ( this.options.accessible === true ) {
                $slides.attr('aria-live', 'off');
                $target.attr('aria-live', 'assertive');
            }
        },

        //------------------------------------------------------------------------------
        //    Let things phade on their own
        //------------------------------------------------------------------------------
        autoPhade: function() {
            console.log('autoPhade timeout triggered');
            //this.$element.trigger('slide.next');
        }
    };

    //------------------------------------------------------------------------------
    //    Stuff and things
    //------------------------------------------------------------------------------
    $.fn.darthphader = function(option) {
        return this.each(function() {
            var $this = $(this),
               data = $this.data('darthphader'),
               options = typeof option == 'object' && option;

            if (!data) {
                $this.data('darthphader', data = new DarthPhader(this, options));
            }

            if (typeof option == 'string') {
                data[option]();
            }
        });
    };

    //------------------------------------------------------------------------------
    //    Options
    //------------------------------------------------------------------------------
    $.fn.darthphader.defaults = {
        'animationDuration' : 500,
        'waitTime' : 5000,
        'autoPhader' : false,
        'crossfade' : true,
        'slide' : '.slide',
        'container' : '.container',
        'prevClass' : '.prevSlide',
        'nextClass' : '.nextSlide',
        'accessible' : true,
        'showNav' : true,
        'navStyle' : 'nextPrev', //or buttons
        'buttonClass' : '.button' //not used for nextPrev nav
    };
}(window.jQuery);
