
var currKeysDown = [];
var currKeyInd = [];
var list = [];
var list2 = [];
var mouseMovements = []
function mouse(e) {
  var x = e.clientX;
  var y = e.clientY;
  var data = {"x": x, "y": y}
  mouseMovements.push(data);
}


function print() {
  var phoneBrows = window.mobileAndTabletcheck();

    var text1 = (document.getElementById("email1").value).toLowerCase();
    var text2 = (document.getElementById("email2").value).toLowerCase();
    console.log(mouseMovements);
    xhr = new XMLHttpRequest();
    var url = "http://attackathon.com/register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    }

    var data = JSON.stringify({
        "1": list,
        "2": list2,
        "email1": text1,
        "email2": text2,
        "phone": phoneBrows


    });
    console.log(data);
    console.log(list);
    console.log(list2);

    xhr.send(data);
    document.getElementById('email1').value = "";
        document.getElementById('email2').value = "";

       list = []
       list2 = []

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

function keyup2(event) {
    var x = event.which || event.keyCode;
    console.log(x)
    var d = new Date();
    var n = d.getTime();
    var ind = currKeyInd.indexOf(x);
    var keyUp = currKeysDown[ind];
    keyUp.held = n - keyUp.heldStart;
    currKeysDown.splice(currKeysDown.indexOf(keyUp), 1);
    currKeyInd.splice(currKeyInd.indexOf(x), 1);
    list2.push(keyUp);
  
       if (keyUp.code == 8) {
         document.getElementById('email2').value = "";
         list2 = []
         
    } else if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode==16)) {
        list2.pop();
        if (list2.length > 0) {
            list2[list2.length - 1]['heldStart'] = keyUp.heldStart;
        }

    }

}

function keydown(event) {
    var x = event.which || event.keyCode;

  if(!currKeyInd.includes(x)){
  	  var d = new Date();
  var n = d.getTime();
    	if(currKeysDown.length!=0){
  		var l = currKeysDown[currKeysDown.length-1]
  		l.blank = n-l.heldStart;
  		currKeysDown[currKeysDown.length-1]= l
  		currKeyInd[currKeyInd.length-1] = l.code;

  	}
  	if(list.length!=0){
  		var l = list[list.length-1]
  		l.blank = n-l.heldStart;
  		list[list.length-1]= l
  		//list[list.length-1] = l.x;
  	}

  

  	var newK = {code:x, heldStart: n, blank:0, held: 0};
  	currKeysDown.push(newK);
  	currKeyInd.push(newK.code);

}
}

function keydown2(event) {
    var x = event.which || event.keyCode;

  if(!currKeyInd.includes(x)){
      var d = new Date();
  var n = d.getTime();
      if(currKeysDown.length!=0){
      var l = currKeysDown[currKeysDown.length-1]
      l.blank = n-l.heldStart;
      currKeysDown[currKeysDown.length-1]= l
      currKeyInd[currKeyInd.length-1] = l.code;

    }
    if(list2.length!=0){
      var l = list2[list2.length-1]
      l.blank = n-l.heldStart;
      list2[list2.length-1]= l
      //list[list.length-1] = l.x;
    }

  

    var newK = {code:x, heldStart: n, blank:0, held: 0};
    currKeysDown.push(newK);
    currKeyInd.push(newK.code);

}

}

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};