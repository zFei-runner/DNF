require(["config"],()=>{
    require(["url","jquery","swiper"],(url,$,Swiper)=>{
        class Require{
            constructor () {
                this.username = $("#username");
                this.pwd = $("#pwd");
                this.reg_btn = $("#register_btn"); 
                this.tel = $("#tel_number");
                this.noCheck = $("#no_checked");
                this.checked = $("#yes_checked");
                this.wrap_check = $("#wrap_check");
                this.lunbotu();
                this.bindEvents();
            }
            lunbotu() {
                var swiper =new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    autoplay: true,
                    speed: 1000,
                    effect: 'fade',
                    fade: {
                        crossFade: false
                    }
                })      
            }
            bindEvents () {
                let _this = this;
                this.reg_btn.on("click", () => {
                    if(this.checked.css("display")==="block"){
                        let username = this.username.val(),
                            pwd = this.pwd.val(),
                            tel = this.tel.val();
                        $.ajax({
                            url : url.phpBaseUrl + "api/v1/register.php",
                            type : "POST",
                            data : {username,pwd,tel},
                            dataType : "json",
                            success : data =>{
                                if(data.res_code==="1"){
                                    alert(data.res_message + ",即将跳转至登录页面");
                                    location.href = "login.html";
                                }
                            }
                        });
                    }
                });
                //勾选框
                this.wrap_check.on("click","span",function () {
                    if($(this).css("display")==="block"){
                        if($(this).attr("id")==="no_checked"){
                            $(this).css("display","none");
                            _this.checked.css("display","block");
                        }else if($(this).attr("id")==="yes_checked"){
                            $(this).css("display","none");
                            _this.noCheck.css("display","block");
                        }
                        
                    }
                })

            }


        }

        new Require();
    })
})