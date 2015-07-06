// var addVidLink = 'http://localhost:1337/add'


var siteDiv = document.getElementById("watch7-user-header"),
    parent = siteDiv.parentElement,
    next = siteDiv.nextSibling,
    a = document.createElement("button"),
    text = document.createTextNode("quokka");

a.setAttribute('onclick', "location.href='http://localhost:1337/add';");

a.appendChild(text);
if (next) parent.insertBefore(a, next);
else parent.appendChild(a);