import axios from 'axios';
import router from "../router";
/*--------------------------------------*/
/*
 * 线路检测模式
 * 在3秒内检测线路连续检测线路
 * 初始化显示第一条(退出之后下一次进入保持记录上一次退出的url地址)
 * */
var _Network = [
    "https://api.tiantianzhong888.com", //首次进入地址
    "https://api.zjsdx.com",
    "https://kpi.tiantianzhong888.com",
    "https://cdn.tiantianzhong888.com",
    "https://dj.tiantianzhong888.com"
];
//拿cdn接口路径
var XHR_URL = new XMLHttpRequest();
XHR_URL.open("GET", "https://apittzhong.oss-cn-hongkong.aliyuncs.com/api.json?t=" + new Date().getTime(), true);
XHR_URL.timeout = 9000;
XHR_URL.ontimeout = function() {
    console.log("网络超时!");
};
XHR_URL.send(null);
XHR_URL.onload = function() {
    if ((XHR_URL.status >= 200 && XHR_URL.status < 300) || XHR_URL.status == 304) {
        _Network = JSON.parse(XHR_URL.response).Hosts;
    } else {
        console.log("网络超时!");
    }
};

var timeouts = 9000;
window.URL_BASE = _Network[0]; //天天中测试(初始化设置一个默认配置)(当网络报错的时候才给他切换线路选择)
/*-------------始终选择上一次线路网络--------------*/
if (!localStorage.getItem('NETURL')) { //不存在url地址
    localStorage.setItem("NETURL", window.URL_BASE);
} else {
    window.URL_BASE = localStorage.getItem('NETURL');
}
/*--------------------------------------*/
//类似jq添加class
function addClass(ele, cName) { //类似jq添加class
    var arr = ele.className.split(' ').concat(cName.split(" "));
    for (var i = 0; i < arr.length; i++) {
        for (var k = arr.length - 1; k > i; k--) {
            (arr[k] === "") && arr.splice(k, 1);
            (arr[i] === arr[k]) && arr.splice(k, 1);
        }
    }
    ele.className = arr.join(" ");
}
//类似jq删除class
function removeClass(ele, cName) { //类似jq删除class
    var arr1 = ele.className.split(' ');
    var arr2 = cName.split(" ");
    for (var i = 0; i < arr2.length; i++)
        for (var j = arr1.length - 1; j >= 0; j--)(arr2[i] === arr1[j]) && arr1.splice(j, 1);
    ele.className = arr1.join(" ");
}
//创建xmlhttp协议
function getXMLHttpRequest() {
    var xhr;
    if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = null;
    }
    return xhr;
}
//发起http请求
function ajaxHttp() {
    for (var i = 0; i < _Network.length; i++) {
        (function(m) {
            var fisrtTime = new Date().getTime();
            var xhr = getXMLHttpRequest();
            xhr.open("GET", _Network[m] + "/api/ajax/cayeminzwgr?hello=Xcmoaekj4mlfa8fawe&t=" + new Date().getTime(), true);
            xhr.send(null);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var _c = new Date().getTime() - fisrtTime;
                    window._arrPing[m].push(_c);
                } else {
                    window._arrPing[m].push(null);
                }
            };
        })(i);
    }
}
//处理数据和整理ping值,整理成列表
window.checkLine = function() {
    window._arrPing = []; //承载ping值数组
    for (var i = 0; i < _Network.length; i++) {
        window._arrPing.push([]);
    }
    ajaxHttp(); //初始化
    var _ajaxTimes = null;
    var _countSum = 0;
    clearInterval(_ajaxTimes);
    _ajaxTimes = setInterval(() => {
        _countSum++;
        if (_countSum > 5) { //不管成不成功都断掉
            clearInterval(_ajaxTimes);
            var _N_arr = []; //承载筛选数字类型
            for (var i = 0; i < window._arrPing.length; i++) {
                _N_arr.push([]);
            }

            for (var i = 0; i < window._arrPing.length; i++) {
                for (var j = 0; j < window._arrPing[i].length; j++) {
                    if (window._arrPing[i][j] != null) { //非空
                        _N_arr[i].push(window._arrPing[i][j]);
                    }
                }
            }

            var _N2_arr = []; //承载实际ping的平均值
            for (var i = 0; i < _N_arr.length; i++) {
                if (_N_arr[i] == 0) { //不存在集合
                    _N2_arr.push(null);
                } else {
                    var _couns = 0;
                    for (var j = 0; j < _N_arr[i].length; j++) {
                        _couns += Number(_N_arr[i][j]);
                    }
                    _N2_arr.push(Math.floor(_couns / _N_arr[i].length)); //平均值向上取整
                }
            }

            (function(_arr) {
                var _htmls = '<div class="_xiandiv"><ul class="_xianul">';
                for (var i = 0; i < _arr.length; i++) {
                    var _br = _arr[i];
                    var _arrX_G = '_xian_G';
                    var _arrT_T = '良好';
                    if (_br > 300) { //黄色信号
                        _arrX_G = '_xian_H';
                        _arrT_T = '较差';
                    }
                    if (_br == null) { //红色是彻底没戏(稀烂的网络)
                        _br = '---';
                        _arrX_G = '_xian_R';
                        _arrT_T = '稀烂';
                    }
                    if (localStorage.getItem('NETURL') == _Network[i]) { //与缓存的一样就显示高亮
                        _htmls += "<li class='_xianli _curGRH'>" +
                            "<span class='_xians0'>✔</span>" +
                            "<span class='_xians1'>线路" + (i + 1) + "</span>" +
                            "<span class='_xians2'>ping : " + _br + "</span>" +
                            "<span class='_xians3'><i class='" + _arrX_G + "'></i></span>" +
                            "<span class='_xians4'>" + _arrT_T + "</span>" +
                            "</li>";
                    } else {
                        _htmls += "<li class='_xianli'>" +
                            "<span class='_xians0'></span>" +
                            "<span class='_xians1'>线路" + (i + 1) + "</span>" +
                            "<span class='_xians2'>ping : " + _br + "</span>" +
                            "<span class='_xians3'><i class='" + _arrX_G + "'></i></span>" +
                            "<span class='_xians4'>" + _arrT_T + "</span>" +
                            "</li>";
                    }
                }
                _htmls += "</ul></div><span class='_errinfoT'>" +
                    "<b style='font-size: 2rem;font-weight: 700;color: #027be3'>✔</b> 代表当前网络,可以切换到其他网络!</span>";
                layer.open({ //询问框
                    title: [
                        '当前网络不稳定<br>请手动切换网络 !',
                        'background-color:#cd0005; color:#fff;height: 50px;line-height: 25px;',
                    ],
                    content: _htmls,
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function(index) {
                        var _checkDom = document.querySelectorAll('._xianli');
                        for (var n = 0; n < _checkDom.length; n++) {
                            if (_checkDom[n].className.indexOf('_curGRH') > -1) { //获取选择的下标元素
                                localStorage.setItem("NETURL", _Network[n]); //缓存这个网络线路
                                window.URL_BASE = localStorage.getItem('NETURL');
                                router.go(0); //刷新当前页面
                            }
                        }
                        layer.close(index);
                        layer.closeAll('loading'); //关闭loading
                    },
                    no: function() {
                        layer.closeAll(); //关闭loading
                    },
                });
                var _allDom = parent.document.querySelectorAll('._xianli');
                for (var i = 0; i < _allDom.length; i++) {
                    (function(m) {
                        _allDom[m].onclick = function() { //每个绑定click事件
                            for (var k = 0; k < _allDom.length; k++) { //删除所有高亮class
                                document.querySelectorAll("._xians0")[k].innerHTML = "";
                                removeClass(_allDom[k], '_curGRH');
                            }
                            document.querySelectorAll("._xians0")[m].innerHTML = "✔";
                            addClass(_allDom[m], '_curGRH'); //添加当前高亮class
                        };
                    })(i);
                }
            })(_N2_arr); //最终ping平均值
        } else {
            ajaxHttp(); //继续请求
        }
    }, 501);
};
/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(
    (config) => {
        //全局弹框限制(这几个弹框之外其他都需要)
        if (config.name == "Api/Ajax/get_code" || config.name == "Api/Ajax/avatar" || config.name == 'Api/user/upthumb' ||
            config.name == "Api/Ajax/lottery_time" || config.name == 'api/user/message' || config.name == "/Api/User/updateUser" ||
            config.name == 'Api/Ajax/index' || config.method == "get") {} else {
            Vue.prototype.isloading("加载中"); //加载中
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });
/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(
    (res) => {
        window.showdisabled = false; //允许继续点击充值下一步
        if (res.data.code == '404') { //网站关闭
            router.push("/404page"); //在内部this的话就直接router跳转路由就行
            return Promise.reject(res.data.msg);
        }
        if (res.data.code == '401') { //真的出错就刷新页面
            layer.open({
                content: '请求超时,请刷新!',
                btn: '确定',
                shadeClose: false,
                yes: function(index) {
                    router.push("/"); //在内部this的话就直接router跳转路由就行
                    layer.closeAll('loading'); //关闭loading
                },
            });
            return Promise.reject("请求超时,请刷新!");
        }
        window._count = 0; //正常就结束报错循环
        return res; //继续返回
    },
    (error) => { //报错再次请求接口
        window.showdisabled = false; //允许继续点击充值下一步
        var _config = error.config;
        //充值,提款,投注只允许执行一次
        if (_config.name) { //边开时间接口报错
            if (_config.name.indexOf("/pay/apipay") > -1) { //存在这个接口
                window._count = 0;
                Vue.prototype.plainalert("网络错误,请求失败!");
                return Promise.reject("稀烂的网络!!");
            }
            if (_config.name == 'Api/Bank/rengongHandle' || _config.name == "Api/bank/withdrawHandle" || _config.name == "Api/Ajax/bet_request") {
                window._count = 0;
                Vue.prototype.plainalert("网络错误,请求失败!");
                return Promise.reject("稀烂的网络!!");
            }
        }
        window._count++;
        if (window._count > 2) { //网络真的稀烂才进这里
            window._count = 0;
            checkLine();
            return Promise.reject("请求三次,网络掉坑!");
        } else {
            var backoff = new Promise(function(resolve) {
                setTimeout(function() {
                    resolve();
                }, 500);
            });
            return backoff.then(function() {
                return axios(_config);
            });
        }
    });
/**
 * 请求发出后检查返回的状态码,统一捕获正确和错误的状态码，res,错误就自定义一个返回对象
 * @param {object} res 响应对象
 * @return {object} 响应正常就返回响应数据否则返回错误信息
 **/
function checkStatus(res) {
    if (res.data.code == 200) { //成功
        if (res.config.name == "Api/Ajax/check_sign") { //注册接口
            Vue.prototype.checkin("注册成功!");
        } else if (res.config.name == "Api/Ajax/check_login") { //登录
            Vue.prototype.checkin("登录成功!");
        } else if (res.config.name == "Api/Ajax/lottery_time" || res.config.name == "Api/Ajax/get_code") { //这两个是不需要关闭弹框
        } else {
            if (res.config.name === "api/user/message") {
                layer.closeAll('loadingHome');
            } else {
                layer.closeAll('loading'); //关闭loading
            }
        }
        return res; //继续返回
    } else if (res.data.code == 300 || res.data.code == 501 || res.data.code == 400) {
        Vue.prototype.checkOut(res.data.msg);
        return Promise.reject(res.data.msg);
    } else { //其他错误
        var _path = router.currentRoute.path; //获取当前路由地址
        if (_path == "/login" || _path == '/register') { //登录和注册,验证码需要重新请求,单独处理
            return res; //继续返回
        } else { //一般报错
            Vue.prototype.plainalert(res.data.msg);
            return Promise.reject(res.data.msg);
        }
    }
}
//设置时间系统时间(尽量比实际多一点)
function timer(Times) {
    window._nowTimes = Times;
    var _init = parseInt(new Date() / 1000, 10);
    var _diff = 0;
    var _intTime = null;
    clearInterval(_intTime);
    _intTime = setInterval(function() {
        _diff = parseInt(new Date() / 1000, 10) - _init;
        window._nowTimes = _diff + Times;
    }, 501);
}
//参数格式拼接
function _senddata(data) {
    let ret = '';
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    if (ret) {
        ret = ret.substr(0, ret.length - 1);
    }
    return ret;
}
//获取时间
function _$getTime() {
    return new Promise(function(resolve, reject) {
        axios({
            method: "GET",
            baseURL: URL_BASE + "/api/ajax/cayeminzwgr?hello=Xcmoaekj4mlfa8fawe&t=" + new Date().getTime(), //防止ie缓存
            timeout: 3000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;',
            },
        }).then((res) => {
            timer(res.data); //初始化执行一次
            resolve();
        });
    });
}
//接口控制器
function _$httpAjax(_url, _data, _index) {
    switch (_index) {
        case 1:
            return new Promise(function(resolve, reject) { //other
                axios({
                    url: _url,
                    name: _url,
                    method: "POST",
                    data: _senddata(_data),
                    baseURL: URL_BASE,
                    timeout: timeouts,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;',
                        'token': _enc(),
                    },
                }).then((res) => {
                    resolve(checkStatus(res));
                });
            });
        case 2:
            return new Promise(function(resolve, reject) { //post
                axios({
                    url: _url,
                    name: _url,
                    method: "POST",
                    data: _senddata(_data),
                    baseURL: URL_BASE,
                    timeout: timeouts,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;',
                        'uid': localStorage.getItem("uid"),
                        "sessionkey": localStorage.getItem("sessionkey"),
                        'token': _enc(),
                    },
                }).then((res) => {
                    resolve(checkStatus(res));
                });
            });
        case 3:
            return new Promise(function(resolve, reject) { //rengong
                axios({
                    name: _url,
                    method: "POST",
                    data: _senddata(_data),
                    baseURL: _url,
                    timeout: timeouts,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;',
                        'uid': localStorage.getItem("uid"),
                        "sessionkey": localStorage.getItem("sessionkey"),
                        'token': _enc(),
                    },
                }).then((res) => {
                    resolve(checkStatus(res));
                });
            });
    }
}
//封装接口普通接口请求（不需要验证）
//通用接口api查询方法
export const $api = {
    $other(_url, _data) { //一般接口不需要uid和验证也可以查看
        if (!window._nowTimes) { //不存在时间
            return _$getTime().then((res) => { //执行返回函数
                return _$httpAjax(_url, _data, 1);
            });
        } else {
            return _$httpAjax(_url, _data, 1);
        }
    },
    $post(_url, _data) {
        if (!window._nowTimes) { //不存在时间
            return _$getTime().then((res) => { //执行返回函数
                return _$httpAjax(_url, _data, 2);
            });
        } else {
            return _$httpAjax(_url, _data, 2);
        }
    },
    $rengong(_url, _data) { //其他支付方式
        if (!window._nowTimes) { //不存在时间-
            return _$getTime().then((res) => { //执行返回函数
                return _$httpAjax(_url, _data, 3);
            });
        } else {
            return _$httpAjax(_url, _data, 3);
        }
    },
};
//
Vue.prototype.checkin = function(msg) { //登入成功
    layer.open({
        content: msg,
        btn: '确定',
        shadeClose: false,
        yes: function(index) {
            router.push("/"); //在内部this的话就直接router跳转路由就行
            layer.closeAll('loading'); //关闭loading
        },
    });
};
Vue.prototype.checkOut = function(msg) { //退出或者超过会话期,或者被他人挤下线
    Vue.prototype.clearLocalStorage();
    let _html = `<div style = 'position: relative; z-index: 99999999;'><div style = 'pointer-events: auto;position: fixed; left: 0; top: 0; width: 100%; height: 100%;box-sizing: content-box;'></div>
		<div style = 'background-color: rgba(0, 0, 0, .4);display: table;pointer-events: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;box-sizing: content-box;z-index: 100;'>
			<div style = 'display: table-cell;    vertical-align: middle;text-align: center;box-sizing: content-box;'>
				<div style = 'width: 90%;max-width: 640px;position: relative;display: inline-block;text-align: left;background-color: #fff;font-size: 14px;border-radius: 5px;box-shadow: 0 0 8px rgba(0, 0, 0, .1);pointer-events: auto;animation-fill-mode: both;animation-duration: .2s;    box-sizing: content-box; z-index: 10;'>
					<div style = 'padding: 50px 30px;line-height: 22px;text-align: center;box-sizing: content-box;'>${msg}</div>
					<div style ='display: flex;    width: 100%;height: 50px;line-height: 50px;font-size: 0;    border-top: 1px solid #D0D0D0;background-color: #F2F2F2;position: relative;text-align: center;    border-radius: 0 0 5px 5px;box-sizing: content-box;'>
						<span id='emmmkkkk' style = '    color: #0000ff;display: block;box-flex: 1;    -webkit-box-flex: 1;moz-box-flex: 1;width: 20%;-webkit-flex: 1;-ms-flex: 1;    flex: 1;font-size: 14px;cursor: pointer;    position: relative;text-align: center;border-radius: 0 0 5px 5px;    text-overflow: ellipsis;    overflow: hidden;white-space: nowrap;box-sizing: content-box;'>确定</span>
					</div>
				</div>
			</div>
		</div>
	</div>`;
    document.getElementById('emmm').innerHTML = _html;
    document.getElementById('emmmkkkk').onclick = function() {
        document.getElementById('emmm').innerHTML = "";
        router.push("/login");
    }
};
Vue.prototype.gotologin = function(msg) { //投注之前校验是否登录状态提示
    layer.open({ //询问框
        content: msg,
        btn: ['登陆', '取消'],
        shadeClose: false,
        yes: function(index) {
            router.push("/login");
            layer.close(index);
        },
    });
};
Vue.prototype.gorecharge = function(m1, m2) { //投注之前校验金额是否大于0,否则就前往充值页面
    layer.open({
        content: m1,
        btn: m2,
        shadeClose: false,
        yes: function(index) {
            router.push('/bank/deposit'); //前往充值
            layer.close(index);
        },
    });
};