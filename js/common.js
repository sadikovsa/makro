$(function () {
	
	$('.owl-carousel.special-slider').owlCarousel({
		items: 4,
		loop: true,
		margin: 20,
		dots: false,
		nav: true,
		autoplay: false,
		smartSpeed: 1000,
		autoplaySpeed: 1000,
		navText: ['<span class="icon-caret-left"></span>', '<span class="icon-caret-right"></span>'],
		
	});
	$('.owl-carousel.main-slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 20,
		dots: true,
		nav: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplaySpeed: 1000,
		navText: ['<span class="icon-caret-left"></span>', '<span class="icon-caret-right"></span>'],
	});

	// phone mask
	$(".phone").mask("+9(999) 999-99-99");
	
	// Main Menu
	function mainMenu() {
		$('#header-catalog-checkbox').change(function () {
			var subMenu = $('.header-catalog-menu-block'),
				offsetTop = subMenu.offset().top,
				subMenuBlock = $('.header-catalog-submenu'),
				subMenuHeight = subMenuBlock.height();

			subMenuBlock.each(function (index, elem) {
				var subMenuBlockParent = elem.parentElement;
				var subMenuHeight = elem.clientHeight;
				var parentOffsetTop = subMenuBlockParent.offsetTop;
				var subMenuOffset = (offsetTop - parentOffsetTop - offsetTop - 1);
				elem.style.top = subMenuOffset + 'px';
			});
		});
		var mainMenu = $('.header-catalog-menu-block');
		var subMenu = $('.header-catalog-submenu');
		var subMenuLink = $('.header-catalog-menu-item');
		subMenuLink.hover(
			function () {
				var mainMenuHeight = $('.header-catalog-menu-block').height();
				var subMenuHeight = $(this).find('.header-catalog-submenu').height();
				if(mainMenuHeight > subMenuHeight) {
					subMenu.css('height', mainMenuHeight);
				}else {
					mainMenu.css('height', subMenuHeight);
				}
			},
			function () {
				mainMenu.css('height', 'auto');
			}
		);
	};

	$(window).on('load', mainMenu);
	$(document).ready(mainMenu);
	
	var burger = $('#header-catalog-checkbox');
	var mobileContent = $('.header-catalog-menu-block');

	burger.on('change', function () {
		mobileContent.toggleClass('show');
	});

	$(document).on('click', function (e) {
		var target = e.target;
		if (!target.closest('.header-catalog') && !$(target).closest(".header-catalog-menu-block").length) {
			burger.prop('checked', false);
			mobileContent.removeClass('show');
		}
	});
	
	
	// Sticky Header
	window.onscroll = function () {
		showBtn()
	};
	var header = document.querySelector(".header");
	var offesetTop = header.offsetTop;
	var btn = $('.back-to-top');
	function showBtn() {
		if (window.pageYOffset > offesetTop) {
			btn.css('display', 'flex');
		} else {
			btn.css('display', 'none');
		}
	}
	
	
	function backToTop() {
		var header = document.querySelector(".header");
		var offesetTop = header.offsetTop;
		var btn = $('.back-to-top');
		var container = $('.container');
		var offset = container.offset();
		var containerWidth = container.width();
		var realOffset = offset.left + containerWidth;
		if (window.pageYOffset > offesetTop) {
			btn.css('display', 'flex');
		} else {
			btn.css('display', 'none');
		}
		btn.css('left', realOffset);
		btn.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, '500');
		});
	}
	$(window).on('resize', backToTop);
	$(document).ready(backToTop);
	
	$('.counter-input').on('input change paste', function () {
		$(this).val(this.value.replace(/[^0-9\-]/, '')); // запрещаем ввод любых символов, кроме цифр и знака минуса
	});

	$('.counter-btn').on('click', function (e) {
		e.preventDefault();
		var input = $(this).closest('.counter-wrap').find('input'); // инпут
		var value = parseInt(input.attr('data-val')) || 0; // получаем value инпута или 0
		var text = input.attr('data-text'); // получаем value инпута или 0
		if ($(this).hasClass('btn-minus')) {
			if (value > 0) {
				value = value - 1; // вычитаем из value 1
			}
		}
		if ($(this).hasClass('btn-plus')) {
			value = value + 1; // прибавляем к value 1
		}
		var total = value + ' ' + text;
		input.attr('data-val', value).change();
		input.val(total).change(); // выводим полученное value в инпут; триггер .change() - на случай, если на изменение этого инпута у вас уже объявлен еще какой-то обработчик
	});

});