# 秒杀及并发的一些例子

## 项目一 loser

> [koa + mongodb 实现的反面版超卖例子](https://github.com/nodejs-viathink/seckill/tree/master/loser)


## TODO 其他好的或者不好的例子

## common项目

> 对loser项目进行了优化，会出现超卖是因为查询和插入并不是一个事务

解决方案：单独维护一个表来记录和更新商品数量，这样能使用原子操作语句来操作，得到的是准确的条件。
