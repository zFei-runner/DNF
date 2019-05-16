const gulp = require("gulp"),
      uglify = require("gulp-uglify"),//压缩js文件
      minifyCss = require("gulp-minify-css"),//压缩css文件
      gulpSass = require("gulp-sass"),//将sass文件转换成css文件
      htmlmin = require("gulp-htmlmin"),//压缩html文件
      babel = require("gulp-babel"),//将ES6转成ES5
      connect = require("gulp-connect");//开启一个本地服务器


//制定任务
// gulp.task("default",()=>{
//     //制定了一个default任务，该任务打印default
//     console.log("default");
// })

//制定一个css任务
//  首先把scss编译成css，再把编译后的css进行压缩
gulp.task("css",()=>{
    gulp.src("src/css/**/*.scss")//gulp.sre()，该src方法是gulp中的一个资源指令，专门用于   获取    各种所需的资源
        .pipe(gulpSass())//pipe()方法是一个管道，文件传输在管道中进行，在文件的传输过程中毒文件进行一系列编译压缩
        .pipe(minifyCss())
        .pipe(gulp.dest("dist/css"))//dest->destinatin目的地，文件加工完成之后防止在哪个文件下
        .pipe(connect.reload());
})

//制定html任务
gulp.task("html",()=>{
    gulp.src("src/**/*.html")//**表示所有目录，*表示所有文件
        .pipe(htmlmin({removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//不删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        }))     
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());//自动刷新
})

//制定js任务
gulp.task("js",()=>{
    gulp.src("src/js/**/*.js")
        // .pipe(babel({
        //     presets:["@babel/env"]
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
})

//制定libs任务
gulp.task("libs",()=>{
    gulp.src("src/libs/**/*")
        .pipe(gulp.dest("dist/libs"))
})

//制定imgs任务
gulp.task("imgs",()=>{
    //将imgs里面的文件原封不动的移动到dist中的imgs中去
    gulp.src("src/imgs/*")
        .pipe(gulp.dest("dist/imgs"))
})

//制定一个任务开启服务器
gulp.task("server",()=>{
    connect.server({
        root : "dist",//dist是项目运行的目录，而src目录只是我们在开发时使用的目录
        port : 3000,//自己配置端口号
        livereload : true  //支持热更新，当src中的内容被更改，那么在页面中的样式也会立即发生更改，相当于自动刷新
    });
})

//制定一个监听任务，当代码发生修改后，立即执行与之对应的任务
gulp.task("watch",()=>{
    gulp.watch("src/**/*.html",["html"]);//["html"]表示要执行的任务
    gulp.watch("src/css/**/*.scss",["css"]);
    gulp.watch("src/js/**/*.js",["js"]);

})


//把任务集中执行
gulp.task("default",["html","css","js","libs","imgs","server","watch"])
