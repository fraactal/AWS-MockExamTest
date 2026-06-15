# AWS Multi-Cert Prep App

Aplicacion web local para preparar varias certificaciones AWS en una sola experiencia:

- `AWS Certified Cloud Practitioner (CLF-C02)`
- `AWS Certified Solutions Architect - Associate (SAA-C03)`

Incluye:

- selector de certificacion en el inicio
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

La aplicacion usa una sola base SQLite y separa el estado por certificacion dentro del mismo registro persistido.

Se guarda:

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

3. Abrir:

```text
http://localhost:3080
```

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

- `GET /api/health`
- `GET /api/state`
- `PUT /api/state`

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
