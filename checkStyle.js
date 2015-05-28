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
                        var vo = "";
                        console.log($(iElem['0']));
                        //绑定事件 当键盘弹起的时候 开始监听内容
                        var check =   function () {
                            message = "";
                            vo = iElem[0].value; // 得到input框的值
                            console.log("这是值" + iElem[0]['value']);
                            console.log(propertyFlags);
                            console.log(property);
                            //开始循环遍历 所有的属性
                            for (var index in property) {
                                //判断字符
                                if (property[index] == "W") {
                                    if(check_main.checkW(vo)){
                                        propertyFlags[index] = true;
                                    }else{
                                        propertyFlags[index] = false;
                                    }
                                    console.log("W");
                                }
                                //判断数字
                                if (property[index] == "N") {
                                    if(check_main.checkN(vo)){
                                        propertyFlags[index] = true;
                                    }else{
                                        propertyFlags[index] = false;
                                    }
                                }
                                if(property[index] == "NN"){
                                    if(check_main.checkNN(vo)){
                                        propertyFlags[index] = true;
                                    }else{
                                        propertyFlags[index] = false;
                                    }
                                }

                            }
                            //判断字符长度
                            if(len != 0){
                                console.log("这是长度"+vo.length);
                                if (vo.length > len) {
                                    console.log("判断长度false");
                                    propertyFlags[property.length] = false;
                                    //控制是否满足条件
                                    console.log($(iElem[0]['nextElementSibling']));
                                } else {
                                    console.log("判断长度true");
                                    propertyFlags[property.length] = true;
                                }
                            }
                            //判断完成之后检查不满足几个条件  显示出不满足的条件
                            console.log("message"+message);
                            if(isPropertyFlags()){
                                if (iElem[0]['nextElementSibling'] != null) {
                                    //满足条件的话 删除样式
                                    iElem[0]['style']['color'] = "";
                                    $(iElem[0]['nextElementSibling']).remove(); //删除提示信息
                                }
                            }else{
                                //添加不满足条件时候显示的提示信息
                                iElem[0]['style']['color'] = "red";
                                //如果提示信息为空的话,添加提示信息

                                if (iElem[0]['nextElementSibling'] == null) {
                                    iElem.parent().append("<span style='color:red' >" + message + "</span>");
                                }
                            }
                            console.log(scope.rs());
                            scope.rs();
                            scope.$apply();
                        };



                        /**
                         * 检测每一次输入之后是否满足所需的条件
                         */
                        var isPropertyFlags = function (){
                            var isTrue = true;
                            for(var index in propertyFlags ){
                                if(!propertyFlags[index]){
                                    message= message +warn[index]+" ";
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
                            checkW:function(vo){
                                return true;
                            },
                            /**
                             * 判断是否为数字
                             * @param vo
                             */
                            checkN:function (vo){
                                return true;
                            },
                            checkNN:function(vo){
                                if(vo == null || vo.trim() == ""){
                                    console.log("进入NN值" + vo);
                                    return false;
                                }else{
                                    console.log("进入NN值错误" + vo);
                                    return true;
                                }
                            }

                        };
                        /**
                         * 可以选择是否按照分组获得结果 默认无参数的情况
                         * @param Num 如果没有分组的话这个参数不用
                         */
                        scope.rs = function (Num) {
                            var result = true;
                            //不进行分组 使用的是flags来检验
                            if (Num == null) {
                                for (var index in scope.flags) {
                                    //如果其中一个为false 直接返回false
                                    if (!scope.flags[index]) {
                                        result = false;
                                        //scope.message = scope.message + "" + name + "一列请填写正确";
                                    }
                                }
                                return result;

                            } else {
                                //进行分组之后的 选择
                            }
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
                                //scope.groupBy = []; //分组信息  保存每个框他的值
                                console.log(scope.flags);
                            } else {
                                //注册组件
                                flag = scope.flags.length;
                                scope.flags[flag] = false;
                                console.log(scope.flags);
                            }
                            //获取标签所包含的一切信息 并分组
                            if (iAttrs.cs.indexOf("|") > -1) {

                                var argu = iAttrs.cs.split("|");
                                len = parseInt(argu[0]);
                                //console.log(argu[1]);
                                if (iAttrs.cs.indexOf(" ") > -1) {
                                    property = argu[1].split(" ");
                                } else {
                                    property[0] = argu[1];
                                }

                                //console.log(property);
                            } else {
                                //console.log(iAttrs.checkStyle.indexOf("|"));
                                if (iAttrs.cs.indexOf(" ") > -1) {
                                    property = argu[1].split(" ");
                                } else {
                                    property[0] = argu[1];
                                }
                                console.log(property);
                            }
                            //初始化propertyFlags数组
                            for(var index in property){
                                propertyFlags[index] = false;
                            }
                            if(len >0 ){
                                propertyFlags[property.length] = false;
                            }

                            //初始化提示信息:
                            for(var index in property ){
                                if(property[index] == "W"){
                                    warn[index] = "字符格式不正确";
                                }
                                if(property[index] == "N"){
                                    warn[index] = "数字格式不正确";
                                }
                                if(property[index] == "NN"){
                                    warn[index] = "不能为空";
                                }
                                if(len >0){
                                    warn[property.length] = "最多能输入"+len+"个字符";
                                }
                            }
                            iElem.bind('keyup',check);
                            setInterval(check,"1000");
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