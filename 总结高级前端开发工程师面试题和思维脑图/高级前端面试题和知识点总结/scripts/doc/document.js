'use strict';

//代码高亮
hljs.initHighlightingOnLoad();

//滚动监听
$('#nav').onePageNav({
    currentClass: 'current',
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.3,
    filter: '',
    easing: 'swing',
    begin: function begin() {
        //I get fired when the animation is starting
    },
    end: function end() {
        //I get fired when the animation is ending
    },
    scrollChange: function scrollChange($currentListItem) {
        //I get fired when you enter a section and I pass the list item of the section
    }
});

$(function () {
    //固定菜单
    $(window).scroll(function () {
        var scrollHeight = $(document).scrollTop();
        var menuWrap = $('.menu-wrap');
        if (scrollHeight > 60) {
            menuWrap.css({
                position: 'fixed',
                top: '0'
            });
        } else {
            menuWrap.css({
                position: '',
                top: ''
            });
        }
    });
});
//# sourceMappingURL=document.js.map
