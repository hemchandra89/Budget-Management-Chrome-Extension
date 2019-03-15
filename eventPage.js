/*jshint esversion: 6 */
var menuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {   
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText){    
        if (isInt(clickData.selectionText)){          
            chrome.storage.sync.get(['total','limit'], (budget) => {
                let newTotal = 0;
                if (budget.total){
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, () => {               
                if (newTotal >= budget.limit){
                    let notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh, look's like you've reached your alloted limit."
                    };
                    chrome.notifications.create('limitNotif', notifOptions);

                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener((changes, storageName) => {
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});