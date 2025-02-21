import express from "express";
import { handler } from "./index";
import type { APIGatewayProxyEvent } from "aws-lambda";

const app = express();
const port = 8008;

// Middleware to parse JSON bodies
app.use(express.json());

// Convert Express request to API Gateway V1 event
const createAPIGatewayEvent = (req: express.Request): APIGatewayProxyEvent => {
	const event: APIGatewayProxyEvent = {
		body:
			typeof req.body === "string"
				? req.body
				: JSON.stringify(req.body || null),
		headers: req.headers as { [key: string]: string },
		multiValueHeaders: {},
		httpMethod: req.method,
		isBase64Encoded: false,
		path: req.path,
		pathParameters: null,
		queryStringParameters: (req.query as { [key: string]: string }) || null,
		multiValueQueryStringParameters: null,
		stageVariables: null,
		requestContext: {
			accountId: "123456789012",
			apiId: "api-id",
			authorizer: {},
			protocol: req.protocol,
			httpMethod: req.method,
			identity: {
				accessKey: null,
				accountId: null,
				apiKey: null,
				apiKeyId: null,
				caller: null,
				clientCert: null,
				cognitoAuthenticationProvider: null,
				cognitoAuthenticationType: null,
				cognitoIdentityId: null,
				cognitoIdentityPoolId: null,
				principalOrgId: null,
				sourceIp: req.ip ?? "",
				user: null,
				userAgent: req.get("user-agent") || null,
				userArn: null,
			},
			path: req.path,
			stage: "$default",
			requestId: "id",
			requestTimeEpoch: Date.now(),
			resourceId: "123456",
			resourcePath: req.path,
		},
		resource: req.path,
	};

	return event;
};

// Handle all routes
app.all("*", async (req, res) => {
	try {
		const event = createAPIGatewayEvent(req);
		const result = await handler(event);

		// Set status code
		res.status(result.statusCode);

		// Set headers if any
		if (result.headers) {
			for (const [key, value] of Object.entries(result.headers)) {
				res.setHeader(key, value as string);
			}
		}

		// Send response with json header
		res.setHeader("Content-Type", "application/json");
		res.send(result.body);
	} catch (error) {
		console.error("Error processing request:", error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
