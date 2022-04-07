// background.js
// chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
//     chrome.action.setBadgeText({ text: badgeText });
// });
let count = 0;

chrome.alarms.create({ periodInMinutes: 1/60 });

chrome.alarms.onAlarm.addListener(() => {
    count += 1;
    chrome.action.setBadgeText({
        text: count.toString(),
    });
    chrome.storage.sync.set({count}, ()=>{
        console.log('count now is', count)
    });
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['count'], (result)=>{
        count = result.count || count
        console.log('get count', count)
        chrome.action.setBadgeText({
            text: count.toString(),
        });
    });
    console.log('oninstalled');
});