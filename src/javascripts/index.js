'use strict';

var $ = require('jquery');

function stickyLogo(initPosition){
	var windowTop = $(window).scrollTop();

    if (windowTop > initPosition) {
    	$('img.logo').fadeOut(300, function(){
    		$('.logo-container').addClass('stick');
    		$('img.navbar-logo').fadeIn(300);
    	});
    } else {
    	$('img.navbar-logo').fadeOut(300, function(){
    		$('.logo-container').removeClass('stick');
    		$('img.logo').fadeIn(300);	
    	});
    }
}

function mobileMenu(){
	$('.navbar-burger, #menu-modal a').click(function(){
		$('.navbar-burger').toggleClass('is-active');
		$('#menu-modal').toggleClass('opened');
		$('html').toggleClass('modal-opened');
	});
}

$(function () {
	var initialPosition = $('.logo-container').offset().top - 96;
    
    $(window).scroll(function() {
    	stickyLogo(initialPosition);
   	});

    stickyLogo(initialPosition);
    mobileMenu();
});