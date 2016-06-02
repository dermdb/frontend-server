function errorHandler(packet, e, endpoint){
    if (typeof packet !== "undefined") {
        var message;
        if (typeof packet.data === "string"){
            message = packet.data;
        } else if (typeof packet.data !== "undefined" && typeof packet.data.message !== "undefined"){
            message = packet.data.message;
        } else {
            message = packet.data;
        }
        BootstrapDialog.alert({
            title: packet.code + " - " + packet.status,
            message:  message,
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttonLabel: 'Continue' // <-- Default value is 'OK',
        });
    } else {
        BootstrapDialog.alert({
            title: 'Error',
            message: endpoint.method + " to " + endpoint.url + " failed: " + e.statusText + " - " + e.status,
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttonLabel: 'Continue' // <-- Default value is 'OK',
        });
    }
}

function ajax(data, endpoint, callback) {
    var packet = JSON.stringify(data);
    var host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    var obj = {
        url: host + "/_" + endpoint.url,
        method: endpoint.method,
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            BootstrapDialog.alert({
                title: 'Success',
                message: JSON.stringify(res),
                type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: true, // <-- Default value is false
                draggable: true, // <-- Default value is false
                buttonLabel: 'Continue' // <-- Default value is 'OK',
            });
            var status = res.status || res.responseText || res.statusText;
            Logger("transport", "Ajax", "Response: " + status);
            if (res.status === "ok") {
                Logger("success", "Ajax", endpoint.method + " to " + endpoint.url + " succeeded.");
                callback(null, res);
            } else {
                Logger("warning", "Ajax", endpoint.method + " to " + endpoint.url + " failed.");
                callback(null, res);
            }
        },
        error: function (e) {
            var packet = e.responseJSON;
            Logger("error", "Ajax", endpoint.method + " to " + endpoint.url + " failed: " + e.statusText + " - " + e.status);
            if (typeof packet !== "undefined" && typeof packet.data !== "undefined") {
                Logger("error", "Ajax", packet.data.message + ": " + packet.data.description);
            }
            errorHandler(packet, e, endpoint);
            callback(packet);
        }
    };

    console.log("transport", "AJAX", obj.method + " " + obj.url);

    if (data !== null && typeof data !== "undefined") {
        obj.data = packet;
    }

    $.ajax(obj);
}

var endpoints = {
    "LOGIN": {
        url: "/auth/login",
        method: "POST"
    },
    "LOGOUT": {
        url: "/auth/logout",
        method: "DELETE"
    },
    "CREATE_ACCOUNT": {
        url: "/auth/create",
        method: "POST"
    },
    "SUBMIT_PROBLEM": {
        url: "/problems",
        method: "POST"
    },
    "SUBMIT_SNAPSHOT":{
        url: "/snapshots",
        method: "POST"
    },
    "UPDATE_ACCOUNT": {
        url: "/account",
        method: "PUT"
    }
};