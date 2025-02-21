import fs from "node:fs";
import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	BatchWriteCommand,
	type BatchWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";

interface Todo {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

// Initialize DynamoDB client
const client = new DynamoDBClient({
	region: "ap-east-1",
});
const docClient = DynamoDBDocumentClient.from(client);

async function describeTable() {
	try {
		const command = new DescribeTableCommand({
			TableName: "test",
		});
		const response = await client.send(command);
		console.log("Table details:", JSON.stringify(response.Table, null, 2));
		return response.Table;
	} catch (error) {
		console.error("Error describing table:", error);
		throw error;
	}
}

async function fetchAndSaveTodos() {
	try {
		// Fetch todos from API
		const response = await fetch("https://jsonplaceholder.typicode.com/todos");
		const todos: Todo[] = await response.json();

		// Save raw JSON to file
		fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
		console.log("Todos saved to todos.json");

		// Prepare batch writes in chunks of 25 items
		const CHUNK_SIZE = 25;
		const batchWrites: BatchWriteCommandInput[] = Array.from(
			{ length: Math.ceil(todos.length / CHUNK_SIZE) },
			(_, i) => {
				const startIndex = i * CHUNK_SIZE;
				const endIndex = startIndex + CHUNK_SIZE;
				const timestamp = new Date().toISOString();
				return {
					RequestItems: {
						test: todos.slice(startIndex, endIndex).map((todo) => ({
							PutRequest: {
								Item: {
									id: todo.id.toString(),
									timestamp,
									userId: todo.userId.toString(),
									title: todo.title,
									completed: todo.completed,
								},
							},
						})),
					},
				};
			},
		);

		console.log(`Prepared ${batchWrites.length} batch write operations`);

		// Save the prepared batch operations to a file
		fs.writeFileSync(
			"dynamodb-batch-operations.json",
			JSON.stringify(batchWrites, null, 2),
		);
		console.log("Batch operations saved to dynamodb-batch-operations.json");

		// Execute batch writes
		for (const batchWrite of batchWrites) {
			const command = new BatchWriteCommand(batchWrite);
			await docClient.send(command);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

(async () => {
	await describeTable();
	await fetchAndSaveTodos();
})();
