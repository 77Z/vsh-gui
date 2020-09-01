const Terminal = require("xterm").Terminal;
const FitAddon = require("xterm-addon-fit").FitAddon;

var urlMode = true;

var urlHolder = document.getElementById("urlHolder");

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

term.open(document.getElementById("terminal"));

term.write("Enter a url to connect to: (style: <ip[:port]>\r\nExample: localhost:2020  example.com)\r\n");

term.onData(e => {
    if (urlMode) {
        //input uri
        if (e == "\r") {
            runConnection(urlHolder.value);
            urlMode = false;
        } else {
            term.write(e);
        urlHolder.value += e;
        }
    }
});

function runConnection(uri) {
    var customPort = false;
    if (uri.includes(":")) {
        customPort = true;
    }

    var url = uri;
    var port = 2020;
    if (customPort) {
        url = uri.split(":")[0];
        port = uri.split(":")[1];
    }

    term.write("Connecting to VSH on " + url + " and port " + port + "...\r\n");

    const client = new WebSocket("ws://" + url + ":" + port);

    client.onopen = function() {
        term.write("Connection Open, Waiting for terminal...\r\n");
        //client.send("CON:");
    };

    client.onmessage = function(e) {
        term.write(e.data);
    }

    term.onData(e => {
        client.send(e);
    });
}

setInterval(function() {
    fitAddon.fit();
}, 600);

