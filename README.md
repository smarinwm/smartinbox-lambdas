# 📬 SmartInbox — AWS Serverless Lab

**SmartInbox** es un laboratorio práctico de arquitectura **serverless en AWS**, desarrollado para experimentar con la construcción y despliegue de una API backend utilizando **AWS Lambda, API Gateway, VPC, MySQL y Serverless Framework**.

La aplicación simula la gestión inteligente de una bandeja de entrada mediante endpoints para correos electrónicos, tareas, etiquetas, configuración de usuario y sugerencias de respuesta.

> **Estado del proyecto:** laboratorio finalizado. La infraestructura AWS utilizada durante las pruebas ya ha sido eliminada.

---

## 🎯 Objetivos del laboratorio

El proyecto fue desarrollado para poner en práctica conceptos relacionados con:

* Arquitecturas serverless en AWS
* Desarrollo de APIs mediante API Gateway
* Funciones AWS Lambda con Node.js
* Acceso desde Lambda a recursos dentro de una VPC
* Persistencia de datos con MySQL
* Configuración mediante variables de entorno
* Infraestructura y despliegue con Serverless Framework
* Pruebas automatizadas de endpoints con Python
* Integración de funcionalidades de asistencia inteligente

---

## 🏗️ Arquitectura

El flujo principal del laboratorio sigue esta arquitectura:

```text
Cliente
   │
   ▼
Amazon API Gateway
   │
   ▼
AWS Lambda
   │
   ├── Gestión de emails
   ├── Gestión de tareas
   ├── Configuración
   ├── Etiquetas
   └── Sugerencias de respuesta
   │
   ▼
VPC
   │
   ▼
MySQL
```

Las funciones Lambda se despliegan individualmente y se conectan a una VPC previamente configurada para acceder a la base de datos.

---

## 🚀 Tecnologías utilizadas

* **Node.js 18.x** — lógica de negocio de las funciones Lambda
* **AWS Lambda** — ejecución serverless
* **Amazon API Gateway (HTTP API)** — exposición de endpoints
* **MySQL** — persistencia de datos
* **Amazon VPC** — conectividad privada con la base de datos
* **Serverless Framework v3** — configuración y despliegue
* **Python + Requests** — pruebas automatizadas de la API
* **IAM** — permisos de ejecución de los servicios AWS

---

## 📁 Estructura del proyecto

```text
smartinbox-lambdas/
├── login/
│   └── index.js
├── getEmails/
├── getEmailById/
├── getTasks/
├── createTask/
├── getSettings/
├── updateSettings/
├── getLabels/
├── createLabel/
├── suggestResponse/
├── utils/
│   ├── db.js
│   └── auth.js
├── api_endpoints_checker.py
├── serverless.yml
└── README.md
```

Los archivos `.env` utilizados durante el desarrollo contienen configuración específica del entorno y no deben incluirse en el repositorio.

---

## 🌐 Endpoints

| Método | Ruta                   | Descripción                                      |
| ------ | ---------------------- | ------------------------------------------------ |
| `POST` | `/login`               | Simula el inicio de sesión del usuario           |
| `GET`  | `/emails`              | Obtiene los correos del usuario                  |
| `GET`  | `/emails/{id}`         | Obtiene un correo determinado                    |
| `GET`  | `/tasks`               | Obtiene las tareas                               |
| `POST` | `/tasks`               | Crea una nueva tarea                             |
| `GET`  | `/settings`            | Obtiene la configuración del usuario             |
| `PUT`  | `/settings`            | Actualiza las reglas y preferencias              |
| `GET`  | `/labels`              | Obtiene las etiquetas disponibles                |
| `POST` | `/labels`              | Crea una nueva etiqueta                          |
| `POST` | `/ai/suggest-response` | Genera una sugerencia de respuesta para un email |

---

## 🧪 Pruebas automatizadas

El script `api_endpoints_checker.py` permite realizar pruebas sobre los diferentes endpoints de la API.

### Instalación

```bash
pip install requests
```

### Ejecución

```bash
python api_endpoints_checker.py
```

El objetivo es comprobar el comportamiento de los endpoints y detectar posibles errores durante las pruebas del laboratorio.

---

## ☁️ Despliegue con Serverless Framework

### Requisitos

Para reproducir el laboratorio se necesita:

* Una cuenta AWS
* AWS CLI configurado
* Node.js
* Serverless Framework
* Una base de datos MySQL accesible desde las funciones Lambda
* Una VPC y subredes adecuadamente configuradas

Instalación de Serverless Framework:

```bash
npm install -g serverless
```

---

### Variables de entorno

La configuración utiliza variables de entorno para evitar introducir datos sensibles directamente en el código:

```text
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
```

Estas variables deben mantenerse fuera del control de versiones.

---

### Despliegue

```bash
sls deploy
```

Serverless Framework se encarga de desplegar y configurar las funciones Lambda y sus correspondientes endpoints de API Gateway.

Las funciones se conectan a una **VPC previamente existente** mediante los identificadores de sus subredes y grupo de seguridad.

---

## ⚙️ Ejemplo simplificado de `serverless.yml`

```yaml
service: smartinbox-api
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1

  role: arn:aws:iam::<AWS_ACCOUNT_ID>:role/<ROLE_NAME>

  environment:
    DB_HOST: ${env:DB_HOST}
    DB_USER: ${env:DB_USER}
    DB_PASS: ${env:DB_PASS}
    DB_NAME: ${env:DB_NAME}
    JWT_SECRET: ${env:JWT_SECRET}

  vpc:
    securityGroupIds:
      - <SECURITY_GROUP_ID>

    subnetIds:
      - <PRIVATE_SUBNET_ID_1>
      - <PRIVATE_SUBNET_ID_2>

functions:

  login:
    handler: login/index.handler
    events:
      - httpApi:
          path: /login
          method: post

  getEmails:
    handler: getEmails/index.handler
    events:
      - httpApi:
          path: /emails
          method: get

  getEmailById:
    handler: getEmailById/index.handler
    events:
      - httpApi:
          path: /emails/{id}
          method: get

  getTasks:
    handler: getTasks/index.handler
    events:
      - httpApi:
          path: /tasks
          method: get

  createTask:
    handler: createTask/index.handler
    events:
      - httpApi:
          path: /tasks
          method: post

  getSettings:
    handler: getSettings/index.handler
    events:
      - httpApi:
          path: /settings
          method: get

  updateSettings:
    handler: updateSettings/index.handler
    events:
      - httpApi:
          path: /settings
          method: put

  getLabels:
    handler: getLabels/index.handler
    events:
      - httpApi:
          path: /labels
          method: get

  createLabel:
    handler: createLabel/index.handler
    events:
      - httpApi:
          path: /labels
          method: post

  suggestResponse:
    handler: suggestResponse/index.handler
    events:
      - httpApi:
          path: /ai/suggest-response
          method: post

plugins:
  - serverless-dotenv-plugin

package:
  individually: true
```

> Los identificadores de cuenta AWS, roles IAM, subredes y grupos de seguridad se muestran mediante valores genéricos porque la infraestructura original del laboratorio ya no está activa.

---

## 🔐 Seguridad y configuración

Durante el laboratorio se utilizaron variables de entorno para separar la configuración del código.

Los archivos `.env` deben excluirse mediante `.gitignore`:

```gitignore
.env
.env.*
!.env.example
```

Puede utilizarse un archivo `.env.example` como referencia:

```text
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
```

La configuración contempla `JWT_SECRET` para autenticación basada en JWT, aunque la versión demostrativa del laboratorio no requiere autenticación JWT en todos sus endpoints.

---

## 🧠 Aspectos trabajados

Este laboratorio permitió trabajar de forma práctica con:

* Arquitecturas serverless
* AWS Lambda
* API Gateway
* Redes y conectividad mediante VPC
* Acceso a bases de datos desde funciones Lambda
* IAM
* Variables de entorno
* APIs HTTP
* Node.js
* Automatización de pruebas con Python
* Serverless Framework
* Despliegue de servicios cloud

---

## 👤 Autor

**Silverio Marín**
Docente de Informática y profesional IT en Valencia.

🌐 [https://silveriomarin.com](https://silveriomarin.com/)
💼 [LinkedIn](https://www.linkedin.com/in/silveriomarin)
🏅 [Credly](https://www.credly.com/users/silverio-marin)
