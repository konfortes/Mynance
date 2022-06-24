# load .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

init:
	@echo "Running terraform init"
	terraform -chdir=infra init

fmt:
	@echo "Running terraform fmt"
	terraform fmt -recursive -write=true
validate:
	@echo "Running terraform validate"
	terraform -chdir=infra validate

lint: fmt validate

plan: init
	@echo "Running terraform plan"
	terraform -chdir=infra plan

apply: init
	@echo "Running terraform apply"
	terraform -chdir=infra apply

destroy: init
	@echo "Running terraform destroy"
	terraform -chdir=infra destroy