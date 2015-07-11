console.log('inside the background.js')

chrome.runtime.onMessage.addListener(function(req, sender) {
    console.log('THIS IS REQ.MESSAGE', req.command);
    console.log('THIS IS REQ.DATA', req.data);
    if (req.command === 'send') {
        $.ajax({
            type: 'POST',
            url: 'https://www.quokka.chat/api/video/',
            data: req.data,
            success: function(response) {
                console.log('Posted successfully!,',
                    response);
            }
        })
    }
})