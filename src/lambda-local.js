const lambdaLocal = require("lambda-local");
const path = require("node:path");

const jsonPayload = {
	key: 1,
	another_key: "Some text",
};

lambdaLocal
	.execute({
		event: jsonPayload,
		lambdaPath: path.join(__dirname, "../dist", "index.js"),
		profilePath: "~/.aws/credentials",
		profileName: "default",
		timeoutMs: 3000,
		watch: 8080,
	})
	.then((done) => {
		console.log(done);
	})
	.catch((err) => {
		console.log(err);
	});
