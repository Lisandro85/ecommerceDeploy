# 🛒 Estructura Backend para un Ecommerce Funcional  

> **Gestión eficiente de productos, usuarios y pedidos.**  
> Este proyecto ofrece una base sólida para construir aplicaciones de ecommerce, con un enfoque en escalabilidad, organización y rendimiento.

---

## 🚀 **Características Principales**  

- **Gestión de Productos**: Crear, leer, actualizar y eliminar productos con facilidad.  
- **Gestión de Usuarios**: Sistema robusto de registro, inicio de sesión y administración de usuarios.  
- **Gestión de Pedidos**: Flujo completo de pedidos, desde la creación hasta la actualización del estado.  
- **Escalabilidad**: Arquitectura modular para facilitar el crecimiento del proyecto.  

---

## 🛠 **Tecnologías Utilizadas**  

| **Tecnología** | **Descripción** |
|----------------|-----------------|
| **NestJS**     | Framework progresivo de Node.js para aplicaciones del lado del servidor. |
| **PostgreSQL** | Base de datos relacional potente, fiable y de código abierto. |
| **TypeScript** | Superconjunto de JavaScript que agrega tipos estáticos para mayor seguridad y desarrollo rápido. |
| **TypeORM**    | ORM de TypeScript y JavaScript que facilita la interacción con bases de datos. |

---

## 📦 **Cómo Ejecutar el Proyecto**

Asegúrate de tener instalados los siguientes programas:  
- [Node.js](https://nodejs.org/) (v16 o superior)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Git](https://git-scm.com/)  

### 1️⃣ **Clona el Repositorio**

git clone https://github.com/tu-usuario/ecommerce-backend.git
cd ecommerce-backend

---

2️⃣ Configura las Variables de Entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de configuración:

env

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=ecommerce
JWT_SECRET=tu_clave_secreta
PORT=3000

---

3️⃣ Ejecuta las Migraciones
Configura las tablas en la base de datos ejecutando:

npm run typeorm migration:run

---

4️⃣ Inicia el Servidor
Arranca el servidor con el siguiente comando:

npm run start:dev

---

🛠️ Comandos Útiles
npm run start:dev: Inicia el servidor en modo desarrollo.
npm run build: Compila el proyecto para producción.

---
📧 Contacto
Para preguntas o sugerencias, puedes contactarme:
📩 lisandrobedotti@hotmail.com


