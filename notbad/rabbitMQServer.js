const amqp = require('amqplib');
const OrderModel = require('./Order');
const requestQueue = 'requestQueue';
const responseQueue = 'responseQueue';
const amqpUrl = 'amqp://127.0.0.1';
const startServer = async() => {
    const conn = await amqp.connect(amqpUrl);
    process.once('SIGN', () => {
        conn.close();
    });
    const channel = await conn.createChannel();
    await channel.assertQueue(requestQueue, { durable: false });
    await channel.prefetch(1);
    await channel.consume(requestQueue, async(msg) => {
        const sessionId = msg.content.toString();
        const count = await OrderModel.count({});
        let jsonStr;
        if (count >= 100) {
            jsonStr = JSON.stringify({
                sessionId,
                response: '很遗憾，卖没了...'
            });
            await channel.sendToQueue(responseQueue, new Buffer(jsonStr));
        } else {
            await OrderModel.create({
                name: Date.now()
            });
            jsonStr = JSON.stringify({
                sessionId,
                response: '耶，抢到了...'
            });
            await channel.sendToQueue(responseQueue, new Buffer(jsonStr));
        }
        await channel.ack(msg);
      }, { noAck: false });
    console.log('rabbitMQ server start...');
};

startServer().then();