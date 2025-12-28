$(document).ready(function () {

    let mobile_size = 1024;
    let window_w;
    let device_status;
    let mo_768 = 768;

    function device_chk() {
        window_w = $(window).width();
        if (window_w > mobile_size) {
            device_status = 'pc';
        } else {
            device_status = 'mo';
        }
    }

    device_chk();

    $(window).resize(function () {
        device_chk();
    });

	
    const visual_swiper = new Swiper('.visual .swiper', {
        autoplay: {
            delay: 8000,
            disableOnInteraction: true,
        },
        effect: "fade",
        loop: true,
        pagination: {
            el: '.visual .paging',
            clickable: true,
            renderBullet: function (i, className) {
                return (
                    '<button class="' + className + '">' +
                    '<svg viewBox="0 0 73 73" xmlns="http://www.w3.org/2000/svg">' +
                    '<circle cx="36.5" cy="36.5" r="35.5" class="circle"></circle>' +
                    '</svg></button>'
                );
            }
        },
    });

    let facility_swiper = new Swiper('.facility .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                spaceBetween: 50,
            },
            1025: {
                slidesPerView: 'auto',
                spaceBetween: 170,
            },
        },
        centeredSlides: true,
        loop: true,

        navigation: {
            nextEl: '.facility .ctrl_btn .next',
            prevEl: '.facility .ctrl_btn .prev',
        },
        speed: 1000,

    });
    

    function scroll_chk() {

        function bgChangeBySection() {
            let scroll = $(window).scrollTop();
            let winH = $(window).height();
            let winBottom = scroll + winH;

            let sol = $('.solutions');
            let box = $('.box');

            let solTop = sol.offset().top;
            let solH = sol.outerHeight();
            let boxTop = box.offset().top;
            let boxH = box.outerHeight();

            let solExposed = Math.max(0, winBottom - solTop);
            let boxExposed = Math.max(0, winBottom - boxTop);

            let solRatio = solExposed / solH;
            let boxRatio = boxExposed / boxH;

            if (solRatio >= 0.4 && boxRatio < 0.8) {
                setLightTheme();
            } else if (boxRatio >= 0.8) {
                setDarkTheme();
            } else {
                setDarkTheme();
            }
        }

        function setLightTheme() {
            $('body').addClass('light');
            $('header').addClass('light');
            $('aside.quick').addClass('light');

            $('aside.quick .top button').addClass('change');
            $('header.fixed .gnb .gnb_wrap .gnb_list ul.depth1 > li > a span').addClass('change');
            $('header.fixed .logo').addClass('change');
        }

        function setDarkTheme() {
            $('body').removeClass('light');
            $('header').removeClass('light');
            $('aside.quick').removeClass('light');

            $('aside.quick .top button').removeClass('change');
            $('header.fixed .gnb .gnb_wrap .gnb_list ul.depth1 > li > a span').removeClass('change');
            $('header.fixed .logo').removeClass('change');
        }

        bgChangeBySection();
    }

    scroll_chk();
    $(window).on('scroll resize load', scroll_chk);

	

    scroll_chk();  // 문서 로딩 후 1번
    $(window).scroll(function () {
        scroll_chk(); // 스크롤할 때마다
		
    });

    const solutions_swiper = new Swiper('.solutions .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        breakpoints: {
            1025: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    });

    if (window_w <= 786) {
        solutions_swiper.autoplay.start();
    } else {
        solutions_swiper.autoplay.stop();
    }

    $(window).on('pointermove', function (e) {
        if (!$('.cursor_sol').hasClass('on')) return;
        $('.cursor_sol').css({
            left: e.pageX + 'px',
            top: e.pageY + 'px'
        });
    });

    $('.solutions .solutions_list .swiper-slide').hover(function () {
        $('.cursor_sol').toggleClass('on');
    });

    const medic_swiper = new Swiper('.medic .swiper', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        effect: "fade",
        loop: true,
    });

    $('.cursor_sol, .cursor_box').appendTo('html');

    $(window).on('pointermove', function (e) {
        if (!$('.cursor_box').hasClass('on')) return;
        $('.cursor_box').css({
            left: e.pageX + 'px',
            top: e.pageY + 'px'
        });
    });

    $('.box .review a , .box .treatment a').hover(function () {
        $('.cursor_box').toggleClass('on');
    });


   var handleCookie = {
        setCookie: function (name, val, exp) {
            var date = new Date();
            date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + val + ";expires=" + date.toUTCString() + ";path=/";
        },
        getCookie: function (name) {
            var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
            return value ? value[2] : null;
        }
    };

    $('.layerpopup').each(function () {
        let popName = $(this).data('name');

        if (device_status == 'mo') {
            $('.layerpopup').each(function () {
                if ($(this).hasClass('recent')) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }

        if (handleCookie.getCookie(popName) === 'y') {
            $(this).hide();
        } else {
            $(this).show();
        }
    });

    $('.layerpopup .close').on('click', function () {
        let target = $(this).data('name');
        $('.layerpopup[data-name="' + target + '"]').hide();
    });

    $('.layerpopup .today').on('click', function () {
        let target = $(this).data('name');
        handleCookie.setCookie(target, 'y', 1);
        $('.layerpopup[data-name="' + target + '"]').hide();
    });





    scroll_chk();  // 문서 로딩 후 1번
    $(window).scroll(function () {
        scroll_chk();  // 스크롤할 때마다
    });

    AOS.init({
        offset: 150,
        duration: 500,
        easing: 'ease',
    });



}); // 끝!!!


window.addEventListener('load', function() {

    AOS.init({
        offset: 150,
        duration: 800,
        easing: 'ease',
    });

    // Swiper/레이아웃 후 렌더링 안정화
    setTimeout(() => {
        AOS.refresh();
    }, 200);

    setTimeout(() => {
        facility_swiper.refresh();
    }, 200);
});