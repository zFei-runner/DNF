define(["jquery"], ($) => {
    class Articl {
        constructor() {
            this.articl = $("#articl");
            
            //获取文档对象的滚动距离
            this.load().then(() => {
                this.top = $("#re_top");
                //异步加载完成后执行的代码
                this.scroll();
                this.calcCartNum();
                this.articl = $(".user_inform");
                this.ren_notice = $(".ren_notice");
                this.key_notice = $(".key_notice");
                this.qqkefu_notice = $(".qqkefu_notice");
                // console.log(this.ren_notice)
                this.bindEvents();
            });
        }
        bindEvents () {
            let _this = this;
            this.articl.on("mouseenter","a",function () {
                if($(this).attr("class")=="ren"){
                    _this.ren_notice.show();   
                    _this.key_notice.hide();
                    _this.qqkefu_notice.hide();
                }else if($(this).attr("class")=="key"){
                    _this.key_notice.show();
                    _this.ren_notice.hide();
                    _this.qqkefu_notice.hide();
                }else if($(this).attr("class")=="qqkefu"){
                    _this.qqkefu_notice.show();
                    _this.ren_notice.hide();
                    _this.key_notice.hide();
                }else if($(this).attr("class")=="shopCar"){
                    _this.ren_notice.hide();
                    _this.key_notice.hide();
                    _this.qqkefu_notice.hide();
                }
                _this.articl.on("mouseleave",function (){
                    _this.ren_notice.hide();
                    _this.key_notice.hide();
                    _this.qqkefu_notice.hide();
                })

            })
        }
        //滚动条滚动事件
        scroll() {
            let dis = $(window).scrollTop();
            if (dis < 500) this.top.css("opacity", "0");
            $(window).scroll(() => {
                dis = $(window).scrollTop();
                if (dis >= 500) {
                    this.top.css("opacity", "1");
                    this.top.on("click", () => {
                        $(document).scrollTop(0);
                    })
                } else {
                    this.top.css("opacity", "0");
                }
            });
        }
        //渲染页面
        load() {
            return new Promise(resolve => {
                this.articl.load("/html/module/articl.html", () => {
                    resolve();
                })
            })
        }
        calcCartNum() {
            let car = localStorage.getItem('car');
            // console.log(car)
            let num = 0;
            if (car) {
                // 计算总数量
                car = JSON.parse(car);
                // num放的是商品总数量？ 还是种类的数量
                // 以总数量为例
                num = car.reduce((n, shop) => {
                    // console.log(shop)
                    n += shop.num;
                    return n;
            }, 0);

            }
            $("#car-Num").html(num);
        }

    }
    return new Articl();
})