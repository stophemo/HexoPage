const btn = document.getElementsByTagName("button")[0];
const textarea = document.getElementById("result");
//绑定事件
btn.onclick = function () {
    let question = document.getElementsByTagName("input")[0].value;
    //1. 创建对象
    const xhr = new XMLHttpRequest();
    //2. 初始化 设置请求方法和 url
    xhr.open('GET', 'https://wjs4wgh3tn.hk.aircode.run/hello?q=' + question);
    //3. 发送
    xhr.send();
    //4. 事件绑定 处理服务端返回的结果
    // on  when 当....时候
    // readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
    // change  改变
    xhr.onreadystatechange = function () {
        //判断 (服务端返回了所有的结果)
        if (xhr.readyState === 4) {
            //判断响应状态码 200  404  403 401 500
            // 2xx 成功
            if (xhr.status >= 200 && xhr.status < 300) {
                //处理结果  行 头 空行 体
                //响应 
                // console.log(xhr.status);//状态码
                // console.log(xhr.statusText);//状态字符串
                // console.log(xhr.getAllResponseHeaders());//所有响应头
                // console.log(xhr.response);//响应体
                //设置 result 的文本
                textarea.innerHTML = xhr.response;
            } else {

            }
        }
    }
}