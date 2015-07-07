//https://developer.chrome.com/extensions/getstarted

//http://minimul.com/modify-an-existing-page-with-a-chrome-extension-built-using-angular-and-yeoman-part-1.html

//http://www.accessify.com/tools-and-wizards/developer-tools/html-javascript-convertor/


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
    var title = $('span #eow-title').context.title;
    title = title.substring(0, title.length - 10);
    var url = $('.cmt_iframe_holder').data("href");
    var embedId = getId(url);
})

$('.quokka').click(function() {
    console.log("this was clicked");

    $.ajax({
        type: "POST",
        url: "http://localhost:1337/api/video/",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-My-Custom-Header-Name', '42');
        },
        data: {
            embedId: 'embedId',
            title: 'title',
            url: 'url'
        },
        success: function(data) {
            console.log(data);
        },
        dataType: "json"
    })

    // $.post("https://localhost:1337/api/video/", {
    //     embedId: 'embedId',
    //     title: 'title',
    //     url: 'url'
    // }, function(data) {
    //     console.log(data);
    // })
});