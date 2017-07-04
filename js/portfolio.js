// (function($) {
//     "use strict";

//     var $navbar = $("#navbar"),
//         y_pos = $navbar.offset().top,
//         height = $navbar.height();

//     $(document).scroll(function() {
//         var scrollTop = $(this).scrollTop();

//         if (scrollTop > y_pos + height) {
//             $navbar.addClass("navbar-fixed").animate({
//                 top: 0
//             });
//         } else if (scrollTop <= y_pos) {
//             $navbar.removeClass("navbar-fixed").clearQueue().animate({
//                 top: "-48px"
//             }, 0);
//         }
//     });

// })(jQuery, undefined);

$(document).ready(function () {
    $("#top").click(function () {
        $('html, body').animate({
            scrollTop: $("#homepg").offset().top
        }, 2000);
    });
});
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};
window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff;letter-spacing: .15em; overflow: hidden; font-size: 45px; color: white};";
    document.body.appendChild(css);

    var username = prompt("What is your name");
    if (username.length != 0) {
        document.getElementById("username").innerHTML = "Hello " + username.toUpperCase() + ", How are you today?"
    }
};
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    p = checkTime(s);
    if (h == 12) { p = p + 'pm'}
    else if (h>12) {
        h = h-12;
        p = p + "pm";
    }
    else if (h<12) {
        p = p + 'am'
    }
    var time = h + ":" + m + ":" + p;
    var t = setTimeout(startTime, 500);
    document.getElementById('date').innerHTML = time
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

window.onload = startTime();
// $(document).ready(function () {
//     $(document).on("scroll", onScroll);

//     //smoothscroll
//     $('a[href^="#"]').on('click', function (e) {
//         e.preventDefault();
//         $(document).off("scroll");

//         $('a').each(function () {
//             $(this).removeClass('active');
//         })
//         $(this).addClass('active');

//         var target = this.hash,
//             menu = target;
//         $target = $(target);
//         $('html, body').stop().animate({
//             'scrollTop': $target.offset().top+2
//         }, 500, 'swing', function () {
//             window.location.hash = target;
//             $(document).on("scroll", onScroll);
//         });
//     });
// });

// function onScroll(event){
//     var scrollPos = $(document).scrollTop();
//     $('#menu-center a').each(function () {
//         var currLink = $(this);
//         var refElement = $(currLink.attr("href"));
//         if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
//             $('#menu-center ul li a').removeClass("active");
//             currLink.addClass("active");
//         }
//         else{
//             currLink.removeClass("active");
//         }
//     });
// }