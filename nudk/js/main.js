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

            if(scrolling > 400){
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


    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
        console.log(e);
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


    gsap.registerPlugin(ScrollTrigger);

    const obj_ani = gsap.timeline();
   
    // 처음엔 전부 숨김
        obj_ani.set([".about .obj01", ".about .obj02", ".about .obj03"], { autoAlpha: 0 });

        // 01
        obj_ani.to(".about .obj01", { autoAlpha: 1, duration: 1 }, 1);
        obj_ani.to(".about .obj01", { autoAlpha: 0, duration: 1 }, 2.5);

        // 02
        obj_ani.to(".about .obj02", { autoAlpha: 1, duration: 1 }, 4);
        obj_ani.to(".about .obj02", { autoAlpha: 0, duration: 1 }, 5.5);

        // 03
        obj_ani.to(".about .obj03", { autoAlpha: 1, duration: 1 }, 6);



    ScrollTrigger.create({
    animation: obj_ani,
    trigger: ".about .obj_wrap",
    start: "center center",
    end: "+=3000",
    scrub: true,
    pin: true,
    anticipatePin: 1
});

console.log(document.querySelectorAll(".about .obj01 .obj_img").length);


})//end js