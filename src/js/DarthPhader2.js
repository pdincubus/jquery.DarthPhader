/**
 * Created by gavincockrem on 21/04/15.
 */
var phaderModule = (function() {
	var $element = null;

	var animationDuration = 500;
	var waitTime = 5000;
	var autoPhader = false;
	var crossfade = true;
	var slide = '.slide';
	var container = '.container';
	var prevClass = '.prevSlide';
	var nextClass = '.nextSlide';
	var accessible = true;
	var showNav = true;
	var navStyle = 'nextPrev'; //or buttons
	var buttonClass = '.button'; //not used for nextPrev nav

	var autoPhaderTimer;

	//var slides = [];

	//------------------------------------------------------------------------------
	//    Init
	//------------------------------------------------------------------------------

	function Phader( element, options ) {

		$element = element;
		//console.log('animationDuration: ', animationDuration);
		animationDuration = options.animationDuration || animationDuration;
		waitTime = options.waitTime || waitTime;
		autoPhader = options.autoPhader || autoPhader;
		crossfade = options.crossfade || crossfade;
		slide = options.slide || slide;
		container = options.container || container;
		prevClass = options.prevClass || prevClass;
		nextClass = options.nextClass || nextClass;
		accessible = options.accessible || accessible;
		showNav = options.showNav || showNav;
		navStyle = options.navStyle || navStyle;
		buttonClass = options.buttonClass || buttonClass;

		setup();

		//------------------------------------------------------------------------------
		//    Setup click events, triggers, base view of phader
		//------------------------------------------------------------------------------

		function setup() {

			//------------------------------------------------------------------------------
			//    show first slide, hide the rest
			//------------------------------------------------------------------------------

			$(container + ' ' + slide).hide();
			$(container + ' ' + slide).eq(0).show().addClass('active');

			//------------------------------------------------------------------------------
			//    accessibility things
			//------------------------------------------------------------------------------

			if (accessible === true) {
				$(container + ' ' + slide).eq(0).attr('aria-live', 'assertive');
			}


			//------------------------------------------------------------------------------
			//    set up nav buttons
			//------------------------------------------------------------------------------
			if (showNav === true) {

				if (navStyle == 'nextPrev') {
					$element.append('<nav>' +
					'<button class="' + prevClass.replace('.', '') + '">Previous</button>' +
					'<button class="' + nextClass.replace('.', '') + '">Next</button>' +
					'</nav>');
				} else {
					var buttonHtml = '';
					$(slide).each(function () {
						buttonHtml = buttonHtml + '<button data-slide="' + $(this).index() + '" class="' + buttonClass.replace('.', '') + '">' + ( $(this).index() + 1 ) + '</button>';
					});
					$element.append('<nav>' + buttonHtml + '</nav>');
				}
			}

			//------------------------------------------------------------------------------
			//    Autophade
			//------------------------------------------------------------------------------
			if (autoPhader === true) {
				autoPhaderTimer = setInterval(function () {
					autoPhade()
				}, parseInt(waitTime, 10));
			}

			//------------------------------------------------------------------------------
			//    Next, previous and button click events
			//------------------------------------------------------------------------------

			$(nextClass).on('click', nextButtonHandler);
			$(prevClass).on('click', prevButtonHandler);
			$(buttonClass).on('click', otherButtonHandler)

		}


		function nextButtonHandler(e) {
			e.preventDefault();
			gotoNextSlide();
		}


		function prevButtonHandler(e) {
			e.preventDefault();
			gotoPrevSlide();
		}

		function otherButtonHandler(e) {
			e.preventDefault();
			var target = e.target;
			var slide_num = $(target).attr('data-slide');
			goToSpecificSlide(slide_num);
		}

		function gotoNextSlide() {
			if (autoPhader === true) {
				clearInterval(autoPhaderTimer);
			}

			var $slide = getNextSlide();

			console.log('gotoNextSlide: $slide: ', $slide)

			if ($slide === null) {
				goToSlide(0);
			} else {
				goToSlide($slide.prevAll(slide).length);
			}

			//set timer going again
			if (autoPhader === true) {
				autoPhaderTimer = setInterval(function () {
					autoPhade()
				}, parseInt(waitTime, 10));
			}
		}

		function gotoPrevSlide() {
			//interrupt the timer for auto if it's going
			if (autoPhader === true) {
				clearInterval(autoPhaderTimer);
			}

			var $slide = getPrevSlide();

			if ($slide === null) {
				goToSlide($(slide).length - 1);
			} else {
				goToSlide($slide.prevAll(slide).length);
			}

			//set timer going again
			if (autoPhader === true) {
				autoPhaderTimer = setInterval(function () {
					autoPhade()
				}, parseInt(waitTime, 10));
			}
		}

		//------------------------------------------------------------------------------
		//    Go to slide - used for jumping more than one slide at a time
		//------------------------------------------------------------------------------

		function goToSpecificSlide(slideNumber) {
			var $slides = $element.find(slide),
				$target = $slides.eq(slideNumber);

			if (crossfade === true) {
				$slides.finish().fadeOut(parseInt(animationDuration, 10) * 1.5).removeClass('active');
				$target.finish().fadeIn(parseInt(animationDuration, 10)).addClass('active');
			} else {
				var that = this;
				$slides.finish().fadeOut(parseInt(animationDuration, 10), function () {
					$target.finish().fadeIn(parseInt(animationDuration, 10)).addClass('active');
				}).removeClass('active');
			}

			if (accessible === true) {
				$slides.attr('aria-live', 'off');
				$target.attr('aria-live', 'assertive');
			}
		}


		//------------------------------------------------------------------------------
		//    Work out what the current slide is
		//------------------------------------------------------------------------------
		function getCurrentSlide() {
			return $element.find(slide + '.active');
		}

		//------------------------------------------------------------------------------
		//    Work out the next slide in sequence
		//------------------------------------------------------------------------------

		function getNextSlide() {
			var current_slide = getCurrentSlide();

			if (current_slide.length === 0) {
				return null;
			}

			var next_slide = current_slide.nextAll(slide).first();

			if (next_slide.length === 0) {
				return null;
			}

			return next_slide;
		}

		//------------------------------------------------------------------------------
		//    Work out previous slide in sequence
		//------------------------------------------------------------------------------
		function getPrevSlide() {
			var current_slide = getCurrentSlide();

			if (current_slide.length === 0) {
				return null;
			}

			var prev_slide = current_slide.prevAll(slide).first();

			if (prev_slide.length === 0) {
				return null;
			}

			return prev_slide;
		}

		//------------------------------------------------------------------------------
		//    Go to slide - used for only single slide jump
		//------------------------------------------------------------------------------
		function goToSlide(slideNumber) {

			console.log('goToSlide: ', slideNumber);

			var $slides = $element.find(slide),
				$active = $slides.filter(function () {
					return $(this).hasClass('active');
				}),
				$target = $slides.slice(slideNumber, slideNumber + 1);

			if (crossfade === true) {
				$active.finish().fadeOut(parseInt(animationDuration, 10) * 1.5).removeClass('active');
				$target.finish().fadeIn(parseInt(animationDuration, 10)).addClass('active');
			} else {
				var that = this;

				$active.finish().fadeOut(parseInt(animationDuration, 10), function () {
					$target.finish().fadeIn(parseInt(animationDuration, 10)).addClass('active');
				}).removeClass('active');
			}

			if (accessible === true) {
				$active.attr('aria-live', 'off');
				$target.attr('aria-live', 'assertive');
			}
		}

		//------------------------------------------------------------------------------
		//    Let things phade on their own
		//------------------------------------------------------------------------------
		function autoPhade() {
			gotoNextSlide();
		}
	}

	return {
		phader: function(elem, options){
			return new Phader( elem, options );
		}
	}

}());
