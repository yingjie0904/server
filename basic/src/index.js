let btn = document.createElement("button");
btn.addEventListener("click", function() {
  // 动态使用jsonp加载一个新的文件 import返回的是一个promise
  import("./file").then(data => {
    console.log(data.default);
  });
});
btn.style.background = "red";
btn.style.width = "100px";
btn.style.height = "100px";
document.body.appendChild(btn);
