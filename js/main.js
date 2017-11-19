window.curSlide = void 0;
window.clickC = 0
window.featureImage = false;
var initString = $( '.headlineContainer' ).html();

$('body').scrollspy({ target: '#mainNav' })

$(window).load(function() {
    $('.sliderElement').flexslider({
        animation: "fade",
        controlNav: true,
        animationLoop: false,
        slideshow: false,
        slideshowSpeed: 0,
        animationSpeed: 0,
        drag: true,
        before: function() {},
        after: function(slider) {
            window.curSlide = slider.currentSlide;
        },
    });
});

$('body').click(function(event) {
    setTimeout( function(){
        if ( $('body').hasClass('featureImageOpen') ) {

            $( '.featureImageContainer' ).fadeOut(500, function() {
                $( '.featureImageContainer' ).addClass('disabled');
                $( 'body' ).removeClass('featureImageOpen');
                $( '.headlineContainer' ).fadeOut(500, function() {
                    $( '.headlineContainer' ).html( initString );
                }).fadeIn(500);
            });

            window.featureImage = false;
        }
    }, 100);
    
});

$( '.featureImageContainer' ).addClass("disabled");

$(".featurePoint").mouseenter(function( event ) {
    var featureImageURL = 'img/homePage/Slider/featurePoints/' + event.target.id + '.jpg';
    preload(featureImageURL);
});

$(".featurePoint").click(function(event) {
    
    var featureImageURL = 'img/homePage/Slider/featurePoints/' + event.target.id + '.jpg';
    var htmlString = $( this ).html();
    
//    if (window.featureImage == false) {
        
        $('.featureImageContainer').fadeIn(500, function() {
            $( 'div.featureImageContainer.disabled' ).removeClass('disabled');
            $( '.imageTarget' ).attr('src', featureImageURL );
        });

        $( '.headlineContainer' ).fadeOut(500, function() {
            $( '.headlineContainer' ).html( htmlString );
        }).fadeIn(500).after(function() {
            setTimeout(function() {
                window.featureImage = true;
                $( 'body' ).addClass('featureImageOpen');
            }, 300);
            
        });
        
//    }
});

$(function() {
    var pressed, pressX, pressY,
        dragged,
        offset = 10; // helps detect when the user really meant to drag

    $(document)
        .on('mousedown', '.sliderElement', function(e) {
            pressX = e.pageX;
            pressY = e.pageY;
            pressed = true;
        })
        .on('mousemove', '.sliderElement', function(e) {
            if (!pressed) return;
            dragged = Math.abs(e.pageX - pressX) > offset;

            if ((e.pageX - pressX) > offset) {
                $('.flexslider').flexslider('next');
            } else if ((e.pageX - pressX) < (0 - offset)) {
                $('.flexslider').flexslider('prev');
            }

            pressX = e.pageX;

        }).delay(200)
        .on('mouseup', function() {
            pressed = dragged = false;
        });
});


$(document).ready(function () {
    var sliderParallax = document.getElementsByClassName("sliderElement")[0];
    var bgParallax = document.getElementsByClassName("backgroundImage")[0];
    
    sliderParallax.homePos = { x: sliderParallax.offsetLeft, y: sliderParallax.offsetTop };
    bgParallax.homePos = { x: bgParallax.offsetLeft, y: bgParallax.offsetTop };
    
    $('.homeSlider').mousemove(function (e) {
        parallax(e, sliderParallax, 100);
        parallax(e, bgParallax, 20);
    });
});


function parallax(e, target, layer) {
    var x = target.homePos.x - (e.pageX - target.homePos.x) / layer;
    var y = target.homePos.y - (e.pageY - target.homePos.y) / layer;
    $(target).css({ top: y+10 ,left : x });
};