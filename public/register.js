var currKeysDown = [];
var currKeyInd = [];
var list = [];
var list2 = [];


function print() {
    console.log(list);
    console.log(list2);
    xhr = new XMLHttpRequest();
    var url = "http://attackathon.com/register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    }
    var data = JSON.stringify({
        "1": list,
        "2": list2
    });
    xhr.send(data);

}

function keyup(event) {
    var x = event.which || event.keyCode;
    var d = new Date();
    var n = d.getTime();
    var ind = currKeyInd.indexOf(x);
    var keyUp = currKeysDown[ind];
    keyUp.held = n - keyUp.heldStart;
    currKeysDown.splice(currKeysDown.indexOf(keyUp), 1);
    currKeyInd.splice(currKeyInd.indexOf(x), 1);
    list.push(keyUp);
}

function keyup2(event) {
    var x = event.which || event.keyCode;
    var d = new Date();
    var n = d.getTime();
    var ind = currKeyInd.indexOf(x);
    var keyUp = currKeysDown[ind];
    keyUp.held = n - keyUp.heldStart;
    currKeysDown.splice(currKeysDown.indexOf(keyUp), 1);
    currKeyInd.splice(currKeyInd.indexOf(x), 1);
    list2.push(keyUp);
}

function keydown(event) {
    var x = event.which || event.keyCode;

    if (!currKeyInd.includes(x)) {
        var d = new Date();
        var n = d.getTime();
        if (currKeysDown.length != 0) {
            var l = currKeysDown[currKeysDown.length - 1]
            l.blank = n - l.heldStart;
            currKeysDown[currKeysDown.length - 1] = l
            currKeyInd[currKeyInd.length - 1] = l.code;

        }
        if (list.length != 0) {
            var l = list[list.length - 1]
            l.blank = n - l.heldStart;
            list[list.length - 1] = l
            //list[list.length-1] = l.x;
        }



        var newK = {
            code: x,
            heldStart: n,
            blank: 0,
            held: 0
        };
        currKeysDown.push(newK);
        currKeyInd.push(newK.code);

    }
}

function keydown2(event) {
    var x = event.which || event.keyCode;

    if (!currKeyInd.includes(x)) {
        var d = new Date();
        var n = d.getTime();
        if (currKeysDown.length != 0) {
            var l = currKeysDown[currKeysDown.length - 1]
            l.blank = n - l.heldStart;
            currKeysDown[currKeysDown.length - 1] = l
            currKeyInd[currKeyInd.length - 1] = l.code;

        }
        if (list2.length != 0) {
            var l = list2[list2.length - 1]
            l.blank = n - l.heldStart;
            list2[list2.length - 1] = l
            //list[list.length-1] = l.x;
        }



        var newK = {
            code: x,
            heldStart: n,
            blank: 0,
            held: 0
        };
        currKeysDown.push(newK);
        currKeyInd.push(newK.code);

    }

}