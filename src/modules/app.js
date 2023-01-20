import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
const swiperPaginationW= document.querySelector('.swiper-pagination-w')
const swiperPaginationLine= document.querySelector('.swiper-pagination-line')

const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.8,
    spaceBetween: 20,
    mousewheel: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    grabCursor: true,
    slidesOffsetBefore:20,
    // pagination: {
    //     el: '.swiper-pagination',
    // },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar-line',
        draggable: true,
    },
    on: {
        click: function () {
        },
        sliderMove: function () {

        },
        realIndexChange: function () {
            // getWidthPaginationLine()
            // console.log(swiper.realIndex)
        },
        resize: function () {

        },
    },
});


function getWidthPaginationLine() {
    const wrappLineWidth = swiperPaginationW.clientWidth
    const paginationLineWidth = swiperPaginationLine.clientWidth
    console.log('wrappLineWidth', wrappLineWidth)
    console.log('paginationLineWidth', paginationLineWidth)
    return { wrappLineWidth, paginationLineWidth }
}
