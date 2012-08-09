function sendmessage(from, to, value, callback) {
    if (from == null || to == null || from == "" || to == null) {
        alert("form,to is empty");
        return;
    }
    var msg = new Object();
    msg.from = from;
    msg.to = to;
    msg.content = value;
    var json_msg = JSON.stringify(msg);
    var xmlHttp = getXmlHttpObject();
    xmlHttp.open("POST", "chat.php", false);
    xmlHttp.setRequestHeader("Content-Length", json_msg.length);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(json_msg);

    if (xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
    } else {
        alert("send failed");
    }
}

function getmessage(session, callback) {
    var xmlHttp = getXmlHttpObject();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", "message.php?session=" + session, true);
    xmlHttp.send(null);
}

function getXmlHttpObject() {
    var xmlHttp = null;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function insert_msg(from, content, timestamp) {
    var entry = parent.msg_box.document.getElementById("message");
    var div = parent.msg_box.document.createElement("div");
    entry.appendChild(div);

    //user + time
    var user = parent.msg_box.document.createElement("p");
    user.setAttribute("style", "color:green");
    var tm = new Date(timestamp * 1000);
    user.appendChild(parent.msg_box.document.createTextNode(from + ":  " + tm.toLocaleString()));
    div.appendChild(user);

    //content
    var content_ele = parent.msg_box.document.createElement("p");
    content_ele.setAttribute("style", "color:bluei");
    content_ele.appendChild(parent.msg_box.document.createTextNode(content));
    div.appendChild(content_ele);
}
