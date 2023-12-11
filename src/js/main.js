// menu-mobile
let menuToggler = document.querySelector('.menu_bars a');
menuToggler.addEventListener('click',function(e){
e.preventDefault()
this.classList.toggle('active');
document.querySelector('.menu_mobile').classList.toggle('show');
})


let starLinks = document.querySelectorAll('.big_collection_item_top ');
starLinks.forEach(function(v,i,a){
    v.addEventListener('click', function(e){
        e.preventDefault();
        // clear other links
    starLinks.forEach(function(v,i,a){
        // v.classList.remove('active');
    })
    this.classList.toggle('active');
    })
})

    //  SWIPER-1
    var howDoesTopSwiper = new Swiper(".how-does-top-swiper .swiper", {
    autoplay :{
        delay: 7000,
    },
    spaceBetween: 18,
    center: true,
    pagination: {
        el: '.how-does-top-swiper .swiper-pagination',
        clickable: true,
    },
    breakpoints:{
        0:{
            slidesPerView: 1,
            center: true,
        },
        300:{
            slidesPerView: 1,
            center: true,
        },
        480:{
            slidesPerView: 1,
            center: true,
        },
        },
    });


    //  SWIPER-2
    var reviewSwiper = new Swiper(".reviews-swiper .swiper", {
        autoplay :{
            delay: 7000,
        },
        spaceBetween: 18,
        center: true,
        pagination: {
            el: '.reviews-swiper .swiper-pagination',
            clickable: true,
        },
        breakpoints:{
            0:{
                slidesPerView: 1,
                center: true,
            },
            300:{
                slidesPerView: 1,
                center: true,
            },
            480:{
                slidesPerView: 1,
                center: true,
            },
        },
    });


    //  SWIPER-3
    var generatorSwiper = new Swiper(".generator-swiper .swiper", {
        autoplay :{
            delay: 7000,
        },
        spaceBetween: 18,
        center: true,
        breakpoints:{
            0:{
                slidesPerView: 1,
                center: true,
            },
            300:{
                slidesPerView: 1,
                center: true,
            },
            480:{
                slidesPerView: 1,
                center: true,
            },
        },
    });


    //  SWIPER-4
    var bigCollectionSwiper = new Swiper(".big-collection-swiper .swiper", {
        autoplay :{
            delay: 7000,
        },
        spaceBetween: 18,
        center: true,
        breakpoints:{
            0:{
                slidesPerView: 1,
                center: true,
            },
            300:{
                slidesPerView: 1,
                center: true,
            },
            480:{
                slidesPerView: 1,
                center: true,
            },
        },
    });

