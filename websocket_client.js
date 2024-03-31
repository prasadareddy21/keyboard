var ws;

function connect() {
    ws = new WebSocket("ws://localhost:8765"); // Replace with your WebSocket server address
    ws.onopen = function() {
        console.log("Connected to WebSocket server");
        // Add event listeners for mouse movement, clicks, and keyboard inputs
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKeyDown);
    };
    ws.onmessage = function(event) {
        console.log("Message from server: ", event.data);
    };
    ws.onclose = function() {
        console.log("Disconnected from WebSocket server");
        // Remove event listeners when disconnected
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("click", onClick);
        document.removeEventListener("keydown", onKeyDown);
    };
}

function disconnect() {
    if (ws) {
        ws.close();
        ws = null;
    }
}

function onMouseMove(event) {
    // Send mouse coordinates to server
    if (ws && ws.readyState === WebSocket.OPEN) {
        var message = {
            type: "mousemove",
            x: event.clientX,
            y: event.clientY
        };
        ws.send(JSON.stringify(message));
    }
}

function onClick(event) {
    // Send mouse click event to server
    if (ws && ws.readyState === WebSocket.OPEN) {
        var message = {
            type: "click",
            x: event.clientX,
            y: event.clientY
        };
        ws.send(JSON.stringify(message));
    }
}

function onKeyDown(event) {
    // Send keyboard input to server
    if (ws && ws.readyState === WebSocket.OPEN) {
        var message = {
            type: "keydown",
            key: event.key
        };
        ws.send(JSON.stringify(message));
    }
}
