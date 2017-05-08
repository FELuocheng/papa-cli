const supperAgent = require('superagent');
const cheerio = require('cheerio');
const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '--您正在使用papa-cli，按下回车看笑话--'
})

let url = 'http://www.qiushibaike.com/text/page/';

let page = 1;

let papaStories = [];
// 载入并存储
function loadPapa(){
	// 不足三条请求下一页
	if(papaStories.length < 10) {
		supperAgent
		.get(url+page)
		.end( (err, res) => {
			if(err) {
				console.log(console.error(err))
			}
			const $ = cheerio.load(res.text);
			const papa_list = $('.article .content span');
			papa_list.each( function(i, item){
				console.log($(this).text() + '<br>') ;//打印每一条
			})
			page++;
		})
	}
}
rl.prompt();
loadPapa();
// line事件 每当 input 流接收到接收行结束符（\n、\r 或 \r\n）时触发 'line' 事件。 通常发生在用户按下 <Enter> 键或 <Return> 键。
// 按下回车键显示一条笑话
rl.on('line', (line) => {
	console.log(papaStories)
	if(papaStories.length > 0){
		console.log("===============");
		console.log(papaStories.shift().bgCyan.black); //用colors模块改变输出颜色
		loadPapa();
	}else{
		console.log('加载中-------<br>'.green);
	}
	loadPapa();
	rl.prompt();
}).on('close', () => {
	console.log('<br>bye@');
	process.exit(0);
})
// supperAgent
// 	.get(url+page)
// 	.end( (err, res) => {
// 		if(err) {
// 			console.log(console.error(err))
// 		}
// 		console.log(res.text)
// 		const $ = cheerio.load(res.text);
// 		const papa_list = $('.article .content span');
// 		papa_list.each( function(i, item){
// 			console.log($(this).text());//打印每一条
// 		})
// 	})

