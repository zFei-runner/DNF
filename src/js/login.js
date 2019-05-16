require(["config"],()=>{
    require(["url","cookie","footer"],(url)=>{
        class Login{
            constructor () {
                this.username = $("#username");
                this.pwd = $("#pwd");
                this.btn = $("#login");
                this.bindEvents ();

            }
            bindEvents () {
                this.btn.on("click",()=>{
                    let username = this.username.val(),
                        pwd = this.pwd.val();
                    $.ajax({
                        url:url.phpBaseUrl + "api/v1/login.php",
                        type : "post",
                        data : {username,pwd},
                        dataType : "json",
                        success : data => {
                            if(data.res_code===1){
                                alert(data.res_message + "，即将跳转至首页");
                                this.loginSucc(username);
                                location.href="/";
                            }
                        }
                    });
                })
            }
            loginSucc (username) {
                //登录成功，存cookie
                $.cookie("username",username,{path:"/"});
            }



        }
        new Login();
    })
})