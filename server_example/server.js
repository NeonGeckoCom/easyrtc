// Load required modules
var https    = require("https");              // http server core module
var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require("socket.io");        // web socket external module
var easyrtc = require("../");               // EasyRTC external module

var fs = require("fs");
var os = require('os');
var path = require('path');
var certFilePath = '';
var keyFilePath = '';
var serverIPAddress = '';
getLocalIP();
if (serverIPAddress.indexOf('186.120') != -1){
    certFilePath = path.resolve('/etc/letsencrypt/live/2222.us/fullchain.pem');
    keyFilePath = path.resolve('/etc/letsencrypt/live/2222.us/privkey.pem');
}else{
    certFilePath = path.resolve('/etc/letsencrypt/live/0000.us/fullchain.pem');
    keyFilePath = path.resolve('/etc/letsencrypt/live/0000.us/privkey.pem');
}
// var certFilePath = path.resolve(__dirname, "fullchain.pem");
// var keyFilePath = path.resolve(__dirname, "privkey.pem");
var options = {
    key: fs.readFileSync(keyFilePath),
    cert: fs.readFileSync(certFilePath),
    requestCert: false
};


function getLocalIP(){

    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias == 0) {
                console.log('ifname and address = ' + ifname + ' - ' + iface.address);
                if (iface.address.indexOf('186.92') != -1 || iface.address.indexOf('186.120') != -1 ) {
                    // if (iface.address.indexOf('145.185') != -1 || iface.address.indexOf('187.223') != -1 ) {
                    serverIPAddress = iface.address;
                }
                return iface.address;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                //console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                //console.log(ifname, iface.address);
            }
            ++alias;
        });
    });
}


// Set process name
process.title = "node-easyrtc";

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var app = express();
app.use(serveStatic('static', {'index': ['index.html']}));

// Start Express http server on port 8080
// var webServer = http.createServer(app).listen(8080);

var webServer = https.createServer(options,app).listen(8443);


// Start Socket.io so it attaches itself to Express server
var socketServer = socketIo.listen(webServer);
// var socketServer = socketIo.listen(webServer, {"log level":1});

easyrtc.setOption("logLevel", "debug");

// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }

        connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

        console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

        callback(err, connectionObj);
    });
});

// To test, lets print the credential to the console for every room join!
easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
    console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});

// Start EasyRTC server
var rtc = easyrtc.listen(app, socketServer, null, function(err, rtcRef) {
    console.log("Initiated");

    rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
        console.log("roomCreate fired! Trying to create: " + roomName);

        appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
    });
});

//listen on port 8080
// webServer.listen(8080, function () {
//     console.log('listening on http://localhost:8080');
// });
webServer.listen(8443, function () {
    console.log('listening on https://localhost:8443');
});
