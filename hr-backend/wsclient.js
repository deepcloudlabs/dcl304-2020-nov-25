let Websocket = require("ws");

let ws = new Websocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
// REST over HTTP -> Resource
// REST over WS   -> Business Event
ws.on('message', frame => {
   let trade = JSON.parse(frame);
   console.log(trade);
});