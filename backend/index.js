"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 8080;
const serverOptions = {
    cors: {
        origin: [
            "https://admin.socket.io",
            "http://localhost:4201",
            "http://192.168.0.103:4201",
            "http://localhost:4200",
            "http://192.168.0.103:4200",
        ],
        credentials: true,
    },
};
(0, app_1.createServer)(port, serverOptions);
