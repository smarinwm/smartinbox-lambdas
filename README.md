# smartinbox-lambdas

smm@smm-Victus:~/Documentos/PROYECTO_DAM/smartinbox-lambdas$ export $(cat .env | xargs) && npx serverless deploy
DOTENV: Loading environment variables from .env:
         - DB_HOST
         - DB_USER
         - DB_PASS
         - DB_NAME
         - JWT_SECRET

Deploying smartinbox-api to stage dev (us-east-1)

✔ Service deployed to stack smartinbox-api-dev (367s)

endpoints:
  POST - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/login
  GET - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/emails
  GET - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/emails/{id}
  GET - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/tasks
  POST - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/tasks
  GET - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/settings
  PUT - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/settings
  GET - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/labels
  POST - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/labels
  POST - https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com/ai/suggest-response
functions:
  login: smartinbox-api-dev-login (45 MB)
  getEmails: smartinbox-api-dev-getEmails (45 MB)
  getEmailById: smartinbox-api-dev-getEmailById (45 MB)
  getTasks: smartinbox-api-dev-getTasks (45 MB)
  createTask: smartinbox-api-dev-createTask (45 MB)
  getSettings: smartinbox-api-dev-getSettings (45 MB)
  updateSettings: smartinbox-api-dev-updateSettings (45 MB)
  getLabels: smartinbox-api-dev-getLabels (45 MB)
  createLabel: smartinbox-api-dev-createLabel (45 MB)
  suggestResponse: smartinbox-api-dev-suggestResponse (45 MB)

1 deprecation found: run 'serverless doctor' for more details

Need a faster logging experience than CloudWatch? Try our Dev Mode in Console: run "serverless dev"