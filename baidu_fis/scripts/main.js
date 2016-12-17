/*
* 经过对task12的学习，掌握了js的常用设计模式
* 我采用了单例模式，我觉得有如下优点
* 1，采用单例模式开发，生成一个唯一的全局变量，一个命名空间解决命名冲突的问题。
* 2，更快更容易找到定义的变量和方法。
* 3，在工作项目中普遍采用这种开发模式，团队成员协作开发，代码之间不会造成冲突。
* 希望老师多多指点。谢谢：）~
*
* */


var baidu = {
    City: ""
};

//dom节点
var Dom = {
    sTopMenu: "#s_top_wrap",
    moreBtn: "#more_btn",
    sliderNav: "#sidebar",
    weatherBox: ".weather-city",
    weatherWrap: ".weather-more-box",
    skinWrap: ".s-skin-layer"
};

baidu.handleEvent = function () {

    //tab内容标签切换
    var _tabContent = $(".tab-contents>div");
    $(".tab-menu li").each(function (index, ele) {
        _tabContent.eq(1).show();
        $(ele).on("click", function () {
            $(ele).addClass("current").siblings().removeClass("current");
            _tabContent.eq(index).show().siblings().hide();
        });
    });

    //更多产品
    $(Dom.moreBtn).mouseenter(function () {
        $("#sidebar").show();
    });
    $(Dom.sliderNav).mouseleave(function () {
        $("#sidebar").hide();
    });

    //鼠标悬浮显示天气
    $(Dom.weatherBox).mouseenter(function () {
        $(Dom.weatherWrap).show();
    });
    $(Dom.weatherWrap).mouseleave(function () {
        $(Dom.weatherWrap).hide();
    });
};

/**************************获取当前所在城市***************************
 *******************************************************************/
baidu.currentCity = function(result){
    var cityName = result.name;
    var cN = cityName.replace("市",'');
    baidu.City = cN;
    $(".show-city-name").html(baidu.City + "：");
    baidu.getWeatherData(cN)
};

/******之前调用的获取位置api方法，地址失效了，换了上面的api，这段暂时注释******/
// baidu.currentCity = function (callback) {
//     $.ajax({
//         type: "get",
//         url: "http://webapi.amap.com/maps/ipLocation?key=608d75903d29ad471362f8c58c550daf",
//         dataType: 'text',
//         success: function success(data) {
//             //转换为JSON对象
//             var jsonObj = eval("(" + data.replace('(', '').replace(')', '').replace(';', '') + ")");
//             console.log(jsonObj);
//             //当前城市
//             var cityFullName = jsonObj.city;
//             var cityName = cityFullName.substring(0, cityFullName.length - 1);
//             baidu.City = cityName;
//             $(".show-city-name").html(baidu.City + "：");
//
//             callback && callback(baidu.City);
//         }
//     });
// };




/**************************更换皮肤*********************************
 *******************************************************************/
baidu.changSkin = function () {

    //初始化背景图片
    var initBg = CommonUtil.getCookie("bgUrl");
    if (initBg) {
        $(".skin-wrap").css("background-image", initBg);
    }

    //初始化是否使用皮肤
    var initSkin = CommonUtil.getCookie("skin");
    if (initSkin == "0" || !initSkin) {
        baidu.defaultSkin();
    } else {
        var _chooseIcon = "<div class='skin-img-item-choose skin-bg-icon skin-bg-png24-icon'></div>";
        var _choosePicc = CommonUtil.getCookie("bgPic");
        var _choosePic = _choosePicc.toString();
        var p = {};
        p = "." + _choosePic;
        $(p).append(_chooseIcon);
        $("#logo-d").hide();
        $("#logo-w").show();

    }

    //皮肤
    $("#change_skin").click(function () {
        $(".skin-mask").show();
        $(Dom.skinWrap).show().animate({
            "top": 0,
            "opacity": 1
        }, 300);
    });
    $(".s-skin-up, .skin-mask").click(function () {
        $(Dom.skinWrap).animate({
            "top": "-288px",
            "opacity": 0
        }, 300, function () {
            $(Dom.skinWrap).hide();
            $(".skin-mask").hide();
        });
    });

    $(".s-skin-nav>li").each(function (index, ele) {
        $(ele).click(function () {
            $(ele).addClass("choose-nav").siblings().removeClass("choose-nav");
            $(".s-skin-content>li").eq(index).show().siblings().hide();
        });
    });

    var _skinItem = $(".s-skin-border-content");

    //皮肤预览
    _skinItem.find("p").on("mouseenter", function (event) {
        var _skinBgSrc = $(this).closest("li").find("img").attr("src");
        $("#s_skin_preview_skin").attr("src", _skinBgSrc);
    });

    $(".s-skin-set").click(function () {
        baidu.defaultSkin();
    });

    //皮肤切换
    _skinItem.find("p").on("click", function () {
        var _chooseIcon = "<div class='skin-img-item-choose skin-bg-icon skin-bg-png24-icon'></div>";
        var _pearentElement = $(this).closest("li");
        _pearentElement.append(_chooseIcon);
        _pearentElement.siblings().find($(".skin-img-item-choose")).remove();
        _pearentElement.closest(".skin-type-content").siblings().find($(".skin-img-item-choose")).remove();

        var _skinBgSrc = $(this).closest("li").find("img").attr("src");
        var _imgBgUrl = _skinBgSrc.replace("-preview", "");
        var _url = "url(" + _imgBgUrl + ")";
        console.log(_imgBgUrl);
        $(".skin-wrap").css("background-image", _url);
        CommonUtil.setCookie("bgUrl", _url);
        var _bgPic = $(this).closest("li").attr("pic");
        CommonUtil.setCookie("bgPic", _bgPic);
        baidu.useSkin();
    });

    //改变透明度
    $('.single-slider').jRange({
        from: 0,
        to: 100,
        step: 10,
        format: '%s',
        width: 80,
        showLabels: true,
        showScale: false,
        onstatechange: function onstatechange() {
            var _wrap = $(".middle-wrap");
            var _opacityVal = $(".single-slider").val();
            var _opacityClass = "s-opacity-" + _opacityVal;
            var _attrClass = _wrap.attr("class");
            var _pos = _attrClass.indexOf("s-opacity-");
            _attrClass = _pos != -1 ? _attrClass.substring(0, _pos - 1) + " " + _opacityClass : _attrClass + " " + _opacityClass;
            _wrap.attr("class", _attrClass);
        }
    });
};

//不使用皮肤
baidu.defaultSkin = function () {
    $(".skin-wrap").css("background-image", "url()");
    CommonUtil.setCookie("bgUrl", null);
    $("#logo-d").show().siblings().hide();
    var logoPic = $("#logo-d").attr("src");
    CommonUtil.setCookie("logoPic", logoPic);
    $(".search-input").addClass("search-input-default").children(".form-control").css("height", "38px");
    $(".search-btn").addClass("blue");
    $(".top-bar").addClass("default-skin");
    $(".footer-wrap, .footer-wrap a").css("color", "#555");
    CommonUtil.setCookie("skin", "0");
};

//使用皮肤
baidu.useSkin = function () {
    $(".logo img").attr("src", "images/logo_white.png");
    CommonUtil.setCookie("logoPic", "images/logo_white.png");
    $(".search-input").removeClass("search-input-default").children(".form-control").css("height", '');
    $(".search-btn").removeClass("blue");
    $(".top-bar").removeClass("default-skin");
    $(".footer-wrap, .footer-wrap a").css("color", '');
    CommonUtil.setCookie("skin", "1");
};

/**************************获取天气*********************************
 *******************************************************************/
//ajax获取天气数据
baidu.getWeatherData = function (city) {

    var _location = city;

    var _url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + _location + '&output=json&ak=' + 'h6XnSsg19ZFbGSRoeIwUiEBvXoRd4QQQ';
    $.ajax({
        url: _url,
        type: "GET",
        dataType: "jsonp",
        success: function success(data) {
            var date_time = DateUtil.parseDate(data['date'], "yyyy-MM-dd");
            var dateStr = DateUtil.fomatDate(date_time, "MM月dd日");
            $(".lunar-calendar").empty().text(dateStr);
            $(".lunar-festival").empty().text(GetCNDate());

            $(".everyday-mod div").remove();
            var dataSize = data.results[0].weather_data.length;

            for (var i = 0; i < dataSize; i++) {
                var weatherData = data.results[0].weather_data[i];
                var day = weatherData['date'];
                var pic = weatherData['dayPictureUrl'];
                var weather = weatherData['weather'];
                var wind = weatherData['wind'];
                var temperature = weatherData['temperature'];

                //判断今天天气
                if (i == 0) {
                    var arrLocation = weatherData['date'].indexOf("(");
                    //修改日期显示
                    var day = "今天 " + weatherData['date'].slice(arrLocation);
                    //设置今天天气图片
                    $(".weather-icon").css("background-image", "url(" + pic + ")");
                    //获取实时温度
                    var tempLocation = day.indexOf("：") + 1;
                    var temp = day.slice(tempLocation, -1);
                    $(".show-icon-temp").text(temp);
                    //污染度
                    var pollution = data.results[0]['pm25'];
                    $(".show-pollution-num").text(pollution);
                    //空气质量
                    var tempQ;
                    switch (true) {
                        case pollution >= 0 && pollution <= 50:
                            tempQ = "优";
                            break;
                        case pollution > 50 && pollution <= 100:
                            tempQ = "良";
                            break;
                        case pollution > 100 && pollution <= 150:
                            tempQ = "轻度";
                            break;
                        case pollution > 150 && pollution <= 200:
                            tempQ = "中度";
                            break;
                        case pollution > 200 && pollution <= 300:
                            tempQ = "重度";
                            break;
                        case pollution > 300:
                            tempQ = "严重";
                            break;
                        default:
                            tempQ = "无";
                    }
                    $(".show-pollution-name").text(tempQ);
                }

                var weather_item = "<div class='everyday-item today'><a href='javascript:;' class='everyday-link'><p class='everyday-title'>" + day + "</p><img src=' " + pic + "' class='everyday-icon'><p class='everyday-temp'>" + temperature + "</p><p class='everyday-condition'>" + weather + "</p><p class='everyday-wind'>" + wind + "</p></a></div>";
                $(".everyday-mod").append(weather_item);
            }

            $(".everyday-item:first-child").addClass("is-today");
        }
    });
};

//设置当前城市天气
baidu.setCurrentCity = function () {
    $(".lunar-setting-btn").click(function () {
        $(".setweather-setting").show();
    });

    $(".setting-cancel").click(function () {
        $(".setweather-setting").hide();
    });

    $(".setting-save").click(function () {
        var _options = $("#choose_location option:selected").val();
        baidu.getWeatherData(_options);
        CommonUtil.setCookie("currentCity", _options);
        baidu.City = _options;
        baidu.getWeatherData(baidu.City);
        $(".show-city-name").html(baidu.City + "：");
        $(".setweather-setting").hide();
    });
};

//天气初始化
baidu.weatherInit = function () {
    //CommonUtil.setCookie("currentCity","");
    var getCookieCity = CommonUtil.getCookie("currentCity");
    if (!getCookieCity || getCookieCity == '') {
        var myCity = new BMap.LocalCity();
        myCity.get(baidu.currentCity);
    } else {
        baidu.City = getCookieCity;
        baidu.getWeatherData(baidu.City);
        $(".show-city-name").html(baidu.City + "：");
    }

    baidu.setCurrentCity();
};

//回到顶部


/**************************全局初始化*********************************
 *******************************************************************/
var init = function () {
    baidu.handleEvent();
    baidu.changSkin();
    baidu.weatherInit();
};

$(function () {
    init();

    //显示快捷搜索
    $(window).scroll(function (event) {
        if ($("body").scrollTop() > 200) {
            $("#s_top_wrap").show();
        } else {
            $("#s_top_wrap").hide();
        }
    });

    //回到顶部
    $("#top_feed").click(function () {
        $(window).scrollTop(0);
    });

    $(window).scroll(function () {
        var scrolltop = $("body").scrollTop();

        if (scrolltop >= 200) {
            $("#top_feed").show();
        } else {
            $("#top_feed").hide();
        }
    });

    //实时热点
    $(".news-title").mouseenter(function () {
        $(this).children(".more-info").show();
    });
    $(".news-title").mouseleave(function () {
        $(this).children(".more-info").hide();
    });



});
