# load .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

infra-init:
	@echo "Running terraform init"
	terraform -chdir=infra/terraform init

infra-fmt:
	@echo "Running terraform fmt"
	terraform fmt -recursive -write=true
infra-validate:
	@echo "Running terraform validate"
	terraform -chdir=infra/terraform validate

infra-lint: infra-fmt infra-validate

infra-plan: infra-init
	@echo "Running terraform plan"
	terraform -chdir=infra/terraform plan

infra-apply: infra-init
	@echo "Running terraform apply"
	terraform -chdir=infra/terraform apply

infra-destroy: infra-init
	@echo "Running terraform destroy"
	terraform -chdir=infra/terraform destroy

airflow-start:
	@echo "Running airflow"
	docker-compose -f infra/airflow/docker-compose.yaml up -d
airflow-stop:
	@echo "Stopping airflow"
	docker-compose -f infra/airflow/docker-compose.yaml down
airflow-status:
	docker-compose -f infra/airflow/docker-compose.yaml ps