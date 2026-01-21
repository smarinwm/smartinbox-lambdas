# smartinbox-lambdas


---

# 📬 SmartInbox – Backend API

SmartInbox es una API serverless para gestionar correos electrónicos, tareas, etiquetas y reglas personalizadas. Está diseñada para ayudar a los usuarios a organizar su bandeja de entrada de forma inteligente, con soporte para sugerencias automáticas y categorización por etiquetas.

## 🚀 Tecnologías utilizadas

- **Node.js 18.x** – Lógica de negocio  
- **AWS Lambda** – Funciones sin servidor  
- **API Gateway (HTTP API)** – Exposición de endpoints  
- **MySQL** – Base de datos relacional  
- **Serverless Framework v3** – Despliegue e infraestructura como código  
- **Python + Requests** – Pruebas automatizadas  

## 📁 Estructura del proyecto

```
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
├── .env
├── serverless.yml
└── README.md
```

## 🌐 Endpoints

| Método | Ruta                         | Descripción                                 |
|--------|------------------------------|---------------------------------------------|
| POST   | `/login`                     | Simula login del usuario                    |
| GET    | `/emails`                    | Lista todos los correos del usuario         |
| GET    | `/emails/{id}`              | Devuelve un correo específico               |
| GET    | `/tasks`                     | Lista todas las tareas                      |
| POST   | `/tasks`                     | Crea una nueva tarea                        |
| GET    | `/settings`                 | Devuelve etiquetas y reglas del usuario     |
| PUT    | `/settings`                 | Actualiza las reglas personalizadas         |
| GET    | `/labels`                    | Lista todas las etiquetas disponibles       |
| POST   | `/labels`                    | Crea una nueva etiqueta                     |
| POST   | `/ai/suggest-response`       | Genera una sugerencia de respuesta a email  |

## 🧪 Pruebas automatizadas

El script `api_endpoints_checker.py` ejecuta un flujo completo de pruebas:

```bash
pip install requests
python api_endpoints_checker.py
```

## ☁️ Despliegue con Serverless Framework

### 1. Requisitos

- AWS CLI configurado (`aws configure`)  
- Serverless Framework instalado:

```bash
npm install -g serverless
```

- Archivo `.env` con variables:

```
DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=...
JWT_SECRET=...
```

### 2. Despliegue

```bash
sls deploy
```

Esto crea automáticamente:

- Funciones Lambda  
- API Gateway (HTTP API)  
- Variables de entorno  
- VPC con subredes y grupo de seguridad  
- Roles IAM  

### 3. Estructura `serverless.yml`

```yaml
service: smartinbox-api
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  role: arn:aws:iam::150766112371:role/LabRole
  environment:
    DB_HOST: ${env:DB_HOST}
    DB_USER: ${env:DB_USER}
    DB_PASS: ${env:DB_PASS}
    DB_NAME: ${env:DB_NAME}
    JWT_SECRET: ${env:JWT_SECRET}
  vpc:
    securityGroupIds:
      - sg-0ee080bd39cdf33e3
    subnetIds:
      - subnet-042746d01eba1fa86
      - subnet-08b7150f67000901d

functions:
  login:
    handler: login/index.handler
    events:
      - httpApi: { path: /login, method: post }

  getEmails:
    handler: getEmails/index.handler
    events:
      - httpApi: { path: /emails, method: get }

  getEmailById:
    handler: getEmailById/index.handler
    events:
      - httpApi: { path: /emails/{id}, method: get }

  getTasks:
    handler: getTasks/index.handler
    events:
      - httpApi: { path: /tasks, method: get }

  createTask:
    handler: createTask/index.handler
    events:
      - httpApi: { path: /tasks, method: post }

  getSettings:
    handler: getSettings/index.handler
    events:
      - httpApi: { path: /settings, method: get }

  updateSettings:
    handler: updateSettings/index.handler
    events:
      - httpApi: { path: /settings, method: put }

  getLabels:
    handler: getLabels/index.handler
    events:
      - httpApi: { path: /labels, method: get }

  createLabel:
    handler: createLabel/index.handler
    events:
      - httpApi: { path: /labels, method: post }

  suggestResponse:
    handler: suggestResponse/index.handler
    events:
      - httpApi: { path: /ai/suggest-response, method: post }

plugins:
  - serverless-dotenv-plugin

package:
  individually: true
```

## 🧠 Notas adicionales

- Las funciones Lambda están desplegadas individualmente para optimizar el tamaño del paquete.  
- El entorno está conectado a una VPC privada con subredes específicas.  
- La base de datos MySQL debe estar accesible desde esa VPC.  
- El sistema no requiere autenticación JWT en esta versión, aunque está preparado para integrarla.

---




