require.config({
    baseUrl : "/",
    paths : {
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "articl" : "js/module/articl",
        "jquery" : "libs/jquery/jquery-1.11.3.min",
        "url" : "js/module/url",
        "template" : "libs/art-template/template-web",
        "cookie" : "libs/jquery-plugins/jquery.cookie",
        "zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "swiper" : "libs/swiper/js/swiper",
        "fly": "libs/jquery-plugins/jquery.fly"
    },

    //垫片：使用不满足AMD规范的插件时，但是该插件依赖的模块满足AMD规范，需要使用垫片让该插件间接性满足AMD规范
    shim: {//声明垫片
        "cookie": {//需要写垫片的对象
            deps: ["jquery"]//表示该插件依赖于jQuery这个模块
        },//当垫片完成之后，在jQuery的原型上就会多一个该插件的方法
        "zoom": {
            deps: ["jquery"]
        },
        "fly": {
            deps: ["jquery"]
        }

    }
})