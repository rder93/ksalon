
jQuery(document).ready(function($) {

    setTimeout(function(){
    	$('.loader_animation').fadeOut('fast');
    }, 3000);

});


var loaderAnimation = function(status) {    
    if (status == true) {
        $('body').css('overflow', 'hidden');
        $('.loader_animation').fadeIn('slow');
        $("html, body").animate({ scrollTop: 0 }, "slow");
    } else {
        $('body').css('overflow', 'auto');
        $('.loader_animation').fadeOut('slow');
    }
}

jQuery(document).ready(function($) {
	var server_uri = $('body').attr('data-server_uri');
	debug = $('body').attr('debug');


	if (debug=='true') {
		console.log('Auth user information: ');
		console.log($.sessionStorage.get('user'));
	}
});


var pictureSource; 
var destinationType; 

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}


function onPhotoDataSuccess(imageURI) {
    console.log(imageURI);
    var cameraImage = document.getElementById('image');
    cameraImage.style.display = 'block';
    cameraImage.src = imageURI;
}

function onPhotoURISuccess(imageURI) {
    console.log(imageURI);
    var galleryImage = document.getElementById('image');
    galleryImage.style.display = 'block';
    galleryImage.src = imageURI;

    var img = document.getElementById('image');
    var imageURI = img.src;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();

    ft.upload(imageURI, encodeURI($('.url_submit_file').val()), win, fail, options);
}



function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}



function getPhoto(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}



function onFail(message) {
    
}

function upload(upload_url) {
    var img = document.getElementById('image');
    var imageURI = img.src;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();

    ft.upload(imageURI, url, win, fail,
        options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    console.log("An error has occurred: Code = " + error.code);
    console.log(error.body);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}