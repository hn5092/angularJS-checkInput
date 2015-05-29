/**
 * create by imad.x
 * email:100650920@qq.com
 */
var app = angular.module('plunker', []);
function createDirective() {
    return function () {
        return {
            restrict: 'A',
            compile: function (tElem, tAttrs) {
                console.log(tElem);
                console.log(tAttrs);
                //console.log(tAttrs.isright);
                ////console.log(name + ': compile => ' + tElem.html());
                ////console.log($a.attr(name));


                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs) {
                        //初始化参数
                        var flag = 0;
                        var message = ""; //用来返回不符合操作时候的提示信息
                        var warn = [];
                        var name = ""; //获取这个input 的名字
                        var len = 0;//初始化判断的字符串长度
                        var property = [];//初始化条件集合
                        var propertyFlags = [];//记录每个属性的值是否满足要求
                        var group = [];
                        var vo = "";
                        ////console.log($(iElem['0']));
                        //绑定事件 当键盘弹起的时候 开始监听内容
                        scope.check = function () {
                            message = "";
                            vo = iElem[0].value; // 得到input框的值
                            ////console.log("这是值" + iElem[0]['value']);
                            ////console.log(propertyFlags);
                            ////console.log(property);
                            //开始循环遍历 所有的属性
                            for (var index in property) {
                                //判断字符
                                var functionName = 'check' + property[index];
                                ////console.log("functionName" + functionName);
                                //////console.log(check_main[functionName]);
                                if (check_main[functionName](vo)) {
                                    propertyFlags[index] = true;
                                } else {
                                    propertyFlags[index] = false;
                                }
                            }
                            //判断字符长度
                            if (len != 0) {
                                ////console.log("这是长度"+vo.length);
                                if (vo.length > len) {
                                    ////console.log("判断长度false");
                                    propertyFlags[property.length] = false;
                                    //控制是否满足条件
                                    ////console.log($(iElem[0]['nextElementSibling']));
                                } else {
                                    ////console.log("判断长度true");
                                    propertyFlags[property.length] = true;
                                }
                            }
                            //判断完成之后检查不满足几个条件  显示出不满足的条件
                            ////console.log("message"+message);
                            if (isPropertyFlags()) {
                                if (iElem[0]['nextElementSibling'] != null) {
                                    //满足条件的话 删除样式
                                    iElem[0]['style']['color'] = "";
                                    $(iElem[0]['nextElementSibling']).remove(); //删除提示信息
                                }
                            } else {
                                //添加不满足条件时候显示的提示信息
                                iElem[0]['style']['color'] = "red";
                                //如果提示信息为空的话,添加提示信息

                                if (iElem[0]['nextElementSibling'] == null) {
                                    iElem.parent().append("<span style='color:red' >" + message + "</span>");
                                }
                            }
                            ////console.log(scope.rs());
                            //console.log(scope.flags);
                            ////console.log("结果是"+scope.rs(2));

                            scope.$apply();
                        };


                        /**
                         * 检测每一次输入之后是否满足所需的条件
                         */
                        var isPropertyFlags = function () {
                            var isTrue = true;
                            for (var index in propertyFlags) {
                                if (!propertyFlags[index]) {
                                    message = message + warn[index] + " ";
                                    isTrue = false;
                                }
                            }
                            scope.flags[flag] = isTrue;
                            return isTrue;
                        };
                        /**
                         * 用来判断值的格式是否正确
                         * @type {{checkW: Function, checkN: Function}}
                         */
                        var check_main = {
                            /**
                             * 判断是否为字符
                             * @param vo
                             */
                            checkW: function (vo) {
                                var reg = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;
                                if (reg.test(vo)) {
                                    return true;
                                }
                                return false;


                            },
                            /**
                             * 判断是否为数字
                             * 其中DN为double
                             * IN为integer
                             * @param vo
                             */
                            checkDN: function (vo) {
                                var reg = /^[1-9][0-9]*.[0-9]+$|^[1-9][0-9]*$/;
                                if (reg.test(vo)) {
                                    return true;
                                }
                                return false;
                            },
                            checkIN: function (vo) {
                                var reg = /^[1-9][0-9]*$/;
                                if (reg.test(vo)) {
                                    return true;
                                }
                                return false;
                            },
                            checkNN: function (vo) {
                                if (vo == null || vo.trim() == "") {
                                    ////console.log("进入NN值" + vo);
                                    return false;
                                } else {
                                    ////console.log("进入NN值错误" + vo);
                                    return true;
                                }
                            }

                        };


                        /**
                         *对分组信息进行整理,最终得到每一个组对应的是哪几个input框
                         */
                        if (scope.groupByGroup == null) {
                            scope.groupByGroup = function () {
                                for (var i in scope.groupInfo) {//得到数组  1 : 1 2 3

                                    for (var index in scope.groupInfo[i]) { //遍历 1 2 3
                                        if (scope.groupByGroupInfo[scope.groupInfo[i][index]] == null) {
                                            scope.groupByGroupInfo[scope.groupInfo[i][index]] = [];
                                            scope.groupByGroupInfo[scope.groupInfo[i][index]][0] = i;
                                        } else {
                                            //模拟set
                                            var isContain = true;
                                            for (var d in scope.groupByGroupInfo[scope.groupInfo[i][index]]) {
                                                if (scope.groupByGroupInfo[scope.groupInfo[i][index]][d] == i) {
                                                    isContain = false;
                                                    break;
                                                }
                                            }
                                            if (isContain) {
                                                scope.groupByGroupInfo[scope.groupInfo[i][index]][scope.groupByGroupInfo[scope.groupInfo[i][index]].length] = i;
                                            }
                                        }
                                    }
                                }
                            }


                        }


                        /**
                         * 可以选择是否按照分组获得结果 默认无参数的情况
                         * @param Num 如果没有分组的话这个参数不用
                         */
                        if (scope.rs == null) {
                            scope.rs = function (num) {
                                var result = true;
                                //不进行分组 使用的是flags来检验
                                if (num == null) {
                                    for (var index in scope.flags) {
                                        //如果其中一个为false 直接返回false
                                        if (!scope.flags[index]) {
                                            result = false;
                                            //scope.message = scope.message + "" + name + "一列请填写正确";
                                        }
                                    }
                                    return result;

                                } else {
                                    ////console.log("进来了");
                                    //进行分组之后的 选择
                                    //step2.判断这几个组的信息
                                    for (var index in scope.groupByGroupInfo[num]) {
                                        if (!scope.flags[scope.groupByGroupInfo[num][index]]) {
                                            var result = false;
                                        }
                                    }
                                    ////console.log(result);

                                    return result;
                                }
                            };
                        }


                        /**
                         * 初始化信息 获取所需
                         */
                        function initialize() {

                            //if(scope.flags == null){
                            //    scope.flags = [];
                            //}
                            //当scope.x的时候 初始化整个域的对象,
                            if (scope.flags == null) {
                                scope.flags = [];//保存是否正确的数组
                                scope.flags[flag] = false;  //注册组件
                                scope.groupInfo = [];//初始化groupinfo
                                scope.groupByGroupInfo = [];//初始化分组信息
                                //scope.groupBy = []; //分组信息  保存每个框他的值
                                ////console.log(scope.flags);
                            } else {
                                //注册组件
                                flag = scope.flags.length;
                                scope.flags[flag] = false;
                                ////console.log(scope.flags);
                            }
                            //获取标签所包含的一切信息 并分组
                            //检测是否含有限制字符串长度的信息
                            if (iAttrs.cs.indexOf("|") > -1) {

                                var argu = iAttrs.cs.split("|");
                                len = parseInt(argu[0]);
                                //////console.log(argu[1]);
                                if (iAttrs.cs.indexOf(" ") > -1) {
                                    var propertyInfo = argu[1].split(" ");
                                    for (var index in propertyInfo) {
                                        //筛选信息进行分组
                                        if (isNaN(propertyInfo[index])) {
                                            property[property.length] = propertyInfo[index];
                                        } else {
                                            group[group.length] = propertyInfo[index];
                                        }
                                    }
                                } else {
                                    if (isNaN(argu[1])) {
                                        property[0] = argu[1];
                                    } else {
                                        group[0] = argu[1]
                                    }

                                }

                                //////console.log(property);
                            } else {
                                //////console.log(iAttrs.cs.indexOf("|"));
                                if (iAttrs.cs.indexOf(" ") > -1) {
                                    var propertyInfo = iAttrs.cs.split(" ");
                                    for (var index in propertyInfo) {
                                        //筛选信息进行分组
                                        if (isNaN(propertyInfo[index])) {
                                            property[property.length] = propertyInfo[index];
                                        } else {
                                            group[group.length] = propertyInfo[index];
                                        }
                                    }
                                } else {
                                    if (isNaN(iAttrs.cs)) {
                                        property[0] = iAttrs.cs;
                                    } else {
                                        group[0] = iAttrs.cs;
                                    }

                                }
                            }
                            scope.groupInfo[flag] = group;
                            ////console.log(group);
                            ////console.log(property);
                            ////console.log(scope.groupInfo);
                            //初始化propertyFlags数组
                            for (var index in property) {
                                propertyFlags[index] = false;
                            }
                            if (len > 0) {
                                propertyFlags[property.length] = false;
                            }

                            //初始化提示信息:
                            for (var index in property) {
                                if (property[index] == "W") {
                                    warn[index] = "字符格式不正确";
                                }
                                if (property[index] == "IN") {
                                    warn[index] = "请输入非0整数";
                                }
                                if (property[index] == "DN") {
                                    warn[index] = "请输入非0小数或整数";
                                }
                                if (property[index] == "NN") {
                                    warn[index] = "不能为空";
                                }
                                if (len > 0) {
                                    warn[property.length] = "最多能输入" + len + "个字符";
                                }
                            }
                            if(scope.groupInfo.length >0 ){
                                scope.groupByGroup();
                            }

                            iElem.bind('keyup', scope.check);
                            //console.log(scope.groupByGroupInfo);
                            ////console.log(flag);
                            //setInterval(scope.check, "2000");
                            //setInterval(scope.result,"1000");
                        }
                        initialize();

                    }
                }
            }
        }
    }
}

app.directive('cs', createDirective());
app.controller("xym", ["$scope","$compile",function ($scope, $compile) {
}]);