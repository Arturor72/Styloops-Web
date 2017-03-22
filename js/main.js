var main=function () {
    var lastId;
    var topMenu=$(".nav_menu");
    var topMenuHeigth=topMenu.outerHeight()+1;
    console.log(topMenuHeigth);
    var menuItems=topMenu.find("a");

    console.log(menuItems);
    var scrollItems=menuItems.map(function () {
        var item=$($(this).attr("href"));
        if(item.length){
            return item;
        }
    });
    console.log(scrollItems);

    menuItems.click(function (e) {
        var href=$(this).attr("href");
        var offsetTop=href==="#"? 0:$(href).offset().top- topMenuHeigth+1;
        console.log(offsetTop);
        $('html, body').stop().animate({
            scrollTop:offsetTop
        }, 850);
        e.preventDefault();
    });
    
    
    // $(window).scroll(function () {
    //     var fromTop=$(this).scrollTop()+topMenuHeigth;
    //     console.log(fromTop);
    //
    //     var cur=scrollItems.map(function () {
    //         if($(this).offset().top<fromTop) return this;
    //     })
    //
    //     // Get the id of the current element
    //     cur = cur[cur.length-1];
    //     var id = cur && cur.length ? cur[0].id : "";
    //
    //     if (lastId !== id) {
    //         lastId = id;
    //         // Set/remove active class
    //         menuItems
    //             .parent().removeClass("active")
    //             .end().filter("[href=#"+id+"]").parent().addClass("active");
    //     }
    //
    // });

}

$(document).ready(main());