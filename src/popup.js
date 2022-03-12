'use strict';

import './popup.css';

(function() {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage
  let config = {
    attributes: true, //目标节点的属性变化
    childList: true, //目标节点的子节点的新增和删除
    characterData: true, //如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
    subtree: true, //目标节点所有后代节点的attributes、childList、characterData变化
  };

  const mutationCallback = (mutationsList) => {
    for(let mutation of mutationsList) {
      let type = mutation.type;
      switch (type) {
        case "childList":
          let dom = document.querySelector(".layui-layer .layui-layer-dialog")
          if (dom){
           let btn =  document.querySelector(".layui-layer-btn0");
           btn.click();
          }
          console.log("A child node has been added or removed.");
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

  var observe = new MutationObserver(mutationCallback);
  observe.observe(document.querySelector('body'), config);// 后面介绍config的配置

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  // const counterStorage = {
  //   get: cb => {
  //     chrome.storage.sync.get(['count'], result => {
  //       cb(result.count);
  //     });
  //   },
  //   set: (value, cb) => {
  //     chrome.storage.sync.set(
  //       {
  //         count: value,
  //       },
  //       () => {
  //         cb();
  //       }
  //     );
  //   },
  // };
  //
  // function setupCounter(initialValue = 0) {
  //   document.getElementById('counter').innerHTML = initialValue;
  //
  //   document.getElementById('incrementBtn').addEventListener('click', () => {
  //     updateCounter({
  //       type: 'INCREMENT',
  //     });
  //   });
  //
  //   document.getElementById('decrementBtn').addEventListener('click', () => {
  //     updateCounter({
  //       type: 'DECREMENT',
  //     });
  //   });
  // }
  //
  // function updateCounter({ type }) {
  //   counterStorage.get(count => {
  //     let newCount;
  //
  //     if (type === 'INCREMENT') {
  //       newCount = count + 1;
  //     } else if (type === 'DECREMENT') {
  //       newCount = count - 1;
  //     } else {
  //       newCount = count;
  //     }
  //
  //     counterStorage.set(newCount, () => {
  //       document.getElementById('counter').innerHTML = newCount;
  //
  //       // Communicate with content script of
  //       // active tab by sending a message
  //       chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  //         const tab = tabs[0];
  //
  //         chrome.tabs.sendMessage(
  //           tab.id,
  //           {
  //             type: 'COUNT',
  //             payload: {
  //               count: newCount,
  //             },
  //           },
  //           response => {
  //             console.log('Current count value passed to contentScript file');
  //           }
  //         );
  //       });
  //     });
  //   });
  // }
  //
  // function restoreCounter() {
  //   // Restore count value
  //   counterStorage.get(count => {
  //     if (typeof count === 'undefined') {
  //       // Set counter value as 0
  //       counterStorage.set(0, () => {
  //         setupCounter(0);
  //       });
  //     } else {
  //       setupCounter(count);
  //     }
  //   });
  // }
  //
  // document.addEventListener('DOMContentLoaded', restoreCounter);

  // Communicate with background file by sending a message
  chrome.runtime.sendMessage(
    {
      type: 'GREETINGS',
      payload: {
        message: 'Hello, my name is Pop. I am from Popup.',
      },
    },
    response => {
      console.log(response.message);
    }
  );
})();
