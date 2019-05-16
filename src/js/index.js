require(["config"],()=>{
    require(["url","template","swiper","header","jquery","footer","articl"],(url,template,Swiper,header)=>{
        class Index{
            constructor () {
                this.load_header();
                this.load();
                this.lunbotu();
            }
            load_header (){
                header.init().then(()=>{
                    header.obj();
                    header.bindEvent();
                    header.shop_detail();
                    header.isLogin();
                    $(".wrap_nav").css("background","#bf040f");
                });
            }
            load () {
                $.ajax({
                    url : url.rapBaseUrl + "index/type",
                    type : "get",
                    dataType : "json",
                    success : data =>{
                        
                        if(data.res_code==="1") this.render(data.res_body.list);
                    }
                });
            }
            render (list) {
                $("#hot_shop_show").html(template("list_template",{list}));
            } 
            lunbotu() {
                new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    autoplay: true,
                    speed: 1000,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    effect: 'fade',
                    fade: {
                        crossFade: false
                    }
                })
            }
        }
        new Index();



    })
})