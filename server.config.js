module.exports = {
	port: 3000,
	cookieSecret:'a664simfdalfasdfasdadsfadfaf',
	meta: {
		name: 'A node Project',
		logo:'',
		description:'没有什么秒杀',
		keywords:'关键字是什么鬼'
	},
	session: {
 		secret:'a simple secret', // 正式环境先建议用128个字符的随机字符串
 		cookie:{ maxAge: 60*10000 } // 时效10分钟
	},
	sqlServer:{
		host:'127.0.0.1',
		port:27017,
		database:'testdb'
	}
}