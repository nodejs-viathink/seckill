const koa = require('koa');
const route = require('koa-route');
const app = new koa();
const OrderModel = require('./Order');
const listenPort = 3000;

app.use(route.get('/', async(ctx) => {
	return ctx.body = "working...";
}));

app.use(route.get('/buy', async(ctx) => {
	// 这里是有优化办法的，故意弄个坑，偶尔跳一下，也挺好...
	const count = await OrderModel.count({});
	if (count > 100) {
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

app.listen(listenPort, () => {
	console.log('Server listening on:',3000);
});