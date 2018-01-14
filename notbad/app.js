const koa = require('koa');
const route = require('koa-route');
const amqp = require('amqplib');
const app = new koa();
const uuidv4 = require('uuid/v4');
const requestQueue = 'requestQueue';
const responseQueue = 'responseQueue';
const amqpUrl = 'amqp://127.0.0.1';
const listenPort = 3000;
let conn = null;

app.use(route.get('/', async(ctx) => {
	return ctx.body = "working...";
}));

const waitResponse = async() => {
	return new Promise((resolve) => {
		const sessionId = uuidv4();
		conn.createChannel().then((channel) => {
			channel.prefetch(1);
			channel.assertQueue(responseQueue, { durable: false }).then(() => {
				channel.consume(responseQueue, (msg) => {
					const resp = JSON.parse(msg.content.toString());
					if (sessionId === resp.sessionId) {
						resolve(resp.response);
						channel.ack(msg);
						channel.close();
					}
				}, { noAck: false });
			});
			channel.sendToQueue(requestQueue, new Buffer(sessionId));
		});
	});
};

app.use(route.get('/buy', async(ctx) => {
	const resp = await waitResponse();
	return ctx.body = resp;
}));

app.listen(listenPort, async() => {
	conn = await amqp.connect(amqpUrl);
	console.log('Server listening on:',3000);
});