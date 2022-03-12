'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log('init');

    if (changeInfo.url == undefined) {
        return false;
    }
    // 检查是否是wish页面的tab
    // if(tab.url.indexOf('pinterest.com') > 0){

    // 通知对应的tab页面url变化了,需要优化为离开立即移除，进入则加载完毕再添加
    if (tab.status === 'loading') {

        chrome.tabs.sendMessage(tabId, {
            type: 'tabUpdate', tab: tab
        }, function (response) {

            console.log('来自content的回复：' + response);

            console.log('inited');
        });
        // }
    }
});
