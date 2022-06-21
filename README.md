# Mynance

My finance, at my hand.

## masleka

### Git Hooks

Set this pre-commit hook to strip Jupyter notebooks output (edit `.git/hooks/pre-commit`):

```bash
#!/bin/sh

jupyter nbconvert --clear-output --inplace **/*.ipynb
git add .
```
