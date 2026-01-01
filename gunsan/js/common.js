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


    $('header .header_main .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            if($(this).hasClass('over')){
                $(this).removeClass('over')    
        }else
            $('header').addClass('open_pc')
            $(this).addClass('over')
        }

    })

    $('header .header_main .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        if(device_status == 'pc'){
            $('header').removeClass('open_pc')
            $(this).removeClass('over')
        }

    })

    $('header .header_main .gnb_open').on('click', function(){
        $('header').addClass('open_mo')
    })
    $('header .header_main .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('open_mo')
    })

    $('header .header_main .gnb_wrap ul.depth1 > li').on('click', function(e){
        if(device_status == 'mo'){
        e.preventDefault();
            if($('header .header_main .gnb_wrap ul.depth1 > li').hasClass('select')){
                $('header .header_main .gnb_wrap ul.depth1 > li').removeClass('select')
                $(this).addClass('select')
            }
        }
    })
    $('header .header_main .gnb_wrap .depth1 > li > .depth2_wrap > ul.depth2 > li > a').on('click', function(){
        if(device_status == 'mo'){

            gnb_open = $(this).parent().hasClass('open')

            if(gnb_open == true){ //열려있다면
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            }else{
                $('header .header_main .gnb_wrap .depth1 > li > .depth2_wrap > ul.depth2 > li').removeClass('open')
                $('header .header_main .gnb_wrap .depth1 > li > .depth2_wrap > ul.depth2 > li > ul.depth3').slideUp()
                $(this).parent().addClass('open')
                $(this).next().slideDown()
            }


        }


    })
        
            


})//js end