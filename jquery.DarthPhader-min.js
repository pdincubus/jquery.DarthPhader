/**
* DarthPhader plugin
* I find your lack of configuration options disturbing
* @author Phil Steer
* https://github.com/pdincubus/jquery.DarthPhader
*/(function(b){b.A.v=function(k){var a=b.extend({animationDuration:2E3,slideEasing:"swing",includeNav:!0,navId:"phaderNav",navIncludeNumSlides:!0,navNextId:"phadeNext",navPrevId:"phadePrev",navNumClass:"phadeNum",autoPhader:!1,waitTime:5E3,opacity:0,loopButtons:!1},k);return this.w(function(){function h(){d===e?(d=1,!1===a.d&&b("#"+a.e).h("disabled"),1==a.opacity?(b(c).a(0).c({opacity:1},10),b(c).p(":first").c({opacity:0},parseInt(a.b,10),a.f)):(b(c).a(0).show(),b(c).p(":first").k(parseInt(a.b,10))),
!0===a.l&&!0===a.o&&b("#"+a.i+" ."+a.j).text("1 of "+e)):(!0===a.o&&!1===a.d&&b("#"+a.g+", #"+a.e).q("disabled"),1==a.opacity?(b(c).a(d-1).c({opacity:0},parseInt(a.b,10),a.f),b(c).a(d).c({opacity:1},parseInt(a.b,10),a.f)):(b(c).a(d-1).k(parseInt(a.b,10)),b(c).a(d).n(parseInt(a.b,10))),d++,!0===a.l&&!0===a.o&&b("#"+a.i+" ."+a.j).text(d+" of "+e),d===e&&!1===a.d&&b("#"+a.g).h("disabled"))}var c="#"+b(this).u("id")+" > li",e=b(c).size(),d=1;1==a.opacity?(b(c).c({opacity:0},10),b(c).a(0).c({opacity:1},
10)):(b(c).B(),b(c).a(0).show());if(!0===a.m)var g=setInterval(h,parseInt(a.r,10));if(!0===a.o){if(!b("#"+a.e).length){var f='<span id="'+a.e+'">&lt;</span>';!0===a.l&&(f=f+'<span class="'+a.j+'">1 of '+e+"</span>");f=f+'<span id="'+a.g+'">&gt;</span>';b("#"+a.i).append(f);!1===a.d&&b("#"+a.e).h("disabled");b("#"+a.e).t("click",function(){!0===a.m&&clearInterval(g);if(!0!==b(c).s(":animated")){if(1===d)if(!0===a.d)d=e,1==a.opacity?(b(c).c({opacity:0},parseInt(a.b,10),a.f),b(c).a(d).c({opacity:1},
10)):(b(c).a(d-1).n(parseInt(a.b,10)),b(c).a(d-1).C().k(parseInt(a.b,10))),b("#"+a.i+" ."+a.j).text("1 of "+e);else{b("#"+a.e).h("disabled");return}else!1===a.d&&b("#"+a.g+", #"+a.e).q("disabled"),1==a.opacity?(b(c).a(d-2).c({opacity:1},parseInt(a.b,10),a.f),b(c).a(d-1).c({opacity:0},parseInt(a.b,10),a.f)):(b(c).a(d-2).n(parseInt(a.b,10)),b(c).a(d-1).k(parseInt(a.b,10))),d--,!0===a.l&&b("#"+a.i+" ."+a.j).text(d+" of "+e),1===d&&!1===a.d&&b("#"+a.e).h("disabled");!0===a.m&&(g=setInterval(h,parseInt(a.r,
10)))}})}b("#"+a.g).t("click",function(){!0===a.m&&clearInterval(g);if(!0!==b(c).s(":animated")){if(d===e){if(!0===a.d)d=1,1==a.opacity?(b(c).a(0).c({opacity:1},10),b(c).p(":first").c({opacity:0},parseInt(a.b,10),a.f)):(b(c).a(0).show(),b(c).p(":first").k(parseInt(a.b,10)));else{b("#"+a.g).h("disabled");return}!0===a.l&&b("#"+a.i+" ."+a.j).text("1 of "+e)}else!0===a.d&&b("#"+a.g+", #"+a.e).q("disabled"),1==a.opacity?(b(c).a(d-1).c({opacity:0},parseInt(a.b,10),a.f),b(c).a(d).c({opacity:1},parseInt(a.b,
10),a.f)):(b(c).a(d-1).k(parseInt(a.b,10)),b(c).a(d).n(parseInt(a.b,10))),d++,!0===a.l&&b("#"+a.i+" ."+a.j).text(d+" of "+e),d===e&&!1===a.d&&b("#"+a.g).h("disabled");!0===a.m&&(g=setInterval(h,parseInt(a.r,10)))}})}})}})(jQuery);

