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
        // console.log(device_status)
    }
    $(window).resize(function(){
        device_chk()
    })


    device_chk()


    /*헤더탑 팝업*/
    const header_top_swiper = new Swiper('header .header_top .header_pop .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5500,
            disableOnInteraction: true,
        },
    
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    
       
    });  

 let scrolling = $(window).scrollTop()// 현재스크롤값


        function scroll_chk(){
            scrolling = $(window).scrollTop()
            // console.log(diff_scroll)/


            if(scrolling > 0){
                $('header .header_menu').addClass('fixed')
            }else{
                $('header .header_menu').removeClass('fixed')
            }
        }

        scroll_chk()  //문서로딩 후 1번
        $(window).scroll(function(){
            scroll_chk()  // 스크롤할때마다
            
        })
        
        /****메뉴 오버******/



    /*팝업 여닫기*/
    if(device_status == 'mo'){
        $('header .header_top .header_pop .close button').on('click', function(){
            $('header .header_top .header_pop').slideUp()
        })
        }else{
    $('header .header_top .header_pop .close button').on('click', function(){
        $('header .header_top').slideUp()
        $('header .header_menu .util .popup button').fadeIn()
    }) 
    $('header .header_menu .util .popup button').on('click', function(){
        $('header .header_top').slideDown()
        $('header .header_menu .util .popup button').fadeOut()
    })
    }

    //퀵메뉴

    $('aside .quick_open').on('click', function(){
        $(this).hide()
        $('aside .quick_close').show()
        $('aside .quick_wrap').fadeIn("fast")
    })
    $('aside .quick_close').on('click', function(){
        $(this).hide()
        $('aside .quick_open').show()
        $('aside .quick_wrap').fadeOut("fast")
    })

    $('aside .quick_wrap ul li.top').on('click', function(){

        $('html, body').animate({
            scrollTop:0
        },500)

    })

    /*header_menu 1차 메뉴에 마우스를 오버하면 open_pc클래스를 주고 fixed 스타일과 동일한 스타일이 들어감*/

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
        
        $('header .header_menu').addClass('open_pc')
        $(this).addClass('on')
        }
    })
    $('header .header_menu ul.depth1 > li > .depth2_wrap > .wrapper > ul.depth2 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
        $(this).addClass('on')
        }
    })
    $('ul.depth1 > li').find('> a').on('focusin', function () {
        if(device_status == 'pc'){
            $('ul.depth1 > li').removeClass('on');     // 이전 모든 on 제거
            $(this).parent().addClass('on'); // 현재만 on
        }
    });
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        if(device_status == 'pc'){
        $('header .header_menu').removeClass('open_pc')
        $(this).removeClass('on')
        }
     })
     $('header .header_menu ul.depth1 > li > .depth2_wrap > .wrapper > ul.depth2 > li').on('mouseleave', function(){
        if(device_status == 'pc'){
        $(this).removeClass('on')
        }
     })
     $('header .header_menu .util .search button, header .header_menu .util .popup button').on('focusin', function () {
        if (device_status == 'pc') {
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('on');
            $('header .header_menu').removeClass('open_pc');
        }
    });
    


     //모바일 메뉴 ...
     /********************
      * 1. gnb_open을 누르면 gnb_wrap이 오른쪽에서 나옴
      * 2. 1차 li를 클릭하면 li에 open클래스 추가
      * 3. 2차 li를 클릭하면 li에 select 클래스 추가
      * 4. 1차 li 클릭 시 이동하지 않도록 
      * ******************************/


     //메뉴 여닫기!!
     $('header .header_menu .gnb .gnb_open').on('click',function(){
        $('header .header_menu').addClass('open_mo')
     })

     $('header .header_menu .gnb .gnb_wrap .gnb_close').on('click',function(){
        $('header .header_menu').removeClass('open_mo')
     })

     //메뉴 1차 li 여닫기!!
     
    $('header .header_menu .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mo'){   // 모바일일 때만 작동
            e.preventDefault();      // a 태그 링크 이동 막기

                // 다른 li들 열려 있는 것 닫고
                $('header .header_menu .gnb .gnb_wrap ul.depth1 > li').removeClass('open');
                // 현재 것만 열기
                $(this).parent().addClass('open');
        }
    });

//메뉴 2차 li 여닫기!!    

$(document).on('click', 'header .header_menu.open_mo .gnb_wrap ul.depth1 > li.open > .depth2_wrap ul.depth2 > li > a', function(e){
    if(device_status === 'mo'){
        e.preventDefault();

        let parentLi = $(this).parent();       // 선택한 depth2 li
        let isSelect = parentLi.hasClass('select');

        if(isSelect){
            // 이미 열려 있으면 닫기
            parentLi.removeClass('select');
        } else {
            // 열려 있는 select 모두 닫고 현재 li만 열기
            parentLi.siblings().removeClass('select');
            parentLi.addClass('select');
        }
    }
});

    //푸터 사이트 여닫기!!
    $('footer .f_button .list .inner .tour button').on('click', function(){
        if($('footer .f_button  .list .inner .tour').hasClass('open')){
            $('footer .f_button  .list .inner .tour').removeClass('open')
            $('footer .f_button  .list .inner .tour .tour_wrap').slideUp()
        }else{
            $('footer .f_button  .list .inner .tour').addClass('open')
            $('footer .f_button  .list .inner .tour .tour_wrap').slideDown()
        }
    })
    $('footer .f_button .list .inner .city button').on('click', function(){
        if($('footer .f_button  .list .inner .city').hasClass('open')){
            $('footer .f_button  .list .inner .city').removeClass('open')
            $('footer .f_button  .list .inner .city .city_wrap').slideUp()
        }else{
            $('footer .f_button  .list .inner .city').addClass('open')
            $('footer .f_button  .list .inner .city .city_wrap').slideDown()
        }
    })
    $('footer .f_button .list .related button').on('click', function(){
        if($('footer .f_button  .list .related').hasClass('open')){
            $('footer .f_button  .list .related').removeClass('open')
            $('footer .f_button  .list .related .related_wrap').slideUp()
        }else{
            $('footer .f_button  .list .related').addClass('open')
            $('footer .f_button  .list .related .related_wrap').slideDown()
        }
    })


})//js end