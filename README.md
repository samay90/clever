# 🧠 Clever - Run Locally with Docker

This guide will help you set up the **Clever** classroom management app on your local network using Docker.

---

## 📁 Folder Structure

Create a root folder and set up the following structure:

```
[name]/
├── frontend/
├── backend/
```

Replace `[name]` with your desired project folder name.

---

## 🔽 Clone Repositories

### Clone Frontend

```bash
cd [name]/frontend
git clone https://github.com/samay90/classroom_management_frontend .
```

### Clone Backend

```bash
cd ../backend
git clone https://github.com/samay90/classroom_management_backend_hackathon .
```

---

## 📦 Move Docker Compose File

Move the `docker-compose.yaml` file from the `frontend` folder to the root `[name]` folder:

```bash
mv frontend/docker-compose.yaml ../
```

Ensure you're back in the root folder:

```bash
cd ..
```

---

## ▶️ Run Docker Compose

To spin up the entire project:

```bash
docker compose up
```

This command will start both the frontend and backend containers and link them via Docker network.

---

## ✅ You’re All Set!

The Clever classroom management app is now running locally on your network! 🎉

---

## 📝 Notes

- Make sure Docker is installed and running on your system.
- You can stop the containers anytime using:

```bash
docker compose down
```