terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  cloud {
    organization = "konfortes"

    workspaces {
      name = "mynance"
    }
  }

  # backend "local" {
  #   path = "terraform.tfstate"
  # }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "test" {
  name           = "test"
  hash_key       = "TestTableHashKey"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "Transactions"
    type = "S"
  }
}