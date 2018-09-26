//一些常用的方法整理

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

var Common = {};

//ajax请求
Common.ajax = function (o) {
    var action = o.action;
    var sync = o.sync == null ? true : o.sync;
    var url = o.url;
    var data = o.data;
    var success = o.success;

    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                success(xmlhttp);
            }
        };
        xmlhttp.open(action, url, sync);
        xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf8");
        action = action.toUpperCase();
        if (action == "GET" || action == "DELETE") {
            xmlhttp.send();
        } else if (action == "POST" || action == "PUT") {
            xmlhttp.send(JSON.stringify(data));
        }
    } else {
        alert("Your browser does not support XMLHTTP.");
    }
}

//时间戳
Common.timestamp = function () {
    return Date.parse(new Date()) / 1000;
};

// 动态载入style
Common.importStyle = function (url) {
    var linkNode = document.createElement("link");
    linkNode.setAttribute("rel", "stylesheet");
    linkNode.setAttribute("type", "text/css");
    linkNode.setAttribute("href", url);
    document.head.appendChild(linkNode);
};

//动态加载Script
Common.importScript = function (url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (typeof (callback) == 'function') {
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}

//是否是数字
Common.isNumber = function (n) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(n) || regNeg.test(n)) {
        return true;
    } else {
        return false;
    }
}
//是否是整数
Common.isInt = function (n) {
    var regPos = /^\d+$/; // 非负整数
    var regNeg = /^\-[1-9][0-9]*$/; // 负整数
    if (regPos.test(n) || regNeg.test(n)) {
        return true;
    } else {
        return false;
    }
}
//QQ
Common.isQQ = function (n) {
    if (RegExp(/^[1-9][0-9]{4,10}$/).test(n)) return true;
    else return false;
};
//手机号
Common.isMobile = function (n) {
    if (RegExp(/^(0|86|17951)?(13[0-9]|15[0-9]|18[0-9]|14[57])[0-9]{8}$/).test(n)) return true;
    else return false;
};
//邮箱
Common.isEmail = function (n) {
    if (RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(n)) return true;
    else return false;
};

//获取？后面指定参数值，不区分大小写
Common.urlParam = function (n) {
    var url = location.search;
    url = url.replace("?", "");
    var urls = url.split("&");
    var result = "";
    for (i = 0; i < urls.length; i++) {
        if (urls[i].split("=")[0].toLowerCase() == n.toLowerCase()) {
            result = urls[i].split("=")[1];
            break;
        }
    }
    return result;
};
//判断浏览器
Common.browserType = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0"
        } //IE版本过低
    } //isIE end
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
}
//判断是否是IE浏览器
Common.isIE = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    return isIE;
};
//是否安卓端
Common.isAndroid = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    return isAndroid;
};
//是否IOS端
Common.isIOS = function () {
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isIOS;
};
//是否是电脑，用来区分手机和PC
Common.isPC = function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
//PC端浏览器全屏
Common.screenFull = function (element) {
    try {
        // 判断各种浏览器，找到正确的方法
        var requestMethod = element.requestFullscreen || //W3C
            element.webkitRequestFullScreen || //Chrome等
            element.mozRequestFullScreen || //FireFox
            element.msRequestFullscreen; //IE11
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    } catch (e) {}
};
//PC端浏览器退出全屏
Common.screenFullExit = function () {
    try {
        // 判断各种浏览器，找到正确的方法
        var exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen || //Chrome等
            document.webkitCancelFullScreen || //FireFox
            document.msExitFullscreen; //IE11
        if (exitMethod) {
            exitMethod.call(document);
        } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    } catch (e) {}
};

//文本替换
Common.replace = function (str, s1, s2) {
    var strResult = "";
    try {
        strResult = str.replace(new RegExp(s1, "gm"), s2); //正则正常替换
    } catch (e1) {
        try {
            strResult = str.replace(eval("/\\" + s1 + "/g"), s2); //替换带有非法字符
        } catch (e2) {
            strResult = str;
        }
    }
    return strResult;
};
//去除两边空格
Common.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};
//保留几位小数
Common.toFixed = function (value, num) {
    if (isNaN(value) || value == 0) return 0;
    else return parseFloat(parseFloat(value).toFixed(num));
};
//文本高亮
Common.highlight = function (str, keys) {
    keys.forEach(function (key) {
        if (key.trim() != "") {
            var tagLength = "<span class='red'></span>".length;
            var strLower = str.toLowerCase();
            var keyLower = key.toLowerCase();
            var index = 0;
            while (true) {
                index = strLower.indexOf(keyLower, index);
                if (index != -1) {
                    var check = checkRecord(strLower, index);
                    if (check.status) {
                        str = str.substring(0, index) + "<span class='red'>" + str.substring(index, index + key.length) +
                            "</span>" + str.substring(index + key.length);
                        strLower = strLower.substring(0, index) + "<span class='red'>" + strLower.substring(index, index + key.length) +
                            "</span>" + strLower.substring(index + key.length);
                        index = index + tagLength + key.length;
                    } else {
                        index = check.index;
                    }
                } else {
                    break;
                }
            }
        }
    });
    return str;

    function checkRecord(str, index) {
        var result = {
            status: true
        };
        result.index = str.indexOf(">", index);
        if (result.index != -1 && result.index - index < 18) {
            result.status = false;
        }
        return result;
    }
};
//base64加密
Common.encodeBase64 = function (str) {
    function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    };

    function encode64(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    };
    return encode64(utf16to8(str));
};
//base64解密
Common.decodeBase64 = function (str) {
    function utf8to16(str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12:
                case 13:
                    // 110x xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx 10xx xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    };

    function decode64(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        if (input.length % 4 != 0) {
            return "";
        }
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            return "";
        }
        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output += String.fromCharCode(chr3);
            }
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    };
    return utf8to16(decode64(this.replace(str, " ", "+")));
};
//html编码，用于页面展示html代码
Common.encodeHtml = function (s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
};
//html解码
Common.decodeHtml = function (s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
};

//通过原型创建一个新的对象，非引用
Common.inherit = function (p) {
    if (p == null) throw TypeError();
    if (Object.create) return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError();

    function f() {};
    f.prototype = p;
    return new f();
};

//目录树根据根据一个节点获取所有父节点的信息
Common.getNodesByItem = function (menuDate, item) {
    var data = menuDate;
    return getNodes(item);

    function getNodes(id) {
        var r = [];
        var i = 0;
        var b = true;
        for (var n = 0; n < data.length; n++) {
            if (!b) break;
            var t = data[n];
            i = 0;
            r = [];
            r[i] = {
                itemID: t.itemID,
                name: t.name
            };
            if (t.itemID == id) {
                b = !b;
                break;
            }
            getChildList(t.childList);
        }
        if (b) r = [];
        return r;

        function getChildList(tt) {
            if (tt && tt.__proto__.constructor == Array) {
                i++;
                for (var n = 0; n < tt.length; n++) {
                    if (!b) break;
                    var t = tt[n];
                    r.splice(i, r.length - i);
                    r[i] = {
                        itemID: t.itemID,
                        name: t.name
                    };
                    if (t.itemID == id) {
                        b = !b;
                        return;
                    }
                    getChildList(t.childList);
                }
                i--;
            }
        }
    }
};