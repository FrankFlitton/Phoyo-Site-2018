/* 

Code Inprogress, current itteration is prototype

TODO: 
     1. Transpose to React or Angular (still deciding)
     2. Load Another Stage
     3. Load body overtop of load section
     4. Transition animations
     5. Interaction SFX affordance

*/

// Global Variables

window.curSlide = void 0;
window.clickC = 0;
window.featureImage = false;
window.initString = $('.headlineContainer').html();
    

/* Let's Kick this off! */

$(window).load( 
    initSlider('.sliderElement') 
);

setTimeout( function() {
    initParallax();
    $( dragSlider('.sliderElement') );
}, 0);


// Attach Events to DOM

$(".featurePoint").mouseenter( () => preloadFeatureImage(event) );
$(".featurePoint").click( () => revealFeaturePoint(event) );
$('body').click( () => hideFeature() );



/* Interaction Logic */

// Flexslider parameters
function initSlider(target) {

    // Start Slider
    $(target).flexslider({
        animation: "fade",
        controlNav: true,
        animationLoop: false,
        slideshow: false,
        slideshowSpeed: 0,
        animationSpeed: 0,
        drag: false,
        before: function() {},
        after: function(slider) {
            window.curSlide = slider.currentSlide;
        },
    });

}

// Start Parallax
function initParallax() {
    
    var sliderParallax = document.getElementsByClassName("sliderElement")[0];
    var bgParallax = document.getElementsByClassName("backgroundImage")[0];
    
    _moueStart(sliderParallax);
    _moueStart(bgParallax);
    
    
    // Start Listener
    $('.homeSlider').mousemove(function(e) {
        _parallax(e, sliderParallax, 100);
        _parallax(e, bgParallax, 20);
    });
}

// Parallax Logic
function _parallax(e, target, layer) {
    var x = target.start.x - (e.pageX - target.start.x) / layer;
    var y = target.start.y - (e.pageY - target.start.y) / layer;
    $(target).css({ top: (y + 10) ,left : x });
};

// Retuens starting mouse position
function _moueStart(element) {
    return element.start = { x: element.offsetLeft, y: element.offsetTop };
}

// Preloads featurepoint image on hover
function preloadFeatureImage(event) {
    var targetID = featurePointURL(event);
    
    if ( typeof event === 'object' ) {
        preload( 'img/homePage/Slider/featurePoints/' + targetID + '.jpg' );
    }   
}

// Shows featurepoint image and changes text
function revealFeaturePoint(event) {
    var targetID = featurePointURL(event);
    var featureImageURL = 'img/homePage/Slider/featurePoints/' + targetID + '.jpg';
    var htmlString = $(this).html();

    // Blocking JS for Animation Order

    setTimeout( function() {
    
        // Reveal Feature Point Image
        $('.featureImageContainer').fadeIn(500, function() {
            $('div.featureImageContainer.disabled').removeClass('disabled');
            $('.imageTarget').attr('src', featureImageURL);
        });

        // Change Slider Text
        $('.headlineContainer').fadeOut(500, function() {
            $('.headlineContainer').html(htmlString);
        }).fadeIn(500).after(function() {

            // Wait for state transition
            setTimeout(function() {
                window.featureImage = true;
                $('body').addClass('featureImageOpen');
            }, 300);
        });
    }, 10)
}

// Returns feature point ID or first as fallback 
function featurePointURL(event) {
    return typeof event != 'undefined' ? event.target.id : 'point1'
}

// Closes featurepoint image, resets text
function hideFeature() {
    setTimeout( function(){
        if ( $('body').hasClass('featureImageOpen') ) {

            $('.featureImageContainer').fadeOut(500, function() {
                $('.featureImageContainer').addClass('disabled');
                $('body').removeClass('featureImageOpen');
                $('.headlineContainer').fadeOut(500, function() {
                    $('.headlineContainer').html(window.initString);
                }).fadeIn(500);
            });

            window.featureImage = false;
        } 
    }, 100 ); // Avoid animation timing conflicts
}


// Enables drag function for slider
function dragSlider(target) {
    var pressed, pressX, pressY,
        dragged,
        offset = 10; // helps detect when the user really meant to drag

    $(document)
        .on('mousedown', target, function(e) {
            pressX = e.pageX;
            pressY = e.pageY;
            pressed = true;
        })
        .on('mousemove', target, function(e) {
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
}