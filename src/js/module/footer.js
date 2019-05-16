define(["jquery"],($)=>{
    class Footer{
        constructor () {
            this.container = $("#footer_container");
            this.load().then(()=>{
                
            });
        }
        load () {
            return new Promise(resolve =>{
                this.container.load("/html/module/footer.html",()=>{
                    resolve();
                });
            });
        }




    }
    return new Footer();
})