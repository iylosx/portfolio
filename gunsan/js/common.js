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


    $('header .header_main .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
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


})//js end