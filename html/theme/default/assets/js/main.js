$(document).ready(function(){$(".gallery .image").each(function(){var t=$("img",this),a=t.attr("src");$(t).hide(),$(this).attr("style","background-image: url("+a+")"),$(this).attr("data-lightbox","gallery")})});