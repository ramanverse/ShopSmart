# Fastlane - Luxury Car Marketplace

A premium, full-stack luxury pre-owned car marketplace built with Next.js 14, Prisma, and Supabase.

## 🏗️ Project Structure

This project follows a professional **Monorepo** architecture to separate concerns:

- **`/frontend`**: The Next.js 14 application (UI, components, and client-side logic).
- **`/backend`**: Database models, Prisma schema, and migrations.
- **Root**: Global configuration and multi-package management.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- Supabase account (PostgreSQL)

### 2. Installation
From the root directory, install all dependencies:
```bash
npm run postinstall
```

### 3. Environment Setup
Create a `.env` file in the root with your Supabase credentials.

### 4. Database Setup
Sync your schema and seed the data:
```bash
npm run seed
```

### 5. Running the App
Run the development server from the root:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.
