/*jshint esversion: 6 */
$(() => {
    chrome.storage.sync.get('limit',(budget) => {
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(() => {
        let limit = $('#limit').val();
        if (limit){
            chrome.storage.sync.set({'limit': limit}, () => {
                close();
            });
        }
    });

    $('#resetTotal').click(() => {
        chrome.storage.sync.set({'total': 0}, () => {
          
            let notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Resetting Total",
                message: "Total has been reset to 0."
            };
           
            chrome.notifications.create('resetNotif', notifOptions);
           
        });
    });
});