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

     let scrolling = $(window).scrollTop()// 현재스크롤값

    function scroll_chk(){
            scrolling = $(window).scrollTop()

            if(scrolling > 950){
                $('.visual .video').css('position', 'relative')
            }else{
                $('.visual .video').css('position', 'fixed')
            }
        
    }
    scroll_chk()  //문서로딩 후 1번
        $(window).scroll(function(){
            scroll_chk()  // 스크롤할때마다
            console.log(scrolling)
        })

    device_chk()



})//end js