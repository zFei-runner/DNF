require(["config"], () => {
    require(["template", "articl", "header", "footer"], (template, articl, header) => {
        class Car {
            constructor() {
                this.load_header();
                this.data = JSON.parse(localStorage.getItem("car"));
                this.car_container = $("#car-container");
                this.cAll = $("#cAll");
                this.noShop = $("#noShop");
                this.free = $(".free");
                this.load();
            }
            load_header() {
                header.init().then(() => {
                    header.obj();
                    header.bindEvent();
                    header.shop_detail();
                    header.isLogin();
                    $("#hero_around").hide();
                    $(".menu_right").show();
                    let a = $(".nav").find(".s");
                    a.each(function (i, ele) {
                        $(ele).hide();
                    })
                    $(".buy").show();
                    $(".carPage").show();
                });
            }
            load() {
                if (this.data && this.data.length != 0) {
                    this.noShop.hide();
                    this.render();
                } else { this.noShop.show(); }
            }
            render() {
                $("#car-container").html(template("car-template", { list: this.data }));
                this.bumai = $(".bumai");
                this.calcAll(this.data);
                this.bindEvents();
                this.checkAll();
            }
            bindEvents() {
                let _this = this;
                //添加商品数量
                this.car_container.on("click", "span", function () {
                    let num = $(this).siblings(".this_num").val();
                        let _li = this.parentNode.parentNode;
                    if ($(this).attr("class") === "reduceNum") {
                        let id = _this.getId(_li);
                        //当前点击事件所对应的对象在localStorage数组中的位置角标
                        let index = _this.getThisObj(id, _this.data);
                        num--;
                        if (num < 1) num = 1;
                        $(this).siblings(".this_num").val(num);
                        _this.data[index].num = num;
                        localStorage.setItem("car", JSON.stringify(_this.data));
                        _this.calcNum(num, _this.data, index, this);
                        _this.calcAll(_this.data);

                    } else if ($(this).attr("class") === "addNum") {
                        let id = _this.getId(_li);
                        let index = _this.getThisObj(id, _this.data);
                        num++;
                        $(this).siblings(".this_num").val(num);
                        _this.data[index].num = num;
                        localStorage.setItem("car", JSON.stringify(_this.data));
                        _this.calcNum(num, _this.data, index, this);
                        _this.calcAll(_this.data);
                    }
                    articl.calcCartNum();
                })
                //删除商品
                this.car_container.on("click", "a", function () {
                    let id = _this.getId(this.parentNode);
                    if ($(this).attr("class") === "del") {
                        if (confirm("确认要删除该商品吗？")) {
                            let newDate = $.grep(_this.data, function (ele) { return ele.id != id }, false);
                            localStorage.setItem("car", JSON.stringify(newDate));
                            _this.data = newDate;//将修改之后的cookie值赋值给_this.data
                            this.parentNode.parentNode.remove();
                            _this.calcAll(newDate);
                            //判断购物车是否为空
                            _this.isNoShop();
                        }
                    }
                })
                //选择商品购买
                this.car_container.on("click", "b", function () {
                    if ($(this).hasClass("checked")) {
                        $(this).addClass("bumai");
                        $(this).removeClass("checked");
                        _this.calcAll(_this.data);
                        _this.checkAll();
                    } else {
                        $(this).removeClass("bumai");
                        $(this).addClass("checked");
                        _this.calcAll(_this.data);
                        _this.checkAll();
                    }
                })
                //全选按钮
                $("#cAll").on("click",function () {
                    // console.log(_this.uls)
                    if($(this).hasClass("checkAll")){
                        _this.uls.forEach((ul) => {
                            let check = ul.querySelector("b");
                            $(check).addClass("bumai");
                            $(check).removeClass("checked");
                        })
                        $(this).removeClass("checkAll")
                    }else{
                        _this.uls.forEach((ul) => {
                            let check = ul.querySelector("b");
                            $(check).addClass("checked");
                            $(check).removeClass("bumai");
                        })
                        $(this).addClass("checkAll")
                    }
                    _this.calcAll(_this.data);
                })
            }
            isNoShop() {
                if (this.data.length == 0) {
                    this.noShop.show();
                    this.cAll.removeClass("checkAll");
                } else {
                    this.noShop.hide();
                }
            }
            //全选
            checkAll() {
                let count = 0;
                this.uls.forEach((ul, index) => {
                    let check = ul.querySelector("b");
                    if ($(check).hasClass("checked")) {
                        count++;
                    }
                })
                if (count === this.uls.length) {
                    this.cAll.addClass("checkAll");
                } else {
                    this.cAll.removeClass("checkAll");
                }
            }
            //免运费方法
            freePost(allmoney) {
                if (allmoney >= 900) this.free.addClass("mianyunfei");
                else this.free.removeClass("mianyunfei");
            }
            //计算商品数量改变之后的小计
            calcNum(num, obj, index, _this) {
                let li = _this.parentNode.parentNode;
                let li_xj = $(li).siblings(".li_xj");
                let xiaoji = li_xj.find(".xiaoji");
                xiaoji.html(obj[index].priceNum * num);
            }
            //计算总商品数量以及总价
            calcAll(obj) {
                let _this = this;
                this.uls = this.car_container.children("ul").get();
                let buyNum = $("#buyNum"),
                    allPrice = $("#all-price");
                //总数量
                let allNum = obj.reduce((num, ele, i) => {
                    let b = $(_this.uls[i]).find("b");
                    if (b.hasClass("checked")) {
                        num += ele.num;
                        return num;
                    }
                    return num;
                }, 0)
                //总价钱
                let allMoney = obj.reduce((money, ele, i) => {
                    let b = $(_this.uls[i]).find("b");//拿到遍历到当前对象所对应的是否被选中标签
                    if (b.hasClass("checked")) {
                        return money += ele.priceNum * ele.num;
                    }
                    return money;
                }, 0)
                //渲染总价和总数量
                buyNum.html(allNum);
                allPrice.html(allMoney);
                this.freePost(allMoney);
                if (allNum == 0 && this.data.length != 0) {
                    $("#noOkBuy").show();
                    $("#okBuy").hide();
                } else {
                    $("#noOkBuy").hide();
                    $("#okBuy").show();
                }
            }
            //获取当前被点击对象所在对象的id
            getId(li) {
                let id = $(li).siblings(".li_sp").find(".sLogo").attr("href").split("?")[1].slice(3);
                return id;
            }
            getThisObj(id, obj) {
                let ind;
                obj.forEach((ele, index) => {
                    if (ele.id == id) ind = index;
                });
                return ind;
            }
        }
        return new Car();
    })
})