# Mynance

My finance, at my hand.

## Monorepo

### Git Hooks

Set this pre-commit hook to strip Jupyter notebooks output (edit `.git/hooks/pre-commit`):

```bash
#!/bin/sh

jupyter nbconvert --clear-output --inplace **/*.ipynb
make infra-lint
git add infra
git add *.ipynb
```

## infra

The `infra` folder contains the required AWS infrastructure for all apps (TBD: change to be per-app).  
Use `make` commands to manage it (`init`, `lint`, `plan`, `apply`, `destroy`).  
In order to interact with aws, create a `.env` file next to `Makefile`. It should contain `AWS_SECRET_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.

## masleka

## transactions-fetcher

transactions-fetcher is a cli tool to fetch transactions from Fibi(Beinleumi) and Max. It receive a string argument of --startdate (defaults to 1hr ago) and saves it to ./transactions_<startdate>

### Env Vars

Some env vars must be set for the fetch to be able to connect:

- BANK_USERNAME
- BANK_PASSWORD
- MAX_USERNAME
- MAX_PASSWORD
