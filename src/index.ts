import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	try {
		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: "Hello from TypeScript Lambda!",
				input: event,
			}),
		};
		return response;
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal server error",
			}),
		};
	}
};
