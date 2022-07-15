# load .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

infra-init:
	@echo "Running terraform init"
	terraform -chdir=infra init

infra-fmt:
	@echo "Running terraform fmt"
	terraform fmt -recursive -write=true
infra-validate:
	@echo "Running terraform validate"
	terraform -chdir=infra validate

infra-lint: infra-fmt infra-validate

infra-plan: infra-init
	@echo "Running terraform plan"
	terraform -chdir=infra plan

infra-apply: infra-init
	@echo "Running terraform apply"
	terraform -chdir=infra apply

infra-destroy: infra-init
	@echo "Running terraform destroy"
	terraform -chdir=infra destroy

airflow-start:
	@echo "Running airflow"
	docker-compose -f budget-tracker/dev/docker-compose.yaml up -d
airflow-stop:
	@echo "Stopping airflow"
	docker-compose -f budget-tracker/dev/docker-compose.yaml down
airflow-status:
	docker-compose -f budget-tracker/dev/docker-compose.yaml ps
airflow-shell:
	@ echo "A workaround for non-working docker-compose exec"
	docker exec -it dev_airflow-webserver_1 bash