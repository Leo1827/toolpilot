# 🚀 Temp Mail App

Aplicación web de correos temporales construida con **Next.js (App Router)** que genera emails desechables usando la API de Boomlify y muestra los mensajes en tiempo real con una interfaz moderna y minimalista.

---

## 🧠 Descripción

Este proyecto permite:

* ✉️ Generar emails temporales
* 📥 Leer mensajes del buzón
* 🔄 Auto-renovación del correo cada 10 minutos
* ⚡ Polling automático del inbox
* 🛡️ Normalización segura de respuestas API
* 🎨 UI moderna, responsive y minimalista
* 🧱 Arquitectura fullstack con Route Handlers

---

## 🛠️ Tecnologías utilizadas

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Lucide React (iconos)
* ESLint
* Node.js

---

## 📦 Instalación del proyecto

### 1. Crear el proyecto

```bash
npx create-next-app@latest temp-mail-app
cd temp-mail-app
```

### 2. Instalar dependencias

```bash
npm install
npm install lucide-react
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir en el navegador:

```
http://localhost:3000
```

---

## 🔐 Variables de entorno

Crear en la raíz del proyecto:

```
.env.local
```

Ejemplo:

```env
BOOMLIFY_API_KEY=tu_api_key
BOOMLIFY_BASE_URL=https://api.boomlify.com
```

### ⚠️ Seguridad

El archivo `.env.local` **no se sube a Git** gracias al `.gitignore`.

---

## 🏗️ Estructura del proyecto

```
src/
│
├── app/
│   ├── api/
│   │   └── mail/
│   │       ├── route.ts                # listar + crear
│   │       ├── [id]/
│   │       │   ├── route.ts            # detalle + eliminar
│   │       │   └── messages/
│   │       │       └── route.ts        # inbox
│   │
│   ├── (site)/
│   │   ├── page.tsx                    # UI principal
│   │   └── layout.tsx
│   │
│   └── globals.css
│
├── services/
│   └── boomlify.service.ts             # cliente Boomlify
│
├── hooks/
│   └── useTempMail.ts                  # lógica del correo
│
├── types/
│   └── mail.types.ts                   # tipos TS
│
└── lib/
```

---

## 🔌 Endpoints implementados

### Backend (Route Handlers)

| Método | Ruta                      | Descripción      |
| ------ | ------------------------- | ---------------- |
| POST   | `/api/mail`               | Crear email      |
| GET    | `/api/mail`               | Listar emails    |
| GET    | `/api/mail/[id]`          | Detalle email    |
| DELETE | `/api/mail/[id]`          | Eliminar email   |
| GET    | `/api/mail/[id]/messages` | Obtener mensajes |

---

## 🔄 Flujo de la aplicación

1. UI llama `POST /api/mail`
2. Route Handler llama a Boomlify
3. Se crea email temporal
4. `useTempMail` guarda `email` y `emailId`
5. Frontend hace polling a:

```
/api/mail/{id}/messages
```

6. La bandeja se actualiza automáticamente

---

## 🧩 Hook principal

El hook `useTempMail`:

* crea el email
* guarda `emailId`
* refresca cada 10 minutos

Expone:

```ts
{
  email,
  emailId,
  loading,
  refresh
}
```

---

## 🛡️ Manejo de errores implementado

### ✅ params como Promise (Next.js 15)

```ts
const { id } = await params;
```

---

### ✅ Normalización de mensajes

La API puede devolver:

* array directo
* `{ messages: [] }`
* `{ data: [] }`

Por eso se normaliza:

```ts
const messages = Array.isArray(data)
  ? data
  : data.messages ?? data.data ?? [];
```

---

### ✅ Protección en frontend

```ts
if (!res.ok) {
  setMessages([]);
  return;
}
```

Evita:

* ❌ `messages.map is not a function`
* ❌ crash cuando expira el email

---

## 🎨 Características de UI

* ✨ Diseño minimalista
* 🌙 Soporte dark mode
* 📱 Responsive
* 🔄 Animaciones suaves
* 📋 Copiar email al portapapeles
* 📥 Inbox auto-refresh cada 8s
* ⏳ Loader states elegantes

---

## 🚀 Scripts disponibles

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 🔮 Próximas mejoras

* ⏱️ Contador visual de expiración
* 🔔 Notificación cuando llega correo
* ⚡ Polling inteligente adaptativo
* 🧠 Cache inteligente
* 🛡️ Rate limiting
* 🚀 Deploy en Vercel
* 📡 WebSockets (modo realtime)

---

## 🧪 Notas de desarrollo

### ⏳ Expiración de emails

Los correos de Boomlify pueden expirar.
El sistema maneja esto limpiando automáticamente la bandeja.

---

### 🔁 Polling actual

* Email: cada **10 minutos**
* Inbox: cada **8 segundos**

Puedes ajustar en:

```ts
setInterval(fetchMessages, 8000);
```

---

## 📄 Licencia

MIT
