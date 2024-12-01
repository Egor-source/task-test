# Запуск проекта

Для запуска проекта выполните следующие шаги:

1. Убедитесь, что у вас установлен [Docker](https://www.docker.com/get-started)
   и [Docker Compose](https://docs.docker.com/compose/install/).

2. Склонируйте репозиторий:

   ```bash
   git clone https://github.com/Egor-source/task-test.git

3. Перейдите в дирректорию проекта
   ```bash
   cd task-test

4. Убедитесь, что у вас свободны 3000, 3001, 5432 порты

   **Linux:**
      ```bash
      ss -tuln | grep -E '(:3000|:3001|:5432)'
      ```
   **macOS:**
    ```bash
    netstat -an | grep -E '(\.3000|\.3001|\.5432)'
   ```
   
   **Windows:**
   ```bash
    netstat -an | findstr :3000 :3001 :5432
   ```
   
5. Запустите проект

   ```bash
   docker-compose up

6. После запуска проекта откройте http://localhost:3000 в браузере