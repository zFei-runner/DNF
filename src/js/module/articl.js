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
            });
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