# HubApple
Badapple displays everywhere有屏幕的地方就有badapple
##绿点地方小了点，貌似可以当屏幕
***
现在还没带电脑，回去做个工具试试
***
完成了绿点行列和单独坐标的控制功能，测试网页可以初始化了，如果做成chrome插件现在已经可以显示了，赞
***
需要一个小工具转换图像和坐标点，目前有5种颜色浓度和52*7的显示分辨率
***
github没用jquery，而且网站做了Content Security Policy来防止xss，需要解决兼容的js
`
detector.js:14 Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src assets-cdn.github.com".
initPlayer @ detector.js:14(anonymous function) @ detector.js:8(anonymous function) @ detector.js:112
detector.js:15 Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src assets-cdn.github.com".
initPlayer @ detector.js:15(anonymous function) @ detector.js:8(anonymous function) @ detector.js:112
`
所以初始化的界面出不来了
`
var colTimerId = setInterval("drawInitFrame()", 7);
    setTimeout("clearInterval(" + colTimerId + ")", 5000);
    setTimeout("setAllGreen(1)", 5000);
    setTimeout("drawInitFrame2()", 5500);
    setTimeout("setAllGreen(1)", 10000);
    setTimeout("drawInitFrame3()", 10500);
`
