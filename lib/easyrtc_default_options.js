/* global module, require */

/**
 * @file        Default options used within EasyRTC. Overriding of default options should be done using the public listen() or setOption() functions.
 * @module      easyrtc_default_options
 * @author      Priologic Software, info@easyrtc.com
 * @copyright   Copyright 2016 Priologic Software. All rights reserved.
 * @license     BSD v2, see LICENSE file in module root folder.
 */
var util = require('util');

var serverIPAddress = '';

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
                var lip = iface.address;
                if (iface.address.indexOf('186.92') != -1 || iface.address.indexOf('186.120') != -1 ) {
                    // if (iface.address.indexOf('145.185') != -1 || iface.address.indexOf('187.223') != -1 ) {
                    serverIPAddress = iface.address;
                }
                console.log('returning address = ' + lip);
                return lip;
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

var option = {};
var curTime = new Date();
var timeStamp = curTime.getTime();
var timeStamp2 = (timeStamp + (24 * 3600)) + ''; // plus 24 hours
// var timeStamp2 = (timeStamp + (24 * 3600)) + ''; // minus 3 hours


// Application Options
option.appDefaultName       = "default";                    // The default application a connection belongs to if it is not initially specified.
option.appAutoCreateEnable  = true;                         // Enables the creation of rooms from the API. Occurs when client joins a nonexistent room.
option.appDefaultFieldObj   = null;                         // Default fields which are set when an application is created. In form of {"fieldName":{fieldValue:<JsonObj>, fieldOption:{isShared:<boolean>}}[, ...]}
option.appIceServers = [];

serverIPAddress = '64.34.186.120';
console.log('>>>>>>>>>> serverIPAddress = '+ serverIPAddress);

if (serverIPAddress.indexOf('186.120') != -1){
    option.appIceServers = [                                    // Array of STUN and TURN servers. By default there is only publicly available STUN servers.
        // {urls: "stun:stun.l.google.com:19302"},
        // {urls: "stun:stun.sipgate.net"},
        // {urls: "stun:217.10.68.152"},
        // {urls: "stun:stun.sipgate.net:10000"},
        // {urls: "stun:217.10.68.152:10000"},
        // {urls: "stun:64.34.187.223:3478?transport=tcp"},
        {urls: "stun:64.34.186.120",
            // credential: 'ne0ngeck0',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.120:5349",
            // credential: 'ne0ngeck0',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.120:5350",
            // credential: 'ne0ngeck0',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.120:3478",
            // credential: 'ne0ngeck0',
            credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.120:3479",
            // credential: 'ne0ngeck0',
            credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        }
    ];
} else {
    option.appIceServers = [                                    // Array of STUN and TURN servers. By default there is only publicly available STUN servers.
        // {urls: "stun:stun.l.google.com:19302"},
        // {urls: "stun:stun.sipgate.net"},
        // {urls: "stun:217.10.68.152"},
        // {urls: "stun:stun.sipgate.net:10000"},
        // {urls: "stun:217.10.68.152:10000"},
        // {urls: "stun:64.34.187.223:3478?transport=tcp"},
        {urls: "stun:64.34.186.92",
            // credential: 'ne0ngeck0',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.92:5349?transport=udp",
            // credential: 'ne0ngeck0',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.92:5350?transport=tcp",
            // credential: 'ne0ngeck0',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.92:3478",
            // credential: 'ne0ngeck0',
            credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        },
        {urls: "turn:64.34.186.92:3479?transport=tcp",
            // credential: 'ne0ngeck0',
            credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
            // credential: '0x3d840082d75e51ad925132c3dd558a2b',
            // username: 'cpi'
            username: 'cpi:ne0ngeck0'
            // username: 'ne0ngeck0:cpi'
        }
    ];

}

// option.appIceServers = [                                    // Array of STUN and TURN servers. By default there is only publicly available STUN servers.
//     // {urls: "stun:stun.l.google.com:19302"},
//     // {urls: "stun:stun.sipgate.net"},
//     // {urls: "stun:217.10.68.152"},
//     // {urls: "stun:stun.sipgate.net:10000"},
//     // {urls: "stun:217.10.68.152:10000"},
//     // {urls: "stun:64.34.187.223:3478?transport=tcp"},
//     {urls: "stun:64.34.186.92",
//         // credential: 'ne0ngeck0',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.186.92:5349",
//         // credential: 'ne0ngeck0',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.186.92:5350",
//         // credential: 'ne0ngeck0',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.186.92:3478",
//         // credential: 'ne0ngeck0',
//         credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.186.92:3479",
//         // credential: 'ne0ngeck0',
//         credential: '0x9848c0d4a9fdebe012a4107e649ccf81',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     }
// ];

console.log('>>>>>>>>>> appIceServers = '+ util.inspect(option.appIceServers));

// option.appIceServers = [                                    // Array of STUN and TURN servers. By default there is only publicly available STUN servers.
//     {urls: "stun:stun.l.google.com:19302"},
//     {urls: "stun:stun.sipgate.net"},
//     {urls: "stun:217.10.68.152"},
//     {urls: "stun:stun.sipgate.net:10000"},
//     {urls: "stun:217.10.68.152:10000"},
//     // {urls: "stun:64.34.187.223:3478?transport=tcp"},
//     {urls: "stun:64.34.187.223",
//         // credential: 'ne0ngeck0',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.187.223:5349",
//         // credential: 'ne0ngeck0',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.187.223:5350",
//         // credential: 'ne0ngeck0',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.187.223:3478",
//         // credential: 'ne0ngeck0',
//         credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     {urls: "turn:64.34.187.223:3479",
//         // credential: 'ne0ngeck0',
//         credential: '0x2e00ca25e27f2f9160813f8cef8a7dcd',
//         // credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         // username: 'cpi'
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     }
// ];

// option.appIceServers = [                                    // Array of STUN and TURN servers. By default there is only publicly available STUN servers.
//     {urls: "stun:stun.l.google.com:19302"},
//     {urls: "stun:stun.sipgate.net"},
//     {urls: "stun:217.10.68.152"},
//     {urls: "stun:stun.sipgate.net:10000"},
//     {urls: "stun:217.10.68.152:10000"},
//     {urls: "stun:64.34.187.223:3478",
//         credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         username: 'cpi:ne0ngeck0'
//     },
//     // {urls: "turn:64.34.187.223:3478?transport=tcp",
//     //     credential: '0x3d840082d75e51ad925132c3dd558a2b',
//     //     username: 'cpi:ne0ngeck0'
//     //     // username: 'ne0ngeck0:cpi'
//     // },
//     {urls: "turn:64.34.187.223:3478",
//         credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     },
//     // {urls: "turn:64.34.187.223:5349?transport=tcp",
//     //     credential: '0x3d840082d75e51ad925132c3dd558a2b',
//     //     username: 'cpi:ne0ngeck0'
//     //     // username: 'ne0ngeck0:cpi'
//     // },
//     {urls: "turn:64.34.187.223:5349",
//         credential: '0x3d840082d75e51ad925132c3dd558a2b',
//         username: 'cpi:ne0ngeck0'
//         // username: 'ne0ngeck0:cpi'
//     }
// ];

// Room Options
option.roomDefaultEnable    = true;                         // Enables connections joining a default room if it is not initially specified. If false, than a connection initially may be in no room.
option.roomDefaultName      = "default";                    // The default room a connection joins if it is not initially specified.
option.roomAutoCreateEnable = true;                         // Enables the creation of rooms from the API. Occurs when client joins a nonexistent room.
option.roomDefaultFieldObj  = null;                         // Default fields which are set when a room is created. In form of {"fieldName":{fieldValue:<JsonObj>, fieldOption:{isShared:<boolean>}}[, ...]}


// Connection Options
option.connectionDefaultFieldObj  = null;                   // Default fields which are set when a connection is created. In form of {"fieldName":{fieldValue:<JsonObj>, fieldOption:{isShared:<boolean>}}[, ...]}


// SessionOptions
option.sessionEnable        = true;                         // Enable sessions. If sessions are disabled, each socket connection from the same user will be the same. Relies on Express session handling also being enabled.
option.sessionCookieEnable  = true;                         // If enabled, the server will attempt to send a easyrtcsid cookie which matches the Express session id.


// API Hosting Options
option.apiEnable            = true;                         // Enables hosting of the EasyRTC API files.
option.apiPublicFolder      = "/easyrtc";                   // Api public folder without trailing slash. Note that the demos expect this to be '/easyrtc'
option.apiLabsEnable        = true;                         // Enables hosting of the EasyRTC experimental API files located in the 'labs' sub folder
option.apiOldLocationEnable = false;                        // [Depreciated] Listens for requests to core API files in old locations (in addition to the new standard locations)


// Demo Options
option.demosEnable          = true;
option.demosPublicFolder    = "/demos";                     // Demos public folder without trailing slash. This sets the public URL where where demos are hosted, such as http://yourdomain/demos/


// Log options - Only apply if internal 'log' event is used
option.logLevel             = "debug";                       // The minimum log level to show. (debug|info|warning|error|none)
option.logDateEnable        = true;                        // Display timestamp in each entry
option.logErrorStackEnable  = true;                         // print the stack trace in logged errors when available
option.logWarningStackEnable= true;                         // print the stack trace in logged warnings when available
option.logColorEnable       = true;                         // include console colors. Disable if forwarding logs to files or databases
option.logObjectDepth       = 7;                            // When objects are included in the log, this is the max depth the log will display
option.logMessagesEnable    = true;                        // Log the full contents of incoming and outgoing messages. Also requires the logLevel to be set at "debug". Introduces security and performance concerns.

// Miscellaneous Server Options
option.updateCheckEnable    = true;                         // Checks for updates


// Regular expressions for validating names and other input
option.apiVersionRegExp     = /^[a-z0-9_.+-]{1,32}$/i;      // API Version
option.appNameRegExp        = /^[a-z0-9_.-]{1,32}$/i;       // Application name
option.easyrtcidRegExp      = /^[a-z0-9_.-]{1,32}$/i;       // EasyRTC socket id (easyrtcid)
option.easyrtcsidRegExp     = /^[a-z0-9_.-]{1,64}$/i;       // EasyRTC session id (easyrtcsid)
option.groupNameRegExp      = /^[a-z0-9_.-]{1,32}$/i;       // Group name
option.fieldNameRegExp      = /^[a-z0-9_. -]{1,32}$/i;      // Field names (for defining app and room custom fields)
option.optionNameRegExp     = /^[a-z0-9_. -]{1,32}$/i;      // Option names (for defining server options)
option.presenceShowRegExp   = /^(away|chat|dnd|xa)$/;       // Allowed presence "show" values (for setPresence command)
option.presenceStatusRegExp = /^(.){0,255}$/;               // Allowed presence "status" value
option.roomNameRegExp       = /^[a-z0-9_.-]{1,32}$/i;       // Room name
option.usernameRegExp       = /^(.){1,64}$/i;               // Username



// Allows the option object to be seen by the caller.
module.exports = option;
