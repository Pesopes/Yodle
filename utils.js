//
//  Helper functions
//
String.prototype.includesNum = function(char){
    let count = 0
    for (let i = 0; i < this.length; i++) {
        if(char === this[i])
            count++
    }
    return count
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);

}

// kinda dumb but im lazy to make a function for this 
// (oh this is so it isnt by reference)
function copyObject(obj){
    return JSON.parse(JSON.stringify(obj))
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function setBase64Image(obj, imgStr){
    obj.src = "data:image/png;base64,"+imgStr
}

function imageFromInput(sourceInput,targetImg) {
    var preview = gEl(targetImg);
    var file    = gEl(sourceInput).files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHexString(str) {
    str = str.slice(4, -1).split(", ")
    let r = parseInt(str[0])
    let g = parseInt(str[1])
    let b = parseInt(str[2])
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function gEl(id){
    return document.getElementById(id)
}

function gEls(className){
    return document.getElementsByClassName(className)
}
