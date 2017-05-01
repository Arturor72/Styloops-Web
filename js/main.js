var main=function () {
    var lastId;
    var topMenu=$(".menu");
    var topMenuHeigth=topMenu.outerHeight()+1;
    //console.log("topMenuHeigth"+topMenuHeigth);
    var menuItems=topMenu.find("a");
    var scrollItems=menuItems.map(function () {
        var item=$($(this).attr("href"));
        if(item.length){
            return item;
        }
    });

    menuItems.click(function (e) {
        var href=$(this).attr("href");
        var offsetTop=href==="#"? 0:$(href).offset().top+1;
        //console.log(offsetTop);
        $('html, body').stop().animate({
            scrollTop:offsetTop
        }, 850);
        e.preventDefault();
    });

    $(window).ready(function(){
      $("html, body").animate({ scrollTop: $("#inicio").scrollTop() }, 1000);
    });

    $(window).scroll(function () {
         var fromTop=$(this).scrollTop();
          //console.log("From top"+fromTop);

        var cur=scrollItems.map(function () {
            if($(this).offset().top<(fromTop+10)) return this;
        })
        //console.log(cur);
        //
        // // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";


         if (lastId !== id) {
             lastId = id;
        //     // Set/remove active class
         //console.log(menuItems);

             menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=\"#"+id+"\"]").parent().addClass("active").blur();
         }

    });
    setTimeout(function(){
        $('#loader').addClass('loaded');
        $('.menu').addClass('menu__loaded');

    }, 3000);

    toggleServices();

    function toggleServices(){
      var inweb=false;
      var incorp=false;

      var webp=$(".web-page");
      var corporatei=$(".corporate-identity");
      var color1="#FFFFFF";
      var color2="#F8F8F8";
      webp.hover(function(){
        corporatei.css({
            "background-color":color1
        });
        webp.css({
          "background-color":color2
      });
      inweb=true;
      }, function(){
        inweb=false;
        verifyHoverService(inweb,incorp, color1, color2);
      });
      corporatei.hover(function(){
        corporatei.css({
          "background-color":color2
      });
        webp.css({
            "background-color":color1
        });
        incorp=true;
      }, function(){
        incorp=false;
        verifyHoverService(inweb,incorp, color1, color2);
      });
    }
function verifyHoverService(inweb, incorp, color1, color2){
  var webp=$(".web-page");
  var corporatei=$(".corporate-identity");
    if(!inweb&&!incorp){
      console.log("Reset");
      corporatei.css({
        "background-color":color2
    });
    webp.css({
      "background-color":color1
    });
  }
}
}

$(document).ready(main());
