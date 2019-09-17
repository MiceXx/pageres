const pageres = require('../dist/index');

(async () => {
	await pageres('https://github.com/', __dirname + '/output', 480, 320, {
		crop: true,
		delay: 2
	});
})();
(async () => {
	await pageres('https://google.ca', __dirname + '/output', 1280, 1024, {
		filename: 'gooogle'
	});
})();
(async () => {
	await pageres('data:text/html,<h1>Awesome!</h1>', __dirname + '/output', 1024, 768, {
		delay: 2
	});
})();
