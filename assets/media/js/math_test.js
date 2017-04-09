/**
 * Created by ktolik on 07.04.2017.
 */

var MathOperators;
var a,b,res,i,issetMathOperators;

var eventObj = {
    addEvent: function (el, type, fn) {
        'use strict';
        this.el = el;
        if(el.addEventListener){
            el.addEventListener(type, fn, false);
        }else if (el.attachEvent){
            el.attachEvent('on'+type, fn);
        }else {
            el['on' + type] = fn;
        }
    },

    // метод для удаления события
    removeEvent: function (el, type, fn) {
        'use strict';
        if(typeof removeEventListener !== 'undefined'){
            el.addEventListener(type, fn, false);
        }else if (typeof detachEvent !== 'undefined'){
            el.detachEvent('on'+type, fn);
        }else {
            el['on' + type] = fn;
        }
    },

    getTarget: function (event) {
        'use strict';
        if(typeof event.target !== 'undefined'){
            return event.target;
        } else {
            return event.srcElement;
        }
    },

    preventDefault: function (event) {
        'use strict';
        if(typeof event.preventDefault !== 'undefined'){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};

var results = {
    incTrueAnsver: function () {
        'use strict';
        document.getElementsByName('trueAnsver')[0].innerHTML++;
    },
    incFalseAnsver: function () {
        'use strict';
        document.getElementsByName('falseAnsver')[0].innerHTML++;
    }
};

var getSetings = function () {
    'use strict';
    MathOperators = [];
    if(document.getElementById('addition').checked){
        MathOperators.push('+');
    }
    if(document.getElementById('subtraction').checked){
        MathOperators.push('-');
    }
    if(document.getElementById('multiplication').checked){
        MathOperators.push('*');
    }
    if(document.getElementById('division').checked){
        MathOperators.push('/');
    }
};

var input = {
    get: function () {
        'use strict';
        return document.getElementById('inp');
    },
    clear: function () {
        'use strict';
        document.getElementById('inp').value = '';
    },
    hide: function () {
        'use strict';
        document.getElementById('inp').style.display = 'none';
    },
    show: function () {
        'use strict';
        document.getElementById('inp').style.display = '';
    },
    setFocus: function (e) {
        e = eventObj.getTarget(e);
        e.focus();
    },
    writeLine: function (text) {
        'use strict';
        document.getElementById('question').innerHTML = text;
    }
};

var generateQuestion = function () {
    'use strict';
    getSetings();
    if(MathOperators.length){
        issetMathOperators = 0;
        input.show();
        a = getRandomInt(0,100);
        b = getRandomInt(0,100);
        i = getRandomInt(0,(MathOperators.length-1));
        res = a+MathOperators[i]+b;
        var el = document.getElementById('question');
        el.innerHTML = res+'=';
        input.clear();
    } else {
        issetMathOperators = 1;
        input.hide();
        input.writeLine('Выберите тип решаемых выражений и нажмите "Enter"');
        eventObj.addEvent(document.body, 'keyup', validate);
    }
};



var validate = function(inp) {
    'use strict';
    getSetings();
    if(issetMathOperators) {
        if(!MathOperators.length){return;}
    }
    var input;
    eventObj.preventDefault(inp);
    if(inp.code !== 'Enter') {
        input = eventObj.getTarget(inp);
        input.value = input.value.replace(/[^\d-]*/g, '');
    } else {
        input = eventObj.getTarget(inp);
        if(+input.value === eval(res)){
            results.incTrueAnsver();
        } else {
            results.incFalseAnsver();
        }
        generateQuestion();
    }
};

var getRandomInt = function(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };

window.onload = function () {
    'use strict';
    eventObj.addEvent(input.get(), 'keyup', validate);
    eventObj.addEvent(input.get(), 'blur', input.setFocus);
    generateQuestion();
};