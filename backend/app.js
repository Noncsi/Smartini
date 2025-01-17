"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.rooms = void 0;
const socket_io_1 = require("socket.io");
const eventHandlers_1 = require("./eventHandlers");
const log_1 = require("./log");
const admin_ui_1 = require("@socket.io/admin-ui");
exports.rooms = new Map();
const createServer = (port, serverOptions = {}) => {
    const io = new socket_io_1.Server(port, serverOptions);
    io.on("connection", (socket) => {
        socket.on("createRoom", () => (0, eventHandlers_1.createRoom)(socket));
        socket.on("connectPlayer", (roomCodeForReconnect, cb) => (0, eventHandlers_1.connectPlayer)(roomCodeForReconnect, cb));
        socket.on("joinRoom", (roomCode, playerName, cb) => {
            (0, eventHandlers_1.joinPlayerToRoom)(socket, roomCode, playerName, cb);
        });
        socket.on("reJoinRoom", (roomCode, playerId, cb) => {
            (0, eventHandlers_1.reJoinPlayerToRoom)(socket, roomCode, playerId, cb);
        });
        socket.on("setReady", (playerId, roomCode) => {
            (0, eventHandlers_1.setPlayerReadyStatus)(socket, playerId, roomCode);
        });
        socket.on("getQuestion", (roomCode) => __awaiter(void 0, void 0, void 0, function* () {
            (0, eventHandlers_1.getQuestion)(socket, roomCode);
        }));
        socket.on("answer", (playerId, text) => {
            (0, eventHandlers_1.checkAnswer)(socket, playerId, text);
        });
    });
    log_1.Log.info.serverIsRunning(port);
    (0, admin_ui_1.instrument)(io, { auth: false });
};
exports.createServer = createServer;
