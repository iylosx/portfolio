$(document).ready(function(){
 let mobile_size = 1024
    let window_w
    let device_status 

    function device_chk (){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status ='pc'
        }else{
            device_status ='mo'
        }
    }
    $(window).resize(function(){
        device_chk()
    })


    device_chk()

    
    const main_ctn_swiper = new Swiper('.main_content .popup .swiper', { /* 팝업을 감싼는 요소의 class명 */

	autoplay: {  /* 팝업 자동 실행 */
		delay: 2500,
		disableOnInteraction: true,
	},

	loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

	pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
		el: '.main_content .popup .swiper .ctrl_btn .paging', /* 해당 요소의 class명 */
		type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
		renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
		    return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
	},

	navigation: {  /* 이전, 다음 버튼 */
		nextEl: '.main_content .popup .swiper .ctrl_btn .next',  /* 다음 버튼의 클래스명 */
		prevEl: '.main_content .popup .swiper .ctrl_btn .prev',  
	},

    

});
    $('.main_content .popup .swiper .ctrl_btn .stop').on('click', function(){
        main_ctn_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.main_content .popup .swiper .ctrl_btn .play').show()
    })
    $('.main_content .popup .swiper .ctrl_btn .play').on('click', function(){
        main_ctn_swiper.autoplay.start();  /* 일시정지 기능 */
        $(this).hide()
        $('.main_content .popup .swiper .ctrl_btn .stop').show()
    })
    main_ctn_swiper.on('slideChange', function () {
        $('.main_content .popup .swiper .ctrl_btn .play').hide();
        $('.main_content .popup .swiper .ctrl_btn .stop').show();
    });


})//end js