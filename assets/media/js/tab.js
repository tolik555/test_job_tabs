/**
 * Created by ktolik on 07.04.2017.
 */

$(document).ready(function(){
    'use strict';
    $("dl.tabs>dt").click(function(){
        $(this)
            .siblings().removeClass("active").end()
            .next("dd").andSelf().addClass("active");
    });
});

