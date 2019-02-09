	var currKeysDown = [];
var currKeyInd = [];
var list = [];
var mouseMovements = []

function mouse(e) {
  var x = e.clientX;
  var y = e.clientY;
  var data = {"x": x, "y": y}
  mouseMovements.push(data);
}

function sendData() {
    var res;
	var phoneBrows = checkPhone();
    console.log(list);
    console.log(mouseMovements);
    var text = (document.getElementById("email1").value).toLowerCase();
    xhr = new XMLHttpRequest();
    var url = "https://attackathon.com/compare";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            //console.log(json);
            res = json;
           onAsy(res);

        }
    }
    var data = JSON.stringify({
        "data": list,
        "email": text,
        "phone": phoneBrows
    });
    xhr.send(data);
    document.getElementById('email1').value = "";

       list = []

}

function keyup(event) {
    var x = event.which || event.keyCode;
         if (event.keyCode === 13) {
            return;
}
    var d = new Date();
    var n = d.getTime();
    var ind = currKeyInd.indexOf(x);
    var keyUp = currKeysDown[ind];
    keyUp.held = n - keyUp.heldStart;
    currKeysDown.splice(currKeysDown.indexOf(keyUp), 1);
    currKeyInd.splice(currKeyInd.indexOf(x), 1);
    list.push(keyUp);
    if (keyUp.code == 8) {
         document.getElementById('email1').value = "";
         list = []

    } else if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode==16)) {
        list.pop();
        if (list.length > 0) {
            list[list.length - 1]['heldStart'] = keyUp.heldStart;
        }

    }

}

function keydown(event) {
    var x = event.which || event.keyCode;
     if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("sub").click();
    return;
  }

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

function checkPhone(){
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
return true;
}
return false;
}
