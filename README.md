# AWS Multi-Cert Prep App

Aplicacion web local para preparar varias certificaciones AWS en una sola experiencia:

- `AWS Certified Cloud Practitioner (CLF-C02)`
- `AWS Certified Solutions Architect - Associate (SAA-C03)`

Incluye:

- selector de certificacion en el inicio
- login basico por usuario
- simulacion completa por certificacion
- mini tests por dominio
- modo de refuerzo por debilidades
- historial persistente
- objetivos independientes por examen
- despliegue con Docker

## Perfiles

- GitHub: [fraactal](https://github.com/fraactal)
- LinkedIn: [Jonathan Valdes Osorio](https://www.linkedin.com/in/jonathanvaldesosorio/)

## Arquitectura

- Frontend estatico:
  - [index.html](C:\Users\Jona\Documents\Preparacion AWS Particioner\index.html)
  - [styles.css](C:\Users\Jona\Documents\Preparacion AWS Particioner\styles.css)
  - [app.js](C:\Users\Jona\Documents\Preparacion AWS Particioner\app.js)
  - [data.js](C:\Users\Jona\Documents\Preparacion AWS Particioner\data.js)
- Backend HTTP:
  - [server.js](C:\Users\Jona\Documents\Preparacion AWS Particioner\server.js)
- Persistencia:
  - SQLite en `prep.db`
- Docker:
  - [Dockerfile](C:\Users\Jona\Documents\Preparacion AWS Particioner\Dockerfile)
  - [docker-compose.yml](C:\Users\Jona\Documents\Preparacion AWS Particioner\docker-compose.yml)

## Certificaciones soportadas

### Cloud Practitioner

- blueprint rector:
  - `guia-cloud-practitioner-02.pdf`
- modulos de apoyo:
  - carpeta `AWS-Particioner-Docs`

### Solutions Architect Associate

- blueprint rector:
  - `solutions-architect-associate-03.pdf`
- modulos de apoyo:
  - carpeta `AWS-Architect-Docs`

## Persistencia

La aplicacion usa SQLite y ahora guarda el estado por usuario autenticado.

Se guarda:

- cuenta del usuario
- sesion persistente por cookie HTTP-only
- certificacion actualmente seleccionada
- configuracion de objetivos por certificacion
- historial de examenes por certificacion
- examen en curso por certificacion

Ubicaciones tipicas:

- local sin Docker:
  - `.\data\prep.db`
- Docker:
  - `/data/prep.db`
- `docker-compose`:
  - `.\runtime-data\prep.db`

## Migracion del historial anterior

Si ya tenias datos de la version anterior, no se pierden.

La app migra automaticamente el estado legado al nuevo esquema:

- el historial anterior se conserva bajo `Cloud Practitioner`
- tu primer diagnostico anterior sigue asociado a esa certificacion
- desde ahora cada examen mantiene su propio historial y objetivos

## Como ejecutar localmente

Requiere Node.js.

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar servidor:

```bash
npm start
```

Variables opcionales:

```bash
set DATABASE_PATH=.\data\prep.db
set PORT=3080
```

3. Abrir:

```text
http://localhost:3080
```

4. Acceso demo:

- la app trae un usuario demo precargado
- correo: `jonathan.valdes.o@gmail.com`
- clave: `Metal4ever`
- no se permite crear nuevos usuarios desde la interfaz

## Como ejecutar con Docker

### Opcion 1: Docker directo

```bash
docker build -t aws-prep-app .
docker run --rm -p 3080:3080 -v ${PWD}/runtime-data:/data aws-prep-app
```

### Opcion 2: Docker Compose

```bash
docker compose up --build
```

La app quedara en:

```text
http://localhost:3080
```

La base SQLite persistira en:

```text
.\runtime-data\prep.db
```

## API

- `GET /api/auth/session`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/health`
- `GET /api/state`
- `PUT /api/state`

## Logs de autenticacion

El backend registra intentos de login y logout en dos lugares:

- consola del servidor con prefijo `auth`
- tabla SQLite `auth_logs` dentro de la misma base `prep.db`

Se registra:

- evento
- correo usado
- resultado
- motivo
- IP
- user-agent
- timestamp

## Demo en AWS

Para una demo funcional y persistente, GitHub Pages no alcanza porque esta app necesita backend, sesiones y SQLite.

El despliegue mas simple en AWS para demo personal es:

- `EC2` con Docker Compose si quieres velocidad y control directo
- o `ECS Fargate` con almacenamiento persistente si luego quieres automatizar CI/CD

Si mantienes SQLite para demo, evita escalar a varias instancias simultaneas del contenedor.

La demo publicada queda pensada para un solo usuario controlado, sin alta pública.

## Trazabilidad documental

La app ya diferencia dos conjuntos documentales y dos blueprints oficiales.

Quedo implementado:

- un blueprint rector por certificacion
- listado de modulos por ruta documental
- trazabilidad por:
  - dominio
  - tema
  - guia oficial
  - archivo sugerido para repaso
  - seccion sugerida

Limitacion actual:

- En esta sesion no fue posible extraer automaticamente capitulos y encabezados reales desde los PDFs.
- Por eso la app referencia secciones sugeridas alineadas por dominio, no aun por pagina o encabezado exacto.

## Validacion

Si quedo validado:

- arranque simulado del frontend con el nuevo esquema multi-certificacion
- deteccion de ambas certificaciones en `data.js`
- migracion logica del estado hacia buckets por examen

No quedo validado en esta sesion:

- `npm install`
- ejecucion real del servidor con Node local
- build real de Docker

La razon es que este entorno no expone Node/NPM utilizables desde el shell actual.
