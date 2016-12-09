var argv = require('minimist')(process.argv.slice(2));

console.dir(argv);

console.log(
	"Здравствуйте, уважаемый " 
	+ ((process.env['NODE_ENV'] == 'dev') ? "разработчик " : "пользователь ")
	+ process.platform
	+ (argv['debug'] ? ". Режим отладки включен." : "")
);