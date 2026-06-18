# AGENTS.md

## Repository Role

- Este repositorio se integra con un Jenkins centralizado.
- La configuración del controlador Jenkins vive en el repositorio `automation-platform`.
- Este repositorio sigue siendo dueño de su pipeline, su infraestructura y sus reglas de despliegue.

## Ownership Boundaries

- El pipeline de este repositorio vive en `Jenkinsfile`.
- La infraestructura de este repositorio vive en `infra/terraform`.
- Los ejemplos de variables y configuración viven en archivos versionables de ejemplo.
- La lógica específica de despliegue de esta app no debe moverse al Jenkins central salvo que se convierta en una necesidad transversal.

## Jenkins Integration

- El punto de entrada del pipeline es `Jenkinsfile` en la raíz del repositorio.
- Las credenciales de Jenkins usan IDs con prefijo `aws-mockexamtest`.
- Los despliegues a producción están protegidos con aprobación explícita.
- El pipeline resuelve ambiente por rama y despliega vía `terraform` + `ssh` a una instancia EC2 por ambiente.

## Terraform Rules

- Terraform de este repositorio vive bajo `infra/terraform`.
- El backend está separado por ambiente.
- El estado no debe compartirse con otros repositorios.
- `apply` solo debe ejecutarse en ramas o flujos aprobados.

## Secrets

- Los secretos no se guardan en Git.
- Los secretos se inyectan desde Jenkins Credentials o desde un secret manager externo.
- Si el pipeline necesita `.env`, debe cargarse como credencial segura, no como archivo versionado.

## Environments

- `develop` -> `demo`
- `staging` -> `staging`
- `main` -> `production`

## Required Credential Inventory

- `aws-mockexamtest-demo-aws`
- `aws-mockexamtest-demo-tf-backend`
- `aws-mockexamtest-demo-env-file`
- `aws-mockexamtest-demo-ssh`
- `aws-mockexamtest-staging-aws`
- `aws-mockexamtest-staging-tf-backend`
- `aws-mockexamtest-staging-env-file`
- `aws-mockexamtest-staging-ssh`
- `aws-mockexamtest-production-aws`
- `aws-mockexamtest-production-tf-backend`
- `aws-mockexamtest-production-env-file`
- `aws-mockexamtest-production-ssh`

## Operational Notes

- El pipeline empaqueta la app, ejecuta `terraform init/validate/plan/apply`, obtiene el host desde outputs y despliega por `ssh` usando Docker Compose.
- Cada ambiente vive en su propia instancia EC2 con volumen persistente local para `runtime-data`.
- El rollback mínimo esperado es volver a ejecutar el pipeline con un commit previo o desplegar manualmente un release anterior en el host remoto.

## Safe Change Rules

- No cambiar plugins ni configuración central de Jenkins desde este repositorio.
- No cambiar la automatización de otros repositorios desde este repositorio.
- No centralizar Terraform de esta app fuera de este repo.
- No agregar secretos reales al control de versiones.
