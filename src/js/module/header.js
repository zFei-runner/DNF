define(["jquery","cookie"],($)=>{
    class Header{
        constructor () {
            this.container = $("#header_container");
        }
        isLogin () {
            this.user = $("#user");
            this.no_login = $("#no_login");
            this.login = $("#user_login");
            this.outLogin = $("#outLogin");
            let username = $.cookie("username");
            if(username){
                this.login.show();
                this.no_login.hide();
                this.user.html(username);
            }
            this.outLogin.on("click",()=>{
                if(confirm("确定退出吗？")){
                    $.removeCookie("username", { path: '/' });
                    this.no_login.show();
                    this.login.hide();
                }
            })   
        }
        init () {
            return  new Promise(resolve=>{
                this.container.load("/html/module/header.html",()=>{
                    resolve();
                });   
            })
        }
        //获取复用之后的对象
        obj () {
            this.shop=$('#top-shop');
            this.list=$("#top_in_detail");
            this.search_text = $("#search_text");
            this.search_btn = $("#search_btn");
            this.search = $(".search_con");
            this.search_ul = $("#search_list");
        }
        bindEvent () {
            let _this = this;
            this.search_text.on("keyup",function (){
                let keyWords = $(this).val();
                // 带着关键字去从百度接口请求与关键字相关的信息
                $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWords,(data)=>{
                    _this.render_li(data.s);
                });
            })
            this.search_ul.on("click","li",function () {
                _this.search.val(this.innerHTML);
                _this.search_ul.hide();
            })


        }
        //渲染
        render_li (arr) {
            this.search_ul.show();
            let str="";
            arr.forEach((ele)=>{
                str+="<li>"+ele+"</li>";
            })
            this.search_ul.html(str);
        }
        //人气周边商城详情事件
        shop_detail () {
            this.shop.on("mouseenter",()=>{
               this.list.css("display","block");
            })
            this.shop.on("mouseleave",()=>{
                this.list.css("display","none");
            })
            this.list.on("mouseenter",()=>{
                this.list.css("display","block");
            })
            this.list.on("mouseleave",()=>{
                this.list.css("display","none");
            })
        }
        }
   

    return new Header();
})