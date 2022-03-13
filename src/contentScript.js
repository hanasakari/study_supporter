'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page

let config = {
    attributes: true, //目标节点的属性变化
    childList: true, //目标节点的子节点的新增和删除
    characterData: true, //如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
    subtree: true, //目标节点所有后代节点的attributes、childList、characterData变化
};
var check = [];
var time = 5;
var innerText = null;
var start = false


const countDown = () => {
    time--
    let btn = document.querySelector(".layui-layer-btn0");
    if (!btn) {
        init();
        clearCountDown();
        return;
    }
    btn.innerText = `${innerText}(${time})秒`
    if (time <= 0) {
        //  清空计时器
        clearCountDown()
        init();
        btn.click();
        console.log("点击成功");
    }

}

const init = () => {
    time = 5;
    innerText = null;
    start = false
}

const clearCountDown = () => {
    if (check.length > 0) {
        check.forEach((item, index) => {
            clearInterval(item)
            if (index === check.length - 1) {
                check = [];
                console.log(`${index}执行记录已清空`)
            }
        })
    }
}

const mutationCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
        let type = mutation.type;
        switch (type) {
            case "childList":
                clickBtn()
                break;
            // case "attributes":
            //   console.log(`The ${mutation.attributeName} attribute was modified.`);
            //   break;
            // case "subtree":
            //   console.log(`The subtree was modified.`);
            //   break;
            default:
                break;
        }
    }
};

const clickBtn = () => {
    if (!start) {
        let dom = document.querySelector(".layui-layer.layui-layer-dialog")
        if (dom) {
            let btn = document.querySelector(".layui-layer-btn0");
            innerText = btn.innerText;
            start = true;
            // 只允许执行一个计时器
            if (check.length === 0) {
                check.push(setInterval((function () {
                    countDown(innerText)
                }), 1000));
            }
        }
    }
}

var observe = new MutationObserver(mutationCallback);
observe.observe(document.querySelector('.whaty_body'), config);
