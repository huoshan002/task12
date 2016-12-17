"use strict";

/********************************js时间工具*****************************************/
var DateUtil = {};
/**
 * 将日期字符串转成日期
 * fmt：yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd
 */
DateUtil.parseDate = function (str, fmt) {
    if (!str) {
        return null;
    }
    var date;
    var year = 0;
    var month = 0;
    var day = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var tempStrs = str.split(' ');
    if (tempStrs[0]) {
        var dateStrs = tempStrs[0].split("-");
        year = parseInt(dateStrs[0], 10);
        month = parseInt(dateStrs[1], 10) - 1;
        day = parseInt(dateStrs[2], 10);
    }
    if (tempStrs[1]) {
        var timeStrs = tempStrs[1].split(":");
        hour = parseInt(timeStrs[0], 10);
        minute = parseInt(timeStrs[1], 10);
        second = parseInt(timeStrs[2], 10);
    }

    if (fmt == 'yyyy-MM-dd') {
        date = new Date(year, month, day);
        return date;
    } else if (fmt == 'yyyy-MM-dd HH:mm:ss') {
        date = new Date(year, month, day, hour, minute, second);
        return date;
    }
    return null;
};

/**
 * 格式化日期
 */
DateUtil.fomatDate = function (date, fmt) {
    var yyyy = date.getFullYear();
    var MM = date.getMonth();
    var dd = date.getDate();
    var HH = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    var hh = HH > 12 ? HH - 12 : HH;
    var dateStr = fmt.replace('yyyy', yyyy).replace('MM', DateUtil.addZero(MM + 1)).replace('dd', DateUtil.addZero(dd)).replace('HH', DateUtil.addZero(HH)).replace('mm', DateUtil.addZero(mm)).replace('ss', DateUtil.addZero(ss)).replace('hh', DateUtil.addZero(hh));
    return dateStr;
};

DateUtil.addZero = function (num) {
    if (num < 10) return '0' + num;
    return num;
};

/**
 * 将日期字符串转成日期
 * fmt：yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd
 */
DateUtil.parseDate = function (str, fmt) {
    if (!str) {
        return null;
    }
    var date;
    var year = 0;
    var month = 0;
    var day = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var tempStrs = str.split(' ');
    if (tempStrs[0]) {
        var dateStrs = tempStrs[0].split("-");
        year = parseInt(dateStrs[0], 10);
        month = parseInt(dateStrs[1], 10) - 1;
        day = parseInt(dateStrs[2], 10);
    }
    if (tempStrs[1]) {
        var timeStrs = tempStrs[1].split(":");
        hour = parseInt(timeStrs[0], 10);
        minute = parseInt(timeStrs[1], 10);
        second = parseInt(timeStrs[2], 10);
    }

    if (fmt == 'yyyy-MM-dd') {
        date = new Date(year, month, day);
        return date;
    } else if (fmt == 'yyyy-MM-dd HH:mm:ss') {
        date = new Date(year, month, day, hour, minute, second);
        return date;
    }
    return null;
};
/**
 * 获取指定日期最后一天日期
 */
DateUtil.getLastDate = function (date) {
    date = arguments[0] || new Date();
    var newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(1);
    var time = newDate.getTime() - 24 * 60 * 60 * 1000;
    newDate = new Date(time);
    return newDate;
};
/**
 * 获取指定日期第一天日期
 */
DateUtil.getFirstDate = function (date) {
    date = arguments[0] || new Date();
    var newDate = new Date(date.getTime());
    newDate.setDate(1);
    return newDate;
};
/**
 * 日期计算
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param num int
 * @param date Date 日期对象
 * @return Date 返回日期对象
 */
DateUtil.dateAdd = function (strInterval, num, date) {
    date = arguments[2] || new Date();
    switch (strInterval) {
        case 's':
            return new Date(date.getTime() + 1000 * num);
        case 'n':
            return new Date(date.getTime() + 60000 * num);
        case 'h':
            return new Date(date.getTime() + 3600000 * num);
        case 'd':
            return new Date(date.getTime() + 86400000 * num);
        case 'w':
            return new Date(date.getTime() + 86400000 * 7 * num);
        case 'm':
            return new Date(date.getFullYear(), date.getMonth() + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        case 'y':
            return new Date(date.getFullYear() + num, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }
};

/***********************************农历日期转换**********************************************/
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
    return m >> n & 1;
}
function e2c() {
    TheDate = arguments.length != 3 ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
        tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0;; m++) {
        k = CalendarData[m] < 0xfff ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true;break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
        }
    }
}

function GetcDateString() {
    var tmp = "";
    tmp += tgString.charAt((cYear - 4) % 10);
    tmp += dzString.charAt((cYear - 4) % 12);
    tmp += "(";
    tmp += sx.charAt((cYear - 4) % 12);
    tmp += ")年 ";
    if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
    } else {
        tmp += monString.charAt(cMonth - 1);
    }
    tmp += "月";
    tmp += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
    if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    if (solarYear < 1921 || solarYear > 2020) {
        return "";
    } else {
        solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
    }
}

var D = new Date();
var yy = D.getFullYear();
var mm = D.getMonth() + 1;
var dd = D.getDate();
var ww = D.getDay();
var ss = parseInt(D.getTime() / 1000);
if (yy < 100) yy = "19" + yy;
function GetCNDate() {
    return GetLunarDay(yy, mm, dd);
}

/*******************************cookie 设置***********************************/
/**
 * 写cookie值
 * @param name
 * @param value
 * @param time 过期时间，单位ms
 */
var CommonUtil = {};
CommonUtil.setCookie = function (name, value, time) {
    var period = time;
    if (!time) {
        period = 30 * 24 * 60 * 60 * 1000;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + period);
    document.cookie = name + "=" + escape(value) + ";Path=/;expires=" + exp.toGMTString();
};

/**
 * 取得cookie值
 * @param name
 * @returns
 */
CommonUtil.getCookie = function (name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    return null;
};

/**
 * 删除cookie
 */
function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
        }
    }
}