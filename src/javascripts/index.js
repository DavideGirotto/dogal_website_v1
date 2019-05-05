'use strict';

var $ = require('jquery');

$(function () {
	var initialPosition = $('.logo-container').offset().top - 96;
    
    $(window).scroll(function() {
    	var windowTop = $(window).scrollTop();
    	console.log(windowTop);
    	console.log(initialPosition);

    	if (windowTop > initialPosition) {
    		$('.logo-container').addClass('stick');
    	} else {
    		$('.logo-container').removeClass('stick');
    	}
   	});

    // stickyLogo();
});