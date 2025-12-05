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

    device_chk()

    $(window).resize(function(){
        device_chk()
    })

    
    $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status =='pc'){
            $('header').addClass('menu_pc')
            $(this).addClass('over')
        }
        
    })
    $('ul.depth1 > li').find('> a').on('focusin', function () {
        if(device_status == 'pc'){
            $('ul.depth1 > li').removeClass('over');     // 이전 모든 on 제거
            $(this).parent().addClass('over'); // 현재만 on
        }
    });
    $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li').on('mouseleave', function(){
        if(device_status =='pc'){
            $(this).removeClass('over')
            $('header').removeClass('menu_pc')
        }
    })
    $('header .util .lang button').on('focusin', function () {
        if(device_status == 'pc'){
            $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li').removeClass('over')
            $('header').removeClass('menu_pc')
        }
    });

    let scrolling = $(window).scrollTop(); // 현재 스크롤값
    let prev_scroll = scrolling;
    let diff_scroll = 0;
    
    function scroll_chk(){
        prev_scroll = scrolling  // 마지막으로 스크롤 한 값
        scrolling = $(window).scrollTop() // 현재 스크롤 값
        diff_scroll = prev_scroll - scrolling
    
        // 사파리 바운스 보호용: 음수거나 너무 작은 변화는 무시
        let ignore_range = 5; // 5px 이하의 값은 무시
    
        if (Math.abs(diff_scroll) < ignore_range) {
            return // 헤더 up/down 처리 스킵
        }
        
       
        // // 아래로 스크롤 중
        // if(diff_scroll < 0){
        //     $('header').addClass('up')
        //     return;
        // }
        // //  위로 스크롤 중
        // else{
        //     $('header').removeClass('up')
        // }
        
        
            if(scrolling > 0){
                $('header').addClass('fixed')
            }else{
                $('header').removeClass('fixed')
            }

       

        }
        
        function quick_chk(){
            let s = $(window).scrollTop();
        
            if(s > 100){
                $('aside.top button').addClass('show');
                $('aside.chat button').addClass('show');
            }else{
                $('aside.top button').removeClass('show');
                $('aside.chat button').removeClass('show');
            }
        }
        
        $(window).on('load scroll', quick_chk);
        
        scroll_chk()  //문서로딩 후 1번
        $(window).on('load scroll', function(){
            scroll_chk()  // 스크롤하고 로드될때마다
        })

        //모바일메뉴!!!!
        $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(){
            if(device_status == 'mo'){
                // e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
                gnb_open = $(this).parent().hasClass('on')
                gnb_active = $(this).parent().find('.active').length
                //console.log(gnb_open)
                if((gnb_open == true) || (gnb_active > 0)){ //열려있다면
                    $(this).parent().removeClass('on')
                    $(this).next().slideUp()
                }else{
                    $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('on')
                    $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                    $(this).parent().addClass('on')
                    $(this).next().slideDown()
                }
            }
        });
        

        ///header .gnb .gnb_wrap .gnb_close
        //header .gnb .gnb_open
        $('header .gnb .gnb_open').on('click', function(){
            $('header').addClass('menu_mo')
        })
        $('header .gnb .gnb_wrap .gnb_close').on('click', function(){
            $('header').removeClass('menu_mo')
        })

        //탑버튼

    $('aside.top').on('click', function(){
       $('html, body').animate({
                scrollTop: 0
            }, 500)
    })


    $('footer .footer_wrap .family button').on('click', function(){
        if($('footer .footer_wrap .family .family_wrap').hasClass('open')){
            $('footer .footer_wrap .family .family_wrap').removeClass('open')
            $('footer .footer_wrap .family').removeClass('open')
            $('footer .footer_wrap .family .family_wrap').slideUp()
        }else{
            $('footer .footer_wrap .family .family_wrap').addClass('open')
            $('footer .footer_wrap .family').addClass('open')
            $('footer .footer_wrap .family .family_wrap').slideDown()
        }
    })

    $('header .util .lang button.sel').on('click', function(){
        if($('header .util .lang').hasClass('open')){
            $('header .util .lang').removeClass('open')
            $('header .util .lang .lang_wrap').slideUp()
        }else{
        $('header .util .lang').addClass('open')
        $('header .util .lang .lang_wrap').slideDown()
    }
    })
})