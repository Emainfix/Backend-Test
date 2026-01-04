# Backend REST API

REST API built with Node.js, Express and MySQL.
Dockerized and deployed on AWS EC2.

## 🛠 Tech Stack

- Node.js
- Express
- MySQL
- Docker
- AWS EC2
- JWT Authentication

## ▶️ Run Locally

```bash
git clone https://github.com/Emainfix/Backend-Test.git
cd Backend-Test
docker-compose up -d

```

## 📡 API Endpoints

Base URL (AWS EC2):
http://3.131.83.205:3000

> ⚠️ Nota: La API está desplegada en una instancia EC2 y conectada a una base de datos MySQL en AWS RDS.

---

## 🔓 Public Endpoints (sin autenticación)

Estos endpoints están disponibles para pruebas libres (pensados para reclutadores).

📄 Obtener todos los registros (datos públicos)

Devuelve todos los registros de la base de datos **excluyendo información sensible** como:

- nombres de usuario
- contraseñas
- hashes
- tokens

GET /api/usuarios

✅ Response ejemplo

```json
{
  "error": false,
	"status": 200,
  "body": [
    {
			"id": 1,
			"nombre": "Nombre",
			"activo": "1"
		}
  ]
}
```

## 🔐 Protected Endpoints (JWT)

Los siguientes endpoints requieren autenticación mediante JWT.

🧾 Registro de usuario

Crea un nuevo usuario y guarda la contraseña hasheada.

POST /api/usuarios/

📥 Body
```json
{
  	"nombre": "tuNombre",
	"usuario": "nombreUsuario",
	"password": "tuPassword",
	"activo": 1
}
```

✅ Response

```json
{
  "error": false,
  "status": 201,
  "body": "Item guardado correctamente"
}
```

---

🔑 Login de usuario

Devuelve un token JWT válido.

POST /api/auth/login

📥 Body

```json
{
  "usuario": "nombreUsuario",
  "password": "tuPassword"
}
```

✅ Response

```json
{
  "error": false,
  "status": 200,
  "body": "eyJhb..."
}
```

---

👤 Obtener información de un usuario

Devuelve la información de un usuario específico.

GET /api/usuarios/:id

🔐 Headers
Authorization: Bearer <JWT_TOKEN>

✅ Response

```json
{
  "error": false,
  "status": 200,
  "body": [
    {
      "id": 2,
      "nombre": "Nombre",
      "activo": "1"
    }
  ]
}
```

---

✏️ Actualizar datos de usuario

Actualiza los datos del usuario por ID.

PATCH /api/usuarios/:id

🔐 Headers
Authorization: Bearer <JWT_TOKEN>

📥 Body

```json
{
  "nombre": "tuNombre",
  "usuario": "nombreUsuario",
  "password": "tuPassword",
  "activo": 1
}
```

✅ Response

```json
{
  "error": false,
  "status": 200,
  "body": "El elemento ha sido modificado"
}
```

---

🗑 Eliminar usuario

Elimina un usuario por ID.

DELETE /api/usuarios/:id

🔐 Headers
Authorization: Bearer <JWT_TOKEN>

✅ Response

```json
{
  "error": false,
  "status": 200,
  "body": "El elemento ha sido eliminado"
}
```

---

🔒 Seguridad
Contraseñas hasheadas con bcrypt

Autenticación mediante JWT

Variables sensibles gestionadas por variables de entorno

Base de datos alojada en AWS RDS (no dentro del contenedor)

🐳 Docker & Deployment
API dockerizada

Desplegada en AWS EC2

MySQL gestionado con AWS RDS
