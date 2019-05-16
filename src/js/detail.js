require(["config"], () => {
  require(["template", "url","articl","header", "footer",  "zoom","fly"], (template, url,articl,header) => {
    class Detail {
      constructor() {
        this.load_header();
        this.load();
      }
      load_header (){
        header.init().then(()=>{
            header.obj();
            header.bindEvent();
            header.shop_detail();
            header.isLogin();
            $("#hero_around").hide();
                    $(".index_round").show();
            let a = $(".nav").find(".s");
              a.each(function (i,ele){
                  $(ele).prop("class","list_a");
            })
            $(".menu_right").show();
        });
    }
      load() {
        let id = location.search.slice(4);
        this.id = id;//将id变为全局通用
        $.get(url.rapBaseUrl + "detail/type", { id }, res => {
          if (res.res_code === "1") {
            let { data } = res.res_body;//解构赋值
            data = { ...data, id };//扩展运算符,人为添加id，真正项目中不需要
            this.data = data;//将data存为全局变量，便于加入购物车使用
            this.render(data);
            this.bindEvents();
          }
        })
      }
      render(data) {
        $("#detail_show").html(template("detail-template", { data }));//data这里使用了结构赋值,用data这个形参去接受传入的对象
        this.zoom();
      }
      //封装放大镜方法
      zoom() {
        // 放大镜插件
        $(".zoom-img").elevateZoom({
          gallery: 'gal1',
          cursor: 'pointer',
          galleryActiveClass: 'active',
          borderSize: '1',
          borderColor: '#888'
        });
      }
      //创建一个方法，用来封装需要创建的所有对象
      create() {
        this.addNum = $("#addToCarNum");
        this.input = $("#this_num");
        this.buyNow = $("#buyNow");
        this.addCar = $("#addCar");
        this.addAndBuy = $("#addAndBuy");
      }
      //事件绑定
      bindEvents() {
        let _this = this;
        this.create();
        this.number = Number(_this.input.val());
        
        //给购买数量添加事件
        this.addNum.on("click", "span", function () {
          if ($(this).attr("id") === "addNum") {
            _this.number++;
            _this.input.val(_this.number);

            // articl.calcCartNum();
          } else if ($(this).attr("id") === "reduceNum") {
            _this.number--;
            if (_this.number < 1) {
              _this.number = 1;
            }
            _this.input.val(_this.number);

            // articl.calcCartNum();
          }
          
        })
        //给 加入购物车 和 直接购买 添加事件
        this.addAndBuy.on("click", "span", function (e) {

          // if( $.cookie("username")) {
            if ($(this).attr("class") === "lijigoumai") {
              _this.addToCar();
              location.href="/html/car.html";
  
            } else if ($(this).attr("class") === "addCar") {
              _this.addToCar();
            //完成抛物线加购物车动画
            $(`<img src='${_this.data.imgs[0]}' style='width:30px;height:30px'>`).fly({
                start: {
                  left: e.clientX,
                  top: e.clientY
                },
                end: {
                  left: $("#car-Num").offset().left,
                  top: $("#car-Num").offset().top - $(window).scrollTop()
                  // left: 1300,
                  // top: 300
                },
                onEnd: function () {
                  this.destroy(); //销毁抛物体
                  articl.calcCartNum(); // 调用一次计算购物车数量的方法
                }
              })  
            }
          // }else {
          //   alert("请先登录");
          //   location.href = "/html/login.html";
          // }  
          
        })
      }
      addToCar() {
        let number = Number(this.input.val());
        let car = localStorage.getItem("car");//利用缓存判断该购物车中是否已经有商品
            if (car) {//购物车中已经存在商品时执行的代码
                car = JSON.parse(car);
                let index = -1;
                let flag = car.some((shop, i) => {
                  index = i;
                  return shop.id === this.id;
                  })

                if (flag) {//判断添加的商品是否已经存在
                  car[index].num = car[index].num + number;
                } else {
                  // 没有这条数据
                  car.push({ ...this.data, num: number });
                }
            } else {//购物车中一件商品都没有时执行的代码
                car = [{ ...this.data, num: number }];
                   } 
            localStorage.setItem("car", JSON.stringify(car));
      }

    }
    new Detail()
  });
});