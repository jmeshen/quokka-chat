$('#watch7-user-header').append('<button class="quokka yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-can-buffer">Add To Quokka Chat!</button>');

function getId(url) {
    url = url.split('')
    if (url.indexOf('=') > -1) {
        return url.slice((url.indexOf('=') + 1)).join('');
    } else {
        return url.slice((url.indexOf('.') + 4)).join('');
    }
}

$(document).on('ready', function() {
    var url = window.location.href;
    var data = {
        url: url,
        embedId: getId(url)
    }
    console.log('THIS IS DATA', data)

    $('.quokka').on('click', function() {
        console.log("this was clicked");
        chrome.runtime.sendMessage({
            command: 'send',
            data: data
        });
    });
})

// $.ajax({
//     type: "POST",
//     url: "https://www.quokka.chat/api/video/",
//     beforeSend: function(xhr) {
//         // xhr.setRequestHeader('X-My-Custom-Header-Name', '42');
//     },
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': '*'
//     },
//     data: {
//         embedId: embedId,
//         url: url
//     },
//     success: function(data) {
//         console.log(data);
//     },
//     dataType: "json"
// })