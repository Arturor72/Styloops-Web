/**
 * Created by arturo on 4/16/17.
 */
$(document).ready(main());

function main() {
    var banner = {
        padre: $("#banner"),
        numeroSlide: $("#banner").children(".slide").length,
        numeroActiveSlide: $("#banner").children(".active").length
    }
    var banner2 = {
        padre: $("#banner2"),
        numeroSlide: $("#banner2").children(".slide").length,
        numeroActiveSlide: $("#banner2").children(".active").length
    }

    $(window).resize(function () {
        calcularAlto();
    });

    calcularAlto(banner);
    calcularAlto(banner2);
    colocarSlides(banner);
    colocarSlides(banner2);
    setInterval(function(){
        var slides=banner.padre.children(".slide");
        animateSlides(slides, banner);
    },3000);
    setInterval(function(){
        var slides=banner2.padre.children(".slide");
        animateSlides(slides, banner2);
    },4000);



    function animateSlides(slides, banner){
        var wasPosition=false;
        for( i=0; i<slides.length;i++){
            var slide=slides.eq(i);
            var top=(100/banner.numeroActiveSlide);
            var actualTop=calculateActualTop(slide);
            slide.animate({
                "top":(actualTop.toFixed(2)-top.toFixed(2))+"%"
            },{complete:function(){
                wasPosition=true;
            }});
        }
        setTimeout(function() {
            positionSlidesAfterAnimation(wasPosition,slides, banner);
        }, 500);
    }
    function positionSlidesAfterAnimation(wasPosition, slides, banner){
        if(wasPosition){
            var topFirstSlide=(100/banner.numeroActiveSlide)*(slides.length-1);
            banner.padre.children(".first").first().css({
                "top":topFirstSlide.toFixed(2)+"%"
            });
            for( i=0; i<slides.length;i++) {
                var slide = slides.eq(i);
                var actualTop=calculateActualTop(slide);
                evaluateTop(actualTop,slide);
            }
        }
    }
    function colocateFirstSlide(banner){
        var topFirstSlide=(100/banner.numeroActiveSlide)*(slides.length-1);
        banner.padre.children(".first").first().css({
            "top":topFirstSlide.toFixed(2)+"%"
        });
    }
    function evaluateTop(actualTop, slide){
        if(actualTop.toFixed(2)>99 || actualTop.toFixed(2)<0){
            slide.removeClass("active");
            slide.removeClass("first");
        }else{
            slide.addClass("active");
        }
        if(actualTop.toFixed(2)>=0 && actualTop.toFixed(2)<1){
            slide.addClass("first");
        }
    }
    function calculateActualTop(slide){
        var actualSlideHeight=slide.css("top").substring(0, slide.css("top").length-2);
        var bannerHeight=banner.padre.css("height").substring(0, banner.padre.css("height").length-2);;
        var actualTop=(actualSlideHeight/bannerHeight)*100;
        return actualTop;
    }


    function colocarSlides(banner){
        var slides=banner.padre.children(".slide");
        for( i=0; i<slides.length;i++){
            var slide=slides.eq(i);
            var top=(i)*(100/banner.numeroActiveSlide);
            slide.css({
                "top":top+"%"
            });
        }
    }
    function calcularAlto(banner){
        banner.padre.css({
            "height":   banner.numeroActiveSlide * banner.padre.children(".slide").outerHeight()
        });
    }
}