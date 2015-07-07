var siteDiv = document.getElementById("watch7-user-header"),
    parent = siteDiv.parentElement,
    next = siteDiv.nextSibling,
    a = document.createElement("div"),
    text = document.createTextNode("our stuffs go here");

console.log($('.yt-uix-subscription-preferences-button'));

// a.setAttribute('onclick', "location.href='http://localhost:1337/add';");
a.setAttribute('class', 'quokka')

a.appendChild(text);
if (next) parent.insertBefore(a, next);
else parent.appendChild(a);

$(document).ready(function() {
    // $('.quokka').replaceAll('#watch-discussion');
    // $('.quokka').html('<h1>our stuffs go here!!!</h1>');
    $.get('http://localhost:1337/api/quokka', function(data) {
        console.log('success?????', data)
    })
    $('.quokka').load('http://localhost:1337/api/quokka');


})