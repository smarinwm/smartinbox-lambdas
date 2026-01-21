import requests

BASE_URL = 'https://q3fxldc0w0.execute-api.us-east-1.amazonaws.com'
user_id = 1

def post_label():
    print('Creando etiqueta...')
    res = requests.post(f'{BASE_URL}/labels', json={
        'name': 'Automática',
        'color': '#00AAFF'
    })
    res.raise_for_status()
    label_id = res.json()['id']
    print('Etiqueta creada con ID:', label_id)
    return label_id

def get_labels():
    print('Obteniendo etiquetas...')
    res = requests.get(f'{BASE_URL}/labels')
    res.raise_for_status()
    print('Etiquetas:', res.json())

def post_task():
    print('Creando tarea...')
    res = requests.post(f'{BASE_URL}/tasks', json={
        'user_id': user_id,
        'title': 'Revisar propuesta de proyecto',
        'status': 'pendiente',
        'due_date': '2026-01-30'
    })
    res.raise_for_status()
    task_id = res.json()['id']
    print('Tarea creada con ID:', task_id)
    return task_id

def get_tasks():
    print('Obteniendo tareas...')
    res = requests.get(f'{BASE_URL}/tasks')
    res.raise_for_status()
    print('Tareas:', res.json())

def get_emails():
    print('Obteniendo emails...')
    res = requests.get(f'{BASE_URL}/emails')
    res.raise_for_status()
    emails = res.json()
    print('Primer email:', emails[0] if emails else 'Ninguno')
    return emails[0]['id'] if emails else None

def get_email_by_id(email_id):
    print(f'Obteniendo email #{email_id}...')
    res = requests.get(f'{BASE_URL}/emails/{email_id}')
    res.raise_for_status()
    print('Email:', res.json())

def get_settings():
    print('Obteniendo configuración...')
    res = requests.post(f'{BASE_URL}/settings', json={ 'user_id': user_id })
    res.raise_for_status()
    print('Settings:', res.json())

def put_settings():
    print('Actualizando configuración...')
    res = requests.put(f'{BASE_URL}/settings', json={
        'user_id': user_id,
        'rules': [
            { 'keyword': 'proyecto', 'label': 'Automática' },
            { 'keyword': 'urgente', 'label': 'Automática' }
        ]
    })
    res.raise_for_status()
    print('Settings actualizados:', res.json())

def post_suggestion(email_id):
    print('Obteniendo sugerencia de respuesta...')
    res = requests.post(f'{BASE_URL}/ai/suggest-response', json={ 'email_id': email_id })
    res.raise_for_status()
    print('Sugerencia:', res.json()['suggestion'])

def main():
    try:
        label_id = post_label()
        get_labels()
        task_id = post_task()
        get_tasks()
        email_id = get_emails()
        if email_id:
            get_email_by_id(email_id)
            post_suggestion(email_id)
        get_settings()
        put_settings()
        print('\nPruebas completadas con éxito.')
    except requests.exceptions.RequestException as e:
        print('Error durante las pruebas:', e)

if __name__ == '__main__':
    main()
