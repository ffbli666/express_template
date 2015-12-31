resizeImage = function(image, width, height){
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 85);
};
checkURL = function(str) {
    return /^https?:\/\//.test(str);
};
