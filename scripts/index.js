// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    // document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    if (window.cordova) {
        //$(document).on('deviceready', init, false);
        document.addEventListener('deviceready', init, false);
    } else {
        $(function () { init(); });
    }

    function init() {
        var name = localStorage["name"]; if (name) $('#name').text(name); else $('#name').text("אורח");
        if (!(window.cordova)) {
            $('#msg').html("<b>version: <b/>" + window.cordova.version + "<br /><b>Platform-Id: <b/>" + window.cordova.platformId).show();
            $('.phone').hide();
        }
        $('.back-button').click(function (e) { e.preventDefault(); window.history.go(-1); return false; });

        if (window.cordova) {
            // Accelarometer
            var vAx = navigator.accelerometer.watchAcceleration(    // (onSuccess, onError, object options)
                function (a) { $('#aX').html(a.x); $('#aY').html(a.y); $('#aZ').html(a.z); $('#aTime').html(parseInt(a.timestamp / 1000) % 10000); },
                onError,
                { frequency: 2000 });

            // GeoLocation
            var vGL = navigator.geolocation.watchPosition(    // (onSuccess, onError, object options)
                function (pos) {
                    $('#glatitude').html(pos.coords.latitude); $('#glongitude').html(pos.coords.longitude); $('#galtitude').html(pos.coords.altitude); $('#gaccuracy').html(pos.coords.accuracy);
                    $('#galtitudeAccuracy').html(pos.coords.altitudeAccuracy); $('#gheading').html(pos.coords.heading); $('#gspeed').html(pos.coords.speed); $('#gtimestamp').html(parseInt(pos.timestamp / 1000) % 10000);
                }, onError,
                { frequency: 2000 });

            // Camera
            $('#btnTakePic').click(function () {
                var vCam = navigator.camera.getPicture(  // (onSuccess, onError, object options)
                    function (fileUri) { $('#imgUri').html(fileUri); $('#imgCamera').attr('src', fileUri); },
                    onError,
                    { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
            });

            // Notification
            // alert('text', callback, 'title', 'text')
            $('#btnNotiAlert').click(function () {
                var ctr = parseInt($(this).attr('data-count')) + 1; $(this).attr('data-count', ctr); $(this).find('span').html(ctr);
                navigator.notification.alert("הודעה", function () { $(this).css("color", "yello"); }, "כותרת ההודעה", "אשר אותי");
            });
            // confirm(message, confirmCallback, [title], [buttonLabels])
            $('#btnNotiConfirm').click(function () {
                navigator.notification.confirm("כמה ביפים לעשות?", function (btnIdx) {
                    // navigator.notification.beep(times);
                    navigator.notification.beep(btnIdx);
                }, "כמה ביפים?", ["1", "2", "3", "4", "5"]);
            });
            // prompt(message, promptCallback, [title], [buttonLabels], [defaultText])
            $('#btnNotiPrompt').click(function () {
                navigator.notification.prompt("מה שמך?", function (results) {
                    var $btnProm = $('#btnNotiPrompt');
                    if (results.buttonIndex == 1 && results.input1) { localStorage["name"] = results.input1; $('#name').text(name); }
                }, "כותרת לחלונית קלט");
            });
            $('#btnNotiBeep').click(function () {
                navigator.notification.confirm("כמה ביפים לעשות?", function (btnIdx) {
                    // beep(times);
                    navigator.notification.beep(btnIdx);
                }, "כמה ביפים?", ["1", "2", "3", "4", "5"]);
            });

            // Device
            $('#dcordova').html(device.cordova); $('#dmodel').html(device.model); $('#dplatform').html(device.platform); $('#duuid').html(device.uuid); $('#dversion').html(device.version); $('#dserial').html(device.serial);
        }



    }

    function onError(error) { alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n'); }

})();