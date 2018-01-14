# 使用rabbitmq解决一个超卖的例子

## 项目名称为什么叫notbad？

> 因为这种方式还行还没达到最好的结果

## 使用

1. brew cask install rabbitmq-app
2. 启动rabbitmq-app
3. npm install
4. node app.js 启动web server
5. node rabbitMQServer.js 启动rabbitMQServer
6. 执行压力测试 siege -c 100 -r 10 -q http://localhost:3000/buy   
7. 查看数据库插入了多少条

## TODO

此例子还有缺陷，siege命令执行后不退出

## 压力测试工具安装

1. brew update
2. brew install siege

## 压力测试方法

siege -c 100 -r 10 -q http://localhost:3000/buy

siege -c 200 -r 10 -q http://localhost:3000/buy

siege -c 300 -r 10 -q http://localhost:3000/buy

```
siege --help
Usage: siege [options]
       siege [options] URL
       siege -g URL
Options:
  -V, --version             VERSION, prints the version number.
  -h, --help                HELP, prints this section.
  -C, --config              CONFIGURATION, show the current config.
                            #在屏幕上打印显示出当前的配置,配置是包括在他的配置文件$HOME/.siegerc中,
                            #可以编辑里面的参数,这样每次siege 都会按照它运行.
  -v, --verbose             VERBOSE, prints notification to screen.
                            #运行时能看到详细的运行信息
  -q, --quiet               QUIET turns verbose off and suppresses output.
  -g, --get                 GET, pull down HTTP headers and display the
                            transaction. Great for application debugging.
  -c, --concurrent=NUM      CONCURRENT users, default is 10
                            #模拟有n个用户在同时访问,n不要设得太大,因为越大,siege 消耗本地机器的资源越多
  -i, --internet            INTERNET user simulation, hits URLs randomly.
                            #随机访问urls.txt中的url列表项,以此模拟真实的访问情况(随机性)
  -b, --benchmark           BENCHMARK: no delays between requests.
  -t, --time=NUMm           TIMED testing where "m" is modifier S, M, or H
                            ex: --time=1H, one hour test.
                            #持续运行siege ‘n’秒(如10S),分钟(10M),小时(10H)
  -r, --reps=NUM            REPS, number of times to run the test.
                            #重复运行测试n次,不能与 -t同时存在
  -f, --file=FILE           FILE, select a specific URLS FILE.
                            #指定用urls文件,默认为siege安装目录下的etc/urls.txt
                            #urls.txt文件：是很多行待测试URL的列表以换行符断开,格式为:
                            #[protocol://]host.domain.com[:port][path/to/file]
  -R, --rc=FILE             RC, specify an siegerc file
                            #指定用特定的siege配置文件来运行,默认的为$HOME/.siegerc
  -l, --log[=FILE]          LOG to FILE. If FILE is not specified, the
                            default is used: PREFIX/var/siege.log
                            #运行结束,将统计数据保存到日志文件siege.log中,可在.siegerc中自定义日志文件
  -m, --mark="text"         MARK, mark the log file with a string.
  -d, --delay=NUM           Time DELAY, random delay before each requst
                            between 1 and NUM. (NOT COUNTED IN STATS)
                            #hit每个url之间的延迟,在0-n之间
  -H, --header="text"       Add a header to request (can be many)
  -A, --user-agent="text"   Sets User-Agent in request
  -T, --content-type="text" Sets Content-Type in request

  ```