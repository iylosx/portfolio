/*******************************************
 *   거제관광문화 메인 스크립트 (정리 버전)
 *   - Swiper 초기화 → 이벤트 연결 → Sync
 *   - AOS는 window.load 이후 가장 마지막에 실행
 *******************************************/

$(document).ready(function(){

    /* --------------------------------------
        1) 비주얼 슬라이드
    --------------------------------------- */
    let visual_time = 8000;

    const visual_swiper = new Swiper('.visual .swiper', {
        autoplay: {
            delay: visual_time,
            disableOnInteraction: true,
        },
        loop: true
    });

    function paging_bar_ani() {
        const bar = $('.visual .ctrl_btn .paging_bar span');
        bar.stop();
        bar.width(0);
        bar.animate({ width: '100%' }, visual_time);
    }

    // 최초 1회
    paging_bar_ani();

    // 슬라이드 변경 시
    visual_swiper.on('slideChange', function () {
        paging_bar_ani();
        $('.visual .ctrl_btn .play').hide();
        $('.visual .ctrl_btn .stop').show();
    });

    // 재생/정지 버튼
    $('.visual .ctrl_btn .stop').on('click', function(){
        visual_swiper.autoplay.stop();
        $(this).hide();
        $('.visual .ctrl_btn .play').show();
        $('.visual .ctrl_btn .paging_bar span').stop();
    });

    $('.visual .ctrl_btn .play').on('click', function(){
        visual_swiper.autoplay.start();
        $(this).hide();
        $('.visual .ctrl_btn .stop').show();
        paging_bar_ani();
    });



    /* --------------------------------------
        2) 스팟 리스트 슬라이드
    --------------------------------------- */

    let window_w = $(window).width();
    let isCenter = window_w < 1451 ? true : false;

    const spot_swiper = new Swiper('.spot .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        centeredSlides: isCenter,
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                spaceBetween: 24,
                centeredSlides: isCenter,
            },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        loop: true,
    });

    // 지도 버튼 ↔ 슬라이드 싱크
    function syncMapToSlide() {
        let real = spot_swiper.realIndex;

        let originalSlides = $('.spot .swiper-slide[data-name]')
            .filter(function () {
                return !$(this).hasClass('swiper-slide-duplicate');
            });

        let name = originalSlides.eq(real).data('name');

        $('.spot .spot_map .txt button').removeClass('active');
        $('.spot .spot_map .txt button[data-name="' + name + '"]').addClass('active');
    }

    // 슬라이드 변경될 때
    spot_swiper.on('slideChange', syncMapToSlide);

    // 지도 버튼 클릭 시 해당 슬라이드로 이동
    $('.spot .spot_map .txt button').on('click', function(){
        let name = $(this).data('name');

        let originalSlides = $('.spot .swiper-slide[data-name]')
            .filter(function () {
                return !$(this).hasClass('swiper-slide-duplicate');
            });

        let targetIndex = originalSlides.index(
            originalSlides.filter('[data-name="' + name + '"]')
        );

        spot_swiper.slideToLoop(targetIndex);
    });

    // 초기 1회 싱크 (Swiper가 완전히 준비된 후)
    setTimeout(syncMapToSlide, 150);



    /* --------------------------------------
        3) 푸터 배너 슬라이드
    --------------------------------------- */
    const footer_swiper = new Swiper('footer .banner_list .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
        },
        navigation: {
            nextEl: 'footer .banner .ctrl_btn .next',
            prevEl: 'footer .banner .ctrl_btn .prev',
        },
        loop: true
    });

}); // document ready end



/*******************************************
 *   4) AOS 초기화
 *   - window.load 이후 (모든 이미지/Swiper 준비된 후)
 *   - 초기 로딩 시 요소가 사라지는 문제 완전 해결
 *******************************************/
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
});
