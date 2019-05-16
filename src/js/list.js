
require(["config"],()=>{
    require(["template","url","header","footer","articl"],(template,url,header)=>{
        class List{
            constructor () {
                this.load_header();
                this.hover =$("#wrap_list_nav");
                this.shopbar_nav = $("#shopbar_nav");
                this.renqi = $("#renqi");
                this.autoplay();
                this.bindEvents();
                this.load();
            }
            //加载header模块
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
                    $(".wrap_nav").css("background","#bf040f");
                });
            }
            load () {
                //请求接口数据
                $.ajax({
                    url : url.rapBaseUrl + "list/type",
                    type : "get",
                    dataType : "json",
                    success : data =>{
                        
                        if(data.res_code==="1") this.render(data.res_body.list);
                    }
                });
            }
            render (list) {
                //$(目标id).html(template("script的id"，))
                $("#list_shop_detail").html(template("shop_template",{list}));
            } 

            autoplay () {
                this.renqi.css({
                    "background-color":"#fff",
                    "background-image" : "url('/imgs/list_dianbai.png')",
                    "color" : "#282725"
                });
            }
            bindEvents () {
                let _this = this;
                //小导航栏划过事件
                this.hover.on("mousemove","span",function() {
                    _this.hover.css("height","105px");
                    let span = _this.hover.children("span");
                    span.each(function (){
                        $(this).removeAttr("class");
                    });
                    $(this).css("background","#e3e3e3");
                    $(this).addClass("hover_list");    
                })
                this.hover.on("mouseleave","span",function() {
                    let span = _this.hover.children("span");
                    span.each(function (){
                        $(this).removeAttr("class");
                    });
                    $(this).css("background","");
                    _this.hover.css("height","55px");    
                })
                this.shopbar_nav.on("click","a",function (){
                    let a = _this.shopbar_nav.children("a");//获取shopbar_nav下的所有a标签
                    a.each(function (){
                        $(this).css({
                            "background-color" : "",
                            "background-image" : "url('/imgs/list_dian.png')",
                            "color" : "#bdbdbd"
                        });
                    });
                    $(this).css({
                        "background-color":"#fff",
                        "background-image" : "url('/imgs/list_dianbai.png')",
                        "color" : "#282725"
                    });
                    _this.load();
                })
                
            }

        }
        new List();



    })
})