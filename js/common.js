$(function () {
	// sliders
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
		responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 3,
				margin: 10,
			},
			1200: {
				items: 4
			}
		}
	});
	$('.owl-carousel.main-slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 0,
		dots: true,
		nav: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplaySpeed: 1000,
		navText: ['<span class="icon-caret-left"></span>', '<span class="icon-caret-right"></span>'],
	});
	$('.owl-carousel.card-slider').owlCarousel({
		items: 1,
		loop: false,
		margin: 20,
		dots: true,
		nav: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplaySpeed: 1000,
		center: true,
		navText: ['<span class="icon-caret-left"></span>', '<span class="icon-caret-right"></span>'],
	});

	// phone mask
	$.mask.definitions['9'] = '';
	$.mask.definitions['n'] = '[0-9]';
	$(".phone").mask("+998(nn)nnn-nn-nn");

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
				if (mainMenuHeight > subMenuHeight) {
					subMenu.css('height', mainMenuHeight);
				} else {
					mainMenu.css('height', subMenuHeight);
				}
			},
			function () {
				mainMenu.css('height', 'auto');
			}
		);
	};
	if ($(window).width() > 767) {
		$(window).on('load', mainMenu);
		$(document).ready(mainMenu);
	}


	// burger and catalog menu
	var burger;
	var mobileContent = $('.header-catalog-menu-block');
	if ($(window).width() < 767) {
		burger = $('#burgerBtn');
		$(document).on('click', function (e) {
			var target = e.target;
			if (!target.closest('.burger') && !$(target).closest(".header-catalog-menu-block").length) {
				burger.prop('checked', false);
				mobileContent.removeClass('show');
			}
		});
	} else {
		burger = $('#header-catalog-checkbox');
		$(document).on('click', function (e) {
			var target = e.target;
			if (!target.closest('.header-catalog') && !$(target).closest(".header-catalog-menu-block").length) {
				burger.prop('checked', false);
				mobileContent.removeClass('show');
			}
		});
	}

	burger.on('change', function () {
		mobileContent.toggleClass('show');
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

	// back to top
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


	// counter input
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


	// change active sorting
	$('.goods-items-sorting').on('click', function (e) {
		var target = e.target;
		if (target.tagName === "A") {
			var targetContent = target.innerHTML;
			$(this).find('.goods-items-sorting-active').html(targetContent);
		}
	});

	// range slider
	function rangeSlider() {
		var minAver = $("input[name='price_range']").attr("min");
		var maxAver = $("input[name='price_range']").attr("max");
		var valAver = $("input[name='price_range']").val();
		var step = 2;
		$(".js-range-slider").ionRangeSlider({
			type: "double",
			skin: "big",
			hide_min_max: true,
			hide_from_to: true,
			force_edges: true, // force UI in the box
			hide_min_max: true, // show/hide MIN and MAX labels
			hide_from_to: true, // show/hide FROM and TO labels
			block: false,
			min: minAver,
			step: step,
			max: maxAver,
			from: valAver,
			to: maxAver,
			grid: false,
			onStart: function (data) {
				// Called every time handle position is changed
				$("input[name='price_min']").val(data.from);
				$("input[name='price_max']").val(data.to);
			},
			onChange: function (data) {
				// Called every time handle position is changed
				$("input[name='price_min']").val(data.from);
				$("input[name='price_max']").val(data.to);
			},
		});
		var rangeSlider = $(".js-range-slider").data("ionRangeSlider");
		$("input[name='price_min']").on('input', function () {
			var thisVal = $(this).val();
			rangeSlider.update({
				from: thisVal,
			});
		});
		$("input[name='price_max']").on('input', function () {
			var thisVal = $(this).val();
			rangeSlider.update({
				to: thisVal,
			});
		});
	}
	rangeSlider();

	// change view mode
	$('.view-change').on('change', function () {
		var newsItem = $('.news-page .news-item');
		newsItem.each(function () {
			$(this).toggleClass('inline');
		})
	})


	// show/hide password
	$('.icon-pswd')
		.mouseup(function (e) {
			e.preventDefault();
			var input = $(this).prev();
			input.attr('type', 'password');
		})
		.mousedown(function (e) {
			e.preventDefault();
			var input = $(this).prev();
			input.attr('type', 'text');
		});

	// add/remove children, animal
	function removeField() {
		$('.profile-edit-form-remove').on('click', function (e) {
			e.preventDefault();
			var parent = $(this).parent();
			parent.remove();
		});
	};
	removeField();


	$('.profile-edit-form-add').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parent();
		var children = parent.find('p').eq(0).clone();
		children.removeClass('d-none');
		parent.find('.profile-edit-form-add').before(children);
		removeField();
	})

	// date time picker
	$('#datetimepicker1').datetimepicker({
		format: 'L',
		locale: 'ru',
		icons: {
			up: "icon-caret-up",
			down: "icon-caret-down",
			previous: "icon-caret-left",
			next: "icon-caret-right"
		},
	});
	$('#datetimepicker2').datetimepicker({
		format: 'L',
		locale: 'ru',
		useCurrent: false,
		icons: {
			up: "icon-caret-up",
			down: "icon-caret-down",
			previous: "icon-caret-left",
			next: "icon-caret-right"
		},
	});

	$("#datetimepicker1").on("change.datetimepicker", function (e) {
		$('#datetimepicker2').datetimepicker('minDate', e.date);
	});
	$("#datetimepicker2").on("change.datetimepicker", function (e) {
		$('#datetimepicker1').datetimepicker('maxDate', e.date);
	});

	// map
	var mapBlock = document.querySelector('#map');
	if (mapBlock) {

		ymaps.ready(init);

		function init() {
			var myMap;
			myMap = new ymaps.Map(mapBlock, {
					center: [41.311151, 69.279737],
					zoom: 12
				}, {
					searchControlProvider: 'yandex#search'
				}),

				// Создаём макет содержимого.
				MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
				),

				myPlacemark1 = new ymaps.Placemark([41.291355, 69.223804], {
					hintContent: '"Makro" Navza',
					balloonContent: 'г. Ташкент, Чиланзарский р-н, метро Новза',
				}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: 'img/icons/pin.png',
					// Размеры метки.
					iconImageSize: [32, 40],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-20, -40],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [50, 50],
					// Макет содержимого.
					iconContentLayout: MyIconContentLayout
				});
			myPlacemark2 = new ymaps.Placemark([41.291984, 69.210975], {
				hintContent: '"Makro" parus',
				balloonContent: 'г. Ташкент, Чиланзарский р-н, Катартал, ТЦ "Парус"',
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#imageWithContent',
				// Своё изображение иконки метки.
				iconImageHref: 'img/icons/pin.png',
				// Размеры метки.
				iconImageSize: [32, 40],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-20, -40],
				// Смещение слоя с содержимым относительно слоя с картинкой.
				iconContentOffset: [50, 50],
				// Макет содержимого.
				iconContentLayout: MyIconContentLayout
			});
			myPlacemark3 = new ymaps.Placemark([41.334395, 69.216259], {
				hintContent: '"Makro" тинчлик',
				balloonContent: 'г. Ташкент, Олмазарский р-н, метро Тинчлик',
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#imageWithContent',
				// Своё изображение иконки метки.
				iconImageHref: 'img/icons/pin.png',
				// Размеры метки.
				iconImageSize: [32, 40],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-20, -40],
				// Смещение слоя с содержимым относительно слоя с картинкой.
				iconContentOffset: [50, 50],
				// Макет содержимого.
				iconContentLayout: MyIconContentLayout
			});
			myPlacemark4 = new ymaps.Placemark([41.363634, 69.204377], {
				hintContent: '"Makro" Фергана',
				balloonContent: 'г. Ташкент, Олмазарский р-н, Каракамыш',
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#imageWithContent',
				// Своё изображение иконки метки.
				iconImageHref: 'img/icons/pin.png',
				// Размеры метки.
				iconImageSize: [32, 40],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-20, -40],
				// Смещение слоя с содержимым относительно слоя с картинкой.
				iconContentOffset: [50, 50],
				// Макет содержимого.
				iconContentLayout: MyIconContentLayout
			});

			myMap.geoObjects
				.add(myPlacemark1)
				.add(myPlacemark2)
				.add(myPlacemark3)
				.add(myPlacemark4);
			myMap.behaviors.disable('scrollZoom');

			$('.filials-block').on('click', function () {
				$('.filials-block').each(function () {
					$(this).removeClass('active');
				})
				$(this).addClass('active');
				if ($(this).hasClass('active')) {
					var mapLocation = $(this).attr('data-location').split(',');
					var address = $(this).attr('data-address');
					myMap.destroy();
					var lon = parseFloat(mapLocation[1]);
					myMap = new ymaps.Map(mapBlock, {
							center: [mapLocation[0], lon],
							zoom: 18
						}, {
							searchControlProvider: 'yandex#search'
						}),

						// Создаём макет содержимого.
						MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
							'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
						),

						myPlacemark1 = new ymaps.Placemark([mapLocation[0], mapLocation[1]], {
							hintContent: 'Makro',
							balloonContent: address,
						}, {
							// Опции.
							// Необходимо указать данный тип макета.
							iconLayout: 'default#imageWithContent',
							// Своё изображение иконки метки.
							iconImageHref: 'img/icons/pin.png',
							// Размеры метки.
							iconImageSize: [32, 40],
							// Смещение левого верхнего угла иконки относительно
							// её "ножки" (точки привязки).
							iconImageOffset: [-20, -40],
							// Смещение слоя с содержимым относительно слоя с картинкой.
							iconContentOffset: [50, 50],
							// Макет содержимого.
							iconContentLayout: MyIconContentLayout
						});

					myMap.geoObjects
						.add(myPlacemark1);
					myMap.behaviors.disable('scrollZoom');
				}
			});
		};
	}

});