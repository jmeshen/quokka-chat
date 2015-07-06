var buttonOnSite = document.getElementById("watch7-user-header"),
    parent = buttonOnSite.parentElement,
    next = buttonOnSite.nextSibling,
    button = document.createElement("button"),
    text = document.createTextNode("quokka");

button.appendChild(text);
if (next) parent.insertBefore(button, next);
else parent.appendChild(button);