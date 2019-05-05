'use strict';

var $ = require('jquery');

function stickyLogo(initPosition){
	var windowTop = $(window).scrollTop();

    if (windowTop > initPosition) {
    	$('.logo-container').addClass('stick');
    } else {
    	$('.logo-container').removeClass('stick');
    }
}

$(function () {
	var initialPosition = $('.logo-container').offset().top - 96;
    
    $(window).scroll(function() {
    	stickyLogo(initialPosition);
   	});

    stickyLogo(initialPosition);
});