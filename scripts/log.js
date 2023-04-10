/*!
* HttpCL v0.3
* https://github.com/KtokKawu/HttpCL
*
* Copyright (c) 2023 Waku Kataoka
* Released under the MIT license
* https://github.com/KtokKawu/HttpCL/LICENSE
*/

var time = 0;
var method = "";
var url = "";
var headers = "";
var params = "";
var body = [];

chrome.webRequest.onBeforeRequest.addListener(
    // callback
    function logURL(comInfoBR) {
        time = new Date(comInfoBR.timeStamp).toString();
        method = comInfoBR.method;
        url = comInfoBR.url;
        if(method == "POST"){
            // comInfoBR.requestBody.raw.forEach(function(param) {
            //     params += param.name + "=" + param.value;
            //     if(element.length != Object.keys(param).length-1) {
            //         params += "&"
            //     }
            // });
            // body = comInfoBR.requestBody.raw;
            params = decodeURIComponent(String.fromCharCode.apply(null,
                        new Uint8Array(comInfoBR.requestBody.raw[0].bytes)));
        }
    },
    // filters
    { urls: ["<all_urls>"] },
    // extraInfoSpec
    ["requestBody"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function getHeaders(comInfoBSH) {
        comInfoBSH.requestHeaders.forEach(function(header) {
            headers += header.name + "=" + header.value + "\n";
        });
        if(method == "GET"){
            console.log(time + "\n\n" + 
                        method + " " + url + "\n" + 
                        headers);
        } else if(method == "POST") {
            console.log(time + "\n\n" + 
                        method + " " + url + "\n" + 
                        headers + "\n" + 
                        params);
        } else {
            console.log(time + "\n\n" + 
                        method + " " + url + "\n" + 
                        headers + "\n" + 
                        params);
        }
        headers = "";
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders", "extraHeaders"]
);
