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