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

 let scrolling = $(window).scrollTop()// 현재스크롤값

    function scroll_chk(){
            scrolling = $(window).scrollTop()

            if(scrolling > 840){
                $('header').addClass('fixed')
            }else{
                $('header').removeClass('fixed')
            }

            if(scrolling < 30){
                $('header .gnb ').css('top', '30px')
            }else{
                $('header .gnb ').css('top', '0px')
            }
        }

    scroll_chk()  //문서로딩 후 1번
        $(window).scroll(function(){
            scroll_chk()  // 스크롤할때마다
            console.log(scrolling)
        })

    // basic set


    
        
            


})//js end