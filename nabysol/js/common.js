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
    

    $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li').on('mouseenter', function(){
        if(device_status =='pc'){
            $('header').addClass('menu_pc')
            $(this).addClass('over')
        }
    })

    $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status =='pc'){
            $(this).addClass('over');
            $('header').addClass('menu_pc');
        
    
            let hasDepth2 = $(this).children('ul.depth2').length > 0;
        
            if (hasDepth2) {
                $('header').addClass('bg_on');
            } else {
                $('header').removeClass('bg_on');
            }
        }
    });
    
    $('ul.depth1 > li').find('> a').on('focusin', function () {
        if(device_status == 'pc'){
            $('ul.depth1 > li').removeClass('over');     // 이전 모든 on 제거
            $(this).parent().addClass('over'); // 현재만 on

            let hasDepth2 = $(this).children('ul.depth2').length > 0;
        
            if (hasDepth2) {
                $('header').addClass('bg_on');
            } else {
                $('header').removeClass('bg_on');
            }
        }
    });

    $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li').on('mouseleave', function(e){
    if(device_status =='pc'){

        // 마우스가 어디로 이동하는지 확인
        let to = e.relatedTarget;

        // 만약 이동한 곳이 현재 li(혹은 그 안의 자식)이라면 닫지 말기
        if ($(to).closest(this).length > 0) {
            return; 
        }

        $(this).removeClass('over')
        
        // 만약 다른 li는 여전히 over면 header는 유지
        if ($('header .gnb .gnb_wrap .gnb_list ul.depth1 > li.over').length === 0) {
            $('header').removeClass('menu_pc')
            $('header').removeClass('bg_on')
        }
    }
});

     
    $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li:last-child > ul.depth2 > li:last-child').on('focusout', function(){
        if(device_status =='pc'){
            $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li').removeClass('over');
            $('header').removeClass('menu_pc');
            $('header').removeClass('bg_on');
        }
    });

   


    $('header .gnb .gnb_wrap .gnb_list ul.depth1 > li > a').on('click', function(e){
        if(device_status =='mo'){
            e.preventDefault()
            gnb_open = $(this).parent().hasClass('on')
            if(gnb_open == true){ //열려있다면
                $(this).parent().removeClass('on')
                $(this).next().slideUp()
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('on')
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                $(this).parent().addClass('on')
                $(this).next().slideDown()
            }
        }
    })
    
    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
    })



 let scrolling = $(window).scrollTop()// 현재스크롤값


        function scroll_chk(){
            scrolling = $(window).scrollTop()

            if(scrolling > 0){
                $('header').addClass('fixed')
            }else{
                $('header').removeClass('fixed')
            }
        }

        scroll_chk()  //문서로딩 후 1번
        $(window).scroll(function(){
            scroll_chk()  // 스크롤할때마다
            console.log(scrolling)
        })

        $('aside .top button').on('click', function(){
             $('html, body').animate({
            scrollTop:0
            },500)
        })


        $('footer .family .site .site_open').on('click', function(){
            if($(this).hasClass('open')){
                $(this).removeClass('open')
                $('footer .family .site .stie_wrap').slideUp()
            }else{
                $(this).addClass('open')
                $('footer .family .site .stie_wrap').slideDown()
            }
        })
        
        $('footer .family .f_top button').on('click', function(){
            $('html, body').animate({
           scrollTop:0
           },500)
       })

})//끝!!