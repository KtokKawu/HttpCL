/*!
* HttpCL v0.3
* https://github.com/KtokKawu/HttpCL
*
* Copyright (c) 2023 Waku Kataoka
* Released under the MIT license
* https://github.com/KtokKawu/HttpCL/LICENSE
*/

$(function() {
    $("ul.menu li").hover(
        function() {
            $(".menuSub:not(:animated)", this).slideDown();
        },
        function() {
            $(".menuSub", this).slideUp();
        }
    );
});