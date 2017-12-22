const koa = require('koa');
const route = require('koa-route');
const app = new koa();
const OrderModel = require('./Order');
const OrderSum = require('./OrderSum');
const listenPort = 3000;

app.use(route.get('/', async(ctx) => {
	return ctx.body = "working...";
}));

app.use(route.get('/buy', async(ctx) => {
	const sum = await OrderSum.findOneAndUpdate({
		id: 'ordersum',
		sum: {
			$lt: 100
		}
	}, {
		$inc: {
			sum: 1
		}
	});
	if (!sum) {
		ctx.status = 400;
		return ctx.body = '很遗憾，卖没了...';
	} else {
		const model = await OrderModel.create({
			name: Date.now()
		});
		if (model) {
			ctx.status = 200;
			return ctx.body = '耶，抢到了...';
		}
	}
}));

app.listen(listenPort, async() => {
	await OrderSum.remove({});
	await OrderSum.create({ id: 'ordersum', sum: 0 });
	console.log('Server listening on:',3000);
});
