// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';
import App from './App';
import router from './router';
import "../static/css/style.css";
import "../static/css/swiper-3.4.2.min.css";
import "../static/fonts/iconfont.css";
import "../static/newFonts/iconfont.css";
import "../static/fontIcon/iconfont.css";



//全局复制功能(传入节点id就行)
Vue.prototype._copytexts = (_dom) => {
    //禁止手机自带弹出键盘
    document.getElementById(_dom).onfocus = (event) => {
        document.activeElement.blur();
    };
    var inputText = document.getElementById(_dom);
    var currentFocus = document.activeElement;
    inputText.select(); //选择节点文字
    inputText.focus(); //设置焦点
    inputText.setSelectionRange(0, inputText.value.length); //设置光标选取的范围长度
    var msg = document.execCommand('copy') ? '成功' : '失败';
    if (msg == "成功") {
        Vue.prototype.plainalert("链接复制" + msg);
        currentFocus.focus();
    } else {
        Vue.prototype.plainalert('复制链接失败,请手动长按复制!<br><br>' + inputText.value);
    }
};
//全局加载中弹框
Vue.prototype.isloading = function(msg) {
    layer.open({
        type: 2,
        // content: msg,
        shadeClose: false,
    });
};
//全局信息提示弹框功能
Vue.prototype.infotips = function(msg) {
    layer.open({
        content: msg,
        skin: 'msg',
        type: 5,
        time: 1, //1秒后自动关闭
    });
};
//清除缓存和取消绑定手机号
Vue.prototype.clearLocalStorage = function() { //清除缓存
    localStorage.removeItem("sessionkey");
    localStorage.removeItem("avatar");
    localStorage.removeItem("uid");
    localStorage.removeItem("username");
    localStorage.removeItem("coin");
    localStorage.removeItem("phone");
    localStorage.removeItem("isCoinPassword");
    localStorage.removeItem("phone");
};
//普通信息弹框或者错误信息提示框
Vue.prototype.plainalert = function(msg) { //普通错误提示或者网络出错提示
    layer.open({
        content: msg,
        btn: '确定',
        shadeClose: false,
        yes: function(index) {
            layer.closeAll('loading'); //关闭loading
        },
    });
};
/*-------------公用function方法---------------*/
//font-size根据屏幕尺寸大小变化px
! function(window) {
    /* 设计图文档宽度 */
    var docWidth = 750; //基础宽度
    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = (function refreshRem() {
        var clientWidth = docEl.getBoundingClientRect().width;
        if (clientWidth >= 414) { //超出以上就不放大
            docEl.style.fontSize = '0.74555rem';
            window._sizeFont = '0.74555';
        } else if (clientWidth <= 320) { //小于320就不放缩
            docEl.style.fontSize = '0.5555rem';
            window._sizeFont = '0.5555';
        } else {
            docEl.style.fontSize = (clientWidth / docWidth) * 1.318 + 'rem';
            window._sizeFont = (clientWidth / docWidth) * 1.318;
        }
        return refreshRem;
    })();
    /* 添加倍屏标识，安卓为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);
    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8) {
            doc.documentElement.classList.add('hairline');
        }
    }
    if (!doc.addEventListener) {
        return;
    }
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}(window);
//全局禁止按空格键
document.onkeydown = function(e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 32) {
        return false;
    }
};
//6喝彩彩种颜色区间
window.allcolor = [ //6 he 颜色区间
    [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46], //red
    [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48], //blue
    [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49], //green
];
//加密格式
window._bankcodes = function() {
    var _c = eval(function(p, a, c, k, e, r) {
        e = String;
        if (!''.replace(/^/, String)) {
            while (c--) r[c] = k[c] || c;
            k = [function(e) {
                return r[e];
            }];
            e = function() {
                return '\\w+';
            };
            c = 1;
        }
        while (c--)
            if (k[c]) {
                p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
            }
        return p;
    }('0.1.2().3(" ").4().5("")', 6, 6, 'Vue|prototype|_encr|split|reverse|join'.split('|'), 0, {}));
    return _c;
};
//加密格式
window._enc = function() {
    return eval(function(p, a, c, k, e, r) {
        e = String;
        if (!''.replace(/^/, String)) {
            while (c--) r[c] = k[c] || c;
            k = [function(e) {
                return r[e];
            }];
            e = function() {
                return '\\w+';
            };
            c = 1;
        }
        while (c--)
            if (k[c]) {
                p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
            }
        return p;
    }('0().1(" ").2().3("")', 4, 4, '_bankcodes|split|reverse|join'.split('|'), 0, {}));
};
//开奖时间格式
window.opendowntime = function(s) {
    if (s == 0) {
        return "已封盘";
    }
    var t;
    if (s > 0) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour > 0) {
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }
            if (min < 10) {
                t += "0" + min + ":";
            } else {
                t += min + ":";
            }
            if (sec < 10) {
                t += "0" + sec;
            } else {
                t += parseInt(sec);
            }
        } else {
            if (min < 10) {
                t = "0" + min + ":";
            } else {
                t = min + ":";
            }
            if (sec < 10) {
                t += "0" + sec;
            } else {
                t += parseInt(sec);
            }
        }
    }
    return t;
};
//封盘时间
window.clockdowntime = function(s) {
    if (s == 0) {
        return "正在开奖";
    }
    var t;
    if (s > 0) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour > 0) {
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }
            if (min < 10) {
                t += "0" + min + ":";
            } else {
                t += min + ":";
            }
            if (sec < 10) {
                t += "0" + sec;
            } else {
                t += parseInt(sec);
            }
        } else {
            if (min < 10) {
                t = "0" + min + ":";
            } else {
                t = min + ":";
            }
            if (sec < 10) {
                t += "0" + sec;
            } else {
                t += parseInt(sec);
            }
        }
    }
    return t;
};
//快三骰子的图片
window._commonK3_canvas = function() {
    /*边框线
     * BorderLine(ctx, _x_t, _y_t, _w_h_ * 1.1, _w_h_ * 1.1, '#ffffff');//边框线颜色设置
     * */
    function BorderLine(_ctx, x, y, w, h, c) {
        _ctx.strokeStyle = c;
        _ctx.strokeRect(x, y, w, h); //(x,y,w,h)
    }
    /*
     * 形态样式,带圆角
     * DrawingCard(ctx, 20, 20, 100, 100, 10, {
     'res': true,//是否需要渐变效果
     'bg1': '#D1D2D4',//渐变颜色1(开始)
     'bg2': '#EEEEEE',//渐变颜色2(过度)
     'bg3': '#F1F1F1',//渐变颜色3(完成)
     'res_t': true,//是否显示文字
     '_text': 6,//文字内容
     '_c': '#D6A269',//文字颜色
     'size': 4,//文字大小
     'shadow': true,//是否显示阴影
     'sbg': '#A4A4A4',//阴影颜色
     });
     * */
    function DrawingCard(_ctx, x1, y1, width, height, radius, option) { //矩形大小(坐标和宽高),半径,绘图ctx
        if (option.res === true) { //控制渐变颜色
            _ctx.beginPath(); //开始绘画
            var gradient = _ctx.createLinearGradient(x1, y1 + width, x1 + width, y1); //指定线性渐变(起点xy，结束xy)
            gradient.addColorStop(0.0, option.bg1);
            gradient.addColorStop(0.5, option.bg2);
            gradient.addColorStop(1.0, option.bg3);
            _ctx.fillStyle = gradient; //带入以上的渐变样式
        }
        //渐变结束
        _ctx.save(); //保存下面一段到restore之间的属性,然后在restore之后变回save之前的模式(也就是什么只有颜色属性,其他的属性都没有写入)
        _ctx.beginPath();
        // 移动到左上角的开始点
        _ctx.moveTo(x1 + radius, y1);
        // 添加一条连接开始点到右上角的线段
        _ctx.lineTo(x1 + width - radius, y1);
        // 添加右上角的一段圆弧
        _ctx.arcTo(x1 + width, y1, x1 + width, y1 + radius, radius);
        // 添加一条连接到右下角的线段
        _ctx.lineTo(x1 + width, y1 + height - radius);
        // 添加右下角的一段圆弧
        _ctx.arcTo(x1 + width, y1 + height, x1 + width - radius, y1 + height, radius);
        // 添加一条由右下角连接到左下角的线段
        _ctx.lineTo(x1 + radius, y1 + height);
        // 添加左下的圆弧
        _ctx.arcTo(x1, y1 + height, x1, y1 + height - radius, radius);
        // 添加一条由左下角连接到左上角的线段
        _ctx.lineTo(x1, y1 + radius);
        // 添加一段圆弧
        _ctx.arcTo(x1, y1, x1 + radius, y1, radius);
        //结束绘图
        _ctx.closePath();
        _ctx.stroke();
        if (option.shadow === true) { //带有阴影
            _ctx.shadowBlur = 3;
            _ctx.shadowOffsetY = 3;
            _ctx.shadowOffsetX = 1;
            _ctx.shadowColor = option.sbg;
        }
        _ctx.fill();
        _ctx.restore();
        if (option.res_t === true) { //控制文字描述
            _ctx.font = 12 * option.size + 'px arial'; //如果后面没有设置字体大小(后面的字体就被继承当前这个字体大小)
            _ctx.textAlign = 'center'; //居中
            _ctx.fillStyle = option._c;
            _ctx.fillText(option._text, x1 + width / 2, y1 + height / 2 + option.size * 4);
        }
    }
    /*
     * 绘图特殊号码圆球
     * */
    function DrawCell(_ctx, x, y, txt, bgm, _r) {
        var r = _r / 3;
        _ctx.fillStyle = bgm;
        _ctx.font = 12 * 3.5 + 'px arial'; //如果后面没有设置字体大小(后面的字体就被继承当前这个字体大小)
        _ctx.save(); //保存下面一段到restore之间的属性,然后在restore之后变回save之前的模式(也就是什么只有颜色属性,其他的属性都没有写入)
        _ctx.beginPath();
        _ctx.arc(x, y, r - 5, 0, 2 * Math.PI);
        _ctx.fill();
        _ctx.restore();
        _ctx.fillStyle = '#E53235';
        _ctx.fillText(txt, x, y + 4 * 3.5);
    }
    //描绘点
    function drawPoint(_index) {
        if (_index == 1) {
            DrawCell(ctx, _canWH / 2, _canWH / 2, '', '#D1021C', _round * 1.25);
        }
        if (_index == 2) {
            DrawCell(ctx, _canWH / 4, _canWH / 2, '', '#000000', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 2, '', '#000000', _round);
        }
        if (_index == 3) {
            DrawCell(ctx, _canWH / 4, _canWH / 4, '', '#000000', _round);
            DrawCell(ctx, _canWH / 2, _canWH / 2, '', '#000000', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 1.3, '', '#000000', _round);
        }
        if (_index == 4) {
            DrawCell(ctx, _canWH / 4, _canWH / 4, '', '#D1021C', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 4, '', '#D1021C', _round);
            DrawCell(ctx, _canWH / 4, _canWH / 1.3, '', '#D1021C', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 1.3, '', '#D1021C', _round);
        }
        if (_index == 5) {
            DrawCell(ctx, _canWH / 4, _canWH / 4, '', '#000000', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 4, '', '#000000', _round);
            DrawCell(ctx, _canWH / 2, _canWH / 2, '', '#000000', _round);
            DrawCell(ctx, _canWH / 4, _canWH / 1.3, '', '#000000', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 1.3, '', '#000000', _round);
        }
        if (_index == 6) {
            DrawCell(ctx, _canWH / 4, _canWH / 4.1, '', '#000000', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 4.1, '', '#000000', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 1.9, '', '#000000', _round);
            DrawCell(ctx, _canWH / 4, _canWH / 1.9, '', '#000000', _round);
            DrawCell(ctx, _canWH / 4, _canWH / 1.2, '', '#000000', _round);
            DrawCell(ctx, _canWH / 1.3, _canWH / 1.2, '', '#000000', _round);
        }
    }
    //检测是否存在class
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    var _allDom = document.querySelectorAll("._canvasAll");
    for (var i = 0; i < _allDom.length; i++) {
        var canvas = _allDom[i];
        var _index = parseInt(_allDom[i].innerHTML);
        var ctx = canvas.getContext('2d'); //调用context对象并保存到变量ctx
        var _width_ = 24; //设置canvas宽高
        var _canWH = _width_ * 1.9; //内图画宽高
        var _round = _canWH / 1.6;
        if (hasClass(canvas, '_p2c')) { //存在class
            _width_ = 21; //设置canvas宽高
            _canWH = _width_ * 1.9; //内图画宽高
            _round = _canWH / 1.55;
        } else {
            _width_ = 24; //设置canvas宽高
            _canWH = _width_ * 1.9; //内图画宽高
            _round = _canWH / 1.6;
        }
        canvas.width = _width_ * 2;
        canvas.height = _width_ * 2;
        canvas.style.width = _width_ + 'px';
        canvas.style.height = _width_ + 'px';
        ctx.textAlign = 'center'; //居中
        BorderLine(ctx, 0, 0, _canWH * 1.1, _canWH * 1.1, '#ffffff'); //边框线颜色设置
        DrawingCard(ctx, 0, 0, _canWH, _canWH, 10, {
            'res': true, //是否需要渐变效果
            'bg1': '#D1D2D4', //渐变颜色1(开始)
            'bg2': '#EEEEEE', //渐变颜色2(过度)
            'bg3': '#F1F1F1', //渐变颜色3(完成)
            'res_t': false, //是否显示文字
            '_text': 6, //文字内容
            '_c': '#D6A269', //文字颜色
            'size': 4, //文字大小
            'shadow': true, //是否显示阴影
            'sbg': '#A4A4A4', //阴影颜色
        });
        drawPoint(_index);
    }
};
//开奖时间(_nowThis是当前组件this指向,Times倒计时)
window._openLottery = function(_nowThis, Times) {
    var _init = parseInt(new Date() / 1000, 10);
    var _diff = 0;
    clearInterval(_nowThis.times1);
    _nowThis.times1 = setInterval(function() {
        _diff = parseInt(new Date() / 1000, 10) - _init;
        if (_diff <= Times) { //减少1秒
            _nowThis.timeopen = Times - _diff;
        } else {
            clearInterval(_nowThis.times1);
            _nowThis.timeopen = 0;
            _nowThis._initdatanext(); //处于当前组件this里面的function方法
            return false;
        }
    }, 1000);
};
//封盘时间(_nowThis是当前组件this指向,Times倒计时)
window._closeLottery = function(_nowThis, Times) {
    var _init = parseInt(new Date() / 1000, 10);
    var _diff = 0;
    clearInterval(_nowThis.times2);
    _nowThis.times2 = setInterval(function() {
        _diff = parseInt(new Date() / 1000, 10) - _init;
        if (_diff <= Times) { //减少1秒
            _nowThis.timefeng = Times - _diff;
        } else {
            clearInterval(_nowThis.times2);
            _nowThis.timefeng = 0;
            return false;
        }
    }, 1000);
};
//开奖和封盘倒计时公用函数function(T是当前组件this的所有属性值)
window._commonSetTimeLottery = function(_t) {
    clearInterval(_t.times1);
    clearInterval(_t.times2);
    _t.timeopen = _t.next_lottery.time;
    _t.timefeng = _t.next_lottery.time - Number(_t.info.close_time);
    if (_t.timefeng < 1) { //如果一进来就封盘就设置0秒
        _t.timefeng = 0;
    }
    if (_t.timeopen < 1) { //如果一进来就开奖
        _t.timeopen = 0;
    }
    _openLottery(_t, _t.timeopen); //开奖时间
    _closeLottery(_t, _t.timefeng); //封盘时间
};
//删除所有定时器
window._commonClearAllTime = function(_t) {
    clearTimeout(_t.getopensum);
    clearTimeout(_t.getmoneySum);
    clearInterval(_t.times1);
    clearInterval(_t.times2);
    window.onresize = () => {
        return false;
    };
};
//显示清单列表弹框
window._commonDetailed = function(_t) {
    _t._emptyData(); //防止叠加金额
    let allDom = _t.checkallDom; //获取所有选中标签
    let selfDom = _t.checkallSelfDom;
    let selfheadDom = _t.checkallSelfheadDom;
    for (var i = 0; i < allDom.length; i++) {
        let _name = allDom[i].getAttribute("data-value"); //
        _t.bet.push({
            "name": _name,
            "value": _t.moneys,
        });
        let _val = allDom[i].getAttribute("data-item"); //
        _t.betlist.push({
            "name": _val.split("|")[0],
            "title": _val.split("|")[1],
            "odds": _val.split("|")[2],
        });
    }
    /* 连码 */
    for (var i = 0; i < selfheadDom.length; i++) {
        let _name = selfheadDom[i].getAttribute("data-value");
        let _val = selfheadDom[i].getAttribute("data-item"); //
        let strArr = [];
        for (var j = 0; j < selfDom.length; j++) {
            strArr.push(selfDom[j].getAttribute("data-item").split("|")[1]);
        }
        _t.bet.push({
            "name": _name,
            "value": _t.moneys,
            "content": strArr.join(',')
        });
        _t.betlist.push({
            "name": _val.split("|")[0],
            "title": _val.split("|")[1] + "(" + strArr.join(',') + ")",
            "odds": _val.split("|")[2]
        });
    }
    /* 合肖 */
    if (_t.hexiaoConfirmList.length != 0) {
        _t.selhexiaoData.forEach(n => {
            if (n !== undefined) {
                _t.bet.push({
                    "name": n.id,
                    "value": _t.moneys,
                    "content": _t.hexiaoConfirmList.join(',')
                });
                _t.betlist.push({
                    "name": n.id,
                    "title": n.title + "(" + _t.hexiaoConfirmList.join(',') + ")",
                    "odds": n.odds
                });
            }
        })
    }


    /* 自选不中 */
    let zixuanbuzhongSel = _t.zixuanbuzhongSel;
    let zixuanbuzhongList = _t.zixuanbuzhongList;
    for (var i = 0; i < zixuanbuzhongSel.length; i++) {
        let _name = zixuanbuzhongSel[i].getAttribute("data-value");
        let _val = zixuanbuzhongSel[i].getAttribute("data-item"); //
        let strArr = [];
        for (var j = 0; j < zixuanbuzhongList.length; j++) {
            strArr.push(zixuanbuzhongList[j].getAttribute("data-item").split("|")[1]);
        }
        _t.bet.push({
            "name": _name,
            "value": _t.moneys,
            "content": strArr.join(',')
        });
        _t.betlist.push({
            "name": _val.split("|")[0] + " ",
            "title": _val.split("|")[1] + "(" + strArr.join(',') + ")",
            "odds": _val.split("|")[2]
        });
    }
    /* 连尾 */
    let lianweiSel = _t.lianweiSel;
    let lianweiList = _t.lianweiList;
    for (var i = 0; i < lianweiSel.length; i++) {
        let _name = lianweiSel[i].getAttribute("data-value");
        let _val = lianweiSel[i].getAttribute("data-item"); //
        let strArr = [];
        for (var j = 0; j < lianweiList.length; j++) {
            strArr.push(lianweiList[j].getAttribute("data-item").split("|")[1].split('尾')[1]);
        }
        _t.bet.push({
            "name": _name,
            "value": _t.moneys,
            "content": strArr.join(',')
        });
        _t.betlist.push({
            "name": _val.split("|")[0] + " ",
            "title": _val.split("|")[1] + "(" + strArr.join(',') + ")",
            "odds": _val.split("|")[2]
        });
    }

    /* 连肖 */
    let lianxiaoSel = _t.lianxiaoSel;
    let lianxiaoList = _t.lianxiaoList;

    for (var i = 0; i < lianxiaoSel.length; i++) {
        let _name = lianxiaoSel[i].getAttribute("data-value");
        let _val = lianxiaoSel[i].getAttribute("data-item"); //
        let strArr = [];
        for (var j = 0; j < lianxiaoList.length; j++) {
            strArr.push(lianxiaoList[j].getAttribute("data-item").split("|")[1]);
        }
        _t.bet.push({
            "name": _name,
            "value": _t.moneys,
            "content": strArr.join(',')
        });
        _t.betlist.push({
            "name": _val.split("|")[0] + " ",
            "title": _val.split("|")[1].split('@')[0] + "(" + strArr.join(',') + ")",
            "odds": _val.split("|")[2]
        });
    }


    _t.allmoney = allDom.length * _t.moneys;
    let betlistLength = _t.betlist.length;
    //11选五连码增加一个选中注
    if (_t.lianmaSum != null && _t.lianmaSum > 0) {
        betlistLength += _t.lianmaSum;
    }

    //11选五直选的注数加上去
    if (_t.zhixuanSum != null && _t.zhixuanSum > 0) {
        betlistLength += _t.zhixuanSum;
    }

    if (betlistLength <= 0 || _t.moneys == 0 || _t.moneys == "") {
        _t.plainalert("金额或者注数不能为空!");
        _t._emptyData(); //防止叠加金额
        return;
    }

    var _list = "";
    var _alla = _t.betlist;
    for (var i = 0; i < _alla.length; i++) { // + 'X' + _t.codeArr.length
        if (_alla[i].name === '选择类型') {
            _list += "<div class='_diodds'>【" + _alla[i].name + " - " + _alla[i].title + "】<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@" + _alla[i].odds + " x " + _t.moneys + " x " + _t.codeArr.length + "</div>";
        } else {
            _list += "<div class='_diodds'>【" + _alla[i].name + " - " + _alla[i].title + "】<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@" + _alla[i].odds + " x " + _t.moneys + "</div>";
        }
    }
    let totalNum, totalMoeny;
    totalMoeny = parseFloat(_t.allmoney);
    if (_t.codeArr.length > 0) {
        totalMoeny = totalMoeny + parseFloat(_t.codeArr.length * _t.moneys);
    }
    if (_t.wubuzhongArr.length > 0) {
        totalMoeny = totalMoeny + parseFloat(_t.moneys);
    }
    if (_t.hexiaoNum === 1) {
        totalMoeny = totalMoeny + parseFloat(_t.moneys);
    }
    if (_t.lianweiNum === 1) {
        totalMoeny = totalMoeny + parseFloat(_t.moneys);
    }
    if (_t.lianxiaoNum === 1) {
        totalMoeny = totalMoeny + parseFloat(_t.moneys);
    }

    //11选五连码增加金额2
    if (_t.lianmaSum != null && _t.lianmaSum > 0) {
        totalMoeny += _t.moneys * _t.lianmaSum;
    }

    // 	else
    // 	{
    // 		if(_t.wubuzhongArr.length > 0) {
    // 			totalMoeny = parseFloat(_t.allmoney) + parseFloat(_t.moneys);
    // 		}else {
    // 			totalMoeny = _t.allmoney;
    // 		}
    // 	}
    if (_t.htmlList != null && _t.htmlList.length > 0) {
        _list += _t.htmlList;
    }

    totalNum = _alla.length;
    if (_t.lianmaSum != null && _t.lianmaSum > 0) {
        totalNum += _t.lianmaSum;
    }
    if (_t.zhixuanSum != null && _t.zhixuanSum > 0) {
        totalNum += _t.zhixuanSum;
        totalMoeny += _t.moneys * _t.zhixuanSum;
    }

    var _htmls = "<div class='_dioframe'>" +
        "<div class='_dioframediv'><div class='_dioframescroll'>" + _list + "</div></div>" +
        "<div class='_dioframeflex'>" +
        "<div>【合计】总注数： <span class='t-blue'>" + totalNum + " 注</span></div>" +
        "<div>【合计】总金额： <span class='t-blue'>" + totalMoeny + " 元</span></div>" +
        "</div>" +
        "</div>";

    layer.open({ //询问框
        title: [
            '下注清单',
            'background-color:#cd0005; color:#fff;height: 50px;line-height: 50px;',
        ],
        content: _htmls,
        btn: ['确认', '取消'],
        shadeClose: false,
        yes: function(index) {
            _t._betformdata();
            layer.close(index);
        },
    });
};
//开启直播
window._commonShowLive = function(_t) {
    _t.live_on = true;
    _t.data_live = "<iframe style='width:100%;height:100%;border:none;' src='" + _t.info.video + "'></iframe>";
    _t._setheight();
    setTimeout(function() { //由于初始标签并不存在,给他一个延时
        let _domLive = document.getElementById("iframe-close");
        _domLive.addEventListener("click", function(e) { //监听click事件
            _t.live_on = false;
            _t.data_live = '';
            _t._setheight();
        });
    }, 60);
};
//提交投注
window._commonBetformdata = function(_t, _url) {
    if (!localStorage.getItem("sessionkey")) {
        _t.gotologin("必须登录才能下单!"); //去登录界面
        return;
    }
    if (_t.timefeng <= 0) {
        _t.plainalert("已封盘,不能下注!");
        return;
    }
    if (_t.iscoin == 0) { //如果金额等于0,跳转充值
        _t.gorecharge('您的金额不足,请充值!', '前去充值');
        return;
    }
    var _data = {
        id: _t.id,
        number: _t.next_lottery.number,
        bet: JSON.stringify(_t.bet),
    };
    $api.$post(_url, _data).then((res) => {
        _t.infotips('投注成功!'); //信息提示弹框
        _t._reset(); //重置界面
        _t.iscoin = res.data.data.coin;
        localStorage.setItem("coin", res.data.data.coin);
    });
};
//设置滚动区域高度
window._commonSetHeight = function() {
    var _c = window.innerHeight;
    var _h = document.querySelector(".header").offsetHeight;
    var _b = document.querySelector(".bet-top").offsetHeight;
    var _f = document.querySelector(".bet_pt").offsetHeight;
    document.querySelector(".bet-box").style.height = (_c - _h - _b - _f) + "px";
};
//渲染的数据
window._commonRenderData = function(_t, res, _index) {
    if (_index == 1 || _index == 3) { //初始化渲染
        localStorage.setItem("coin", res.data.data.coin);
        _t.game = res.data.data.game;
        _t.menu_list = res.data.data.menu;
        _t.info = res.data.data.info;
        if (localStorage.getItem("sessionkey")) { //登录才有金额显示
            _t.iscoin = res.data.data.coin;
        }
    }
    if (_t.id == 88 && !res.data.data.game) { //5分六合彩并且非小型接口
        _t.last_lottery = {
            "time": res.data.data.last_lottery.time,
            "number": res.data.data.last_lottery.number,
            "action": 0,
            "content": [],
            "content2": ["正", "在", "开", "奖", "中", "!"]
        };
        clearTimeout(_t.delay10S);
        _t.delay10S = setTimeout(() => {
            _t.last_lottery = res.data.data.last_lottery;
        }, 1000 * 10);
    } else {
        _t.last_lottery = res.data.data.last_lottery;
    }
    _t.next_lottery = res.data.data.next_lottery;
    if (_index != 3) {
        _t._timeset(); //计算倒计时
    }
    _t._setheight(); //设置滚动高度
    _t._resize(); //动态计算滚动高度
};
//查询开奖之后投注金额结算
window._commonGetMoneySum = function(_t, _url) {
    $api.$post(_url).then((res) => {
        _t.iscoin = res.data.data.coin;
        localStorage.setItem("coin", res.data.data.coin);
    });
};
//下一期开奖号码获取
window._commonInitdataNext = function(_t, _url) {
    clearTimeout(_t.getopensum);
    _t.getopensum = setTimeout(() => {
        $api.$post(_url, { type: _t.id }).then((res) => {
            _t._renderdata(res, 2); //渲染视图数据
            if (res.data.data.is_open == 1) { //开奖
                clearTimeout(_t.getopensum);
                if (localStorage.getItem("sessionkey")) { //登录才有金额显示
                    clearTimeout(_t.getmoneySum);
                    _t.getmoneySum = setTimeout(() => { //10秒之后刷新金额
                        _t._getmoneySum(); //查询余额
                    }, 1000 * 10);
                }
            } else {
                _t._initdatanext(); //计算倒计时
            }
        });
    }, 5000);
};
//重置所有选中
window._commonReset = function(_t) {
    var _alldom = document.querySelectorAll(".flex-box-sc .bet-choose"); //获取所有选中标签
    var _alldom2 = document.querySelectorAll(".flex-box-lm .bet-choose2"); //获取所有选中标签
    var _alldom3 = document.querySelectorAll(".flex-box-zx .bet-choose3"); //获取所有选中标签
    for (var i = 0; i < _alldom.length; i++) {
        _alldom[i].className = "flex-html"; //切换按钮样式 //写逻辑
    }
    for (var i = 0; i < _alldom2.length; i++) {
        _alldom2[i].className = "flex-html"; //切换按钮样式 //写逻辑
    }
    for (var i = 0; i < _alldom3.length; i++) {
        _alldom3[i].className = "flex-html"; //切换按钮样式 //写逻辑
    }

    //11选5 连码的重置
    if (_alldom2.length > 0) {
        _t.lian_ma_id = [];
        _t.lian_ma_number = [];
        _t.lianMaSelectNumberList = [];
        _t.lianmaSum = 0; //连码一共多少注
        _t.lastCurrentTarget = {}; //存放连码上一次选中的dom元素
    }

    //11选5 直选的重置
    if (_alldom3.length > 0) {
        _t.zhi_xuan_id = [];
        _t.zhi_xuan_number = [];
        _t.zhiXuanNumberList = [];
        _t.zhiXuanSelectNumberList = []; //记录直选选择号码的数组
        _t.firstBallArr = []; //直选第一个球
        _t.secondBallArr = []; //直选第二个球
        _t.thirdBallArr = []; //直选第三个球
        _t.zhixuanSum = []; //直选一共有多少注
        _t.lastCurrentTarget2 = {}; //存放直选上一次选中的dom元素
    }

    //  //11选5 从第一球到第五球的状态清除
    _t.firstBallList = [];
    _t.secondBallList = [];
    _t.thirdBallList = [];
    _t.fourthBallList = [];
    _t.fifthBallList = [];

    var _checkallSelfDom = document.querySelectorAll(".flex-box-sc .seltype-choose");
    var _checkallSelfheadDom = document.querySelectorAll(".flex-box-sc .seltype-head");
    for (var i = 0; i < _checkallSelfDom.length; i++) {
        _checkallSelfDom[i].className = "flex-html"; //切换按钮样式 //写逻辑
    }
    for (var i = 0; i < _checkallSelfheadDom.length; i++) {
        _checkallSelfheadDom[i].className = "flex-html"; //切换按钮样式 //写逻辑
    }
    _t.checkallDom = []; //获取所有选中标签
    _t.checkallSelfDom = [];
    _t.checkallSelfheadDom = [];
    _t.zixuanbuzhongSel = [];
    _t.zixuanbuzhongList = [];
    _t.codeArr = [];
    _t.wubuzhongArr = [];
    _t.wubuzhongNum = 0;
    _t.lianweiSel = [];
    _t.lianweiList = [];
    _t.lianweiArr = [];
    _t.lianweiNum = 0;
    _t.lianxiaoSel = [];
    _t.lianxiaoList = [];
    _t.lianxiaoArr = [];
    _t.hexiaoConfirmList = [];
    _t.lianxiaoNum = 0;
    _t.hexiaoNum = 0;
    _t.moneys = "";
    _t._emptyData(); //防止叠加金额
};
//清空金额和列表
window._commonEmptyData = function(_t) {
    _t.allmoney = 0;
    _t.betlist = [];
    _t.bet = [];
};
//返回上一页
window._commonGoHome = function() {
    localStorage.setItem("gameid", "");
    localStorage.setItem("typeid", "");
    window.history.back(-1);
};
//动画切换
window._commonChangeTab = function(_t) {
    _t.ctab = !_t.ctab;
    if (_t.ctab == true) {
        document.querySelector('.gamemenu').style.right = '0';
    } else {
        document.querySelector('.gamemenu').style.right = '-242px';
    }
};
//切换玩法
window._commonCheckMenu = function(_t, _index) {
    _t.menuindex = _index;
    document.querySelector(".bet-box-fr").scrollTop = 0;
};
//检测屏幕变化,高度变化
window._commonResize = function(_t) {
    window.onresize = () => {
        _t._setheight();
    };
};
/*--------axios封装接口---------*/
import { $api } from './axios/api';

window.$api = $api;
window._count = 0; //接口报错之后继续请求
window._nowTimes = 0; //服务器时间
window._typeid = {
    1: "pkclass", //pk类
    2: "pcddclass", //pcdd类
    3: "timeclass", //时时彩类
    4: "kuai3class", //快3类
    5: "xyncclass", //幸运农场类
    6: "sixlottery", //香港6喝彩
    7: "gd11x5", //11选5
};
window._typeArr = {
    1: [81, 50, 72, 55, 97], //pk类
    2: [66, 71, 90], //pcdd类
    3: [1, 73, 80, 98], //时时彩类
    4: [10, 75, 76, 77, 78, 79, 96], //快3类
    5: [61], //幸运农场类
    6: [70, 88], //香港6喝彩
    7: [4, 9, 11, 12] //广东,江西，极速，广西  (11选5)
};
/*----------------------*/
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
//路由跳转拦截
router.beforeEach((to, from, next) => {
    if (to.meta.islogin == true) { //验证是否需要登陆
        if (!localStorage.getItem("sessionkey")) { //是否存在登录信息
            next({
                path: '/login', //未登录则跳转至login页面
            });
        } else if (to.path == "/bank/withdraw") { //如果是提款密码路由
            if (localStorage.getItem("isCoinPassword") == "0" || !localStorage.getItem("isCoinPassword")) { //不存在提款密码
                next({
                    path: '/fundpwd', //先需要设置提款密码
                });
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        next();
    }
});