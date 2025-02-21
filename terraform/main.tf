terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Define the AWS provider
provider "aws" {
  region = "ap-east-1" # Your preferred region
}

# region Lambda code
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "../dist/index.js" # Relative path to your compiled file
  output_path = "lambda.zip"       # Where the zip will be created
}

# IAM Role for Lambda to assume
resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda_exec_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# Attach a policy for CloudWatch Logs
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Define the Lambda function
resource "aws_lambda_function" "my_lambda" {
  function_name    = "typescript-playground-lambda"
  handler          = "index.handler" # Matches your TS export
  runtime          = "nodejs20.x"    # Matches your esbuild target
  role             = aws_iam_role.lambda_exec_role.arn
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  memory_size = 128 # MB
  timeout     = 3   # Seconds
}

# region API Gateway
resource "aws_apigatewayv2_api" "lambda_api" {
  name          = "typescript-playground-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda_stage" {
  api_id      = aws_apigatewayv2_api.lambda_api.id
  name        = "dev"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id               = aws_apigatewayv2_api.lambda_api.id
  integration_type     = "AWS_PROXY"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.my_lambda.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "lambda_route" {
  api_id    = aws_apigatewayv2_api.lambda_api.id
  route_key = "POST /typescript-playground"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}


# Lambda permission for API Gateway
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.my_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda_api.execution_arn}/*/*"
}

# Output the Lambda ARN
output "lambda_arn" {
  value = aws_lambda_function.my_lambda.arn
}

# Output the API Gateway URL
output "api_gateway_url" {
  value = "${aws_apigatewayv2_stage.lambda_stage.invoke_url}/typescript-playground"
}
