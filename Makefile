# load .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

init:
	@echo "Running terraform init"
	terraform -chdir=infra init

lint:
	@echo "Running terraform fmt and validate"
	cd infra && fmt -recursive -write=true && terraform validate

plan:
	@echo "Running terraform plan"
	cd infra && terraform init && terraform plan

apply:
	@echo "Running terraform apply"
	cd infra && terraform init && terraform apply

destroy:
	@echo "Running terraform destroy"
	cd infra && terraform init && terraform destroy