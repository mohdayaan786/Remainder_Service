
---

# **Reminder Service**  

## **Overview**  
The **Reminder Service** is responsible for scheduling and sending **email notifications** related to bookings and other scheduled events. It integrates with **RabbitMQ** to consume messages from the **Booking Service**, processes the requests, and sends emails using **Nodemailer**.  

---

## **Key Features**  
✔ **Email Notifications** – Sends email notifications for bookings and reminders.  
✔ **Message Queue Integration** – Subscribes to RabbitMQ messages for email processing.  
✔ **Job Scheduling** – Uses **node-cron** to manage scheduled email reminders.  
✔ **Email Status Management** – Tracks pending emails and updates their status.  
✔ **REST API** – Provides an endpoint to create email notifications.  

---

## **Tech Stack**  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL (via Sequelize ORM)  
- **Message Queue:** RabbitMQ (via **amqplib**)  
- **Email Service:** Nodemailer  
- **Job Scheduling:** Node-cron  
- **ORM:** Sequelize  

---

## **Service Workflow**  

1️⃣ **Booking Service** → Publishes a message to **RabbitMQ** when a new booking is created.  
2️⃣ **Reminder Service (Consumer)** → Listens to the queue and processes the email notification.  
3️⃣ **Database** → Stores notification details and tracks status (`pending`, `success`, `failed`).  
4️⃣ **Nodemailer** → Sends the email to the recipient.  
5️⃣ **Node-cron** → Periodically checks for **pending** notifications and retries sending.  

---

## **Database Schema**  

The **NotificationTicket** table is responsible for storing **email notifications**.

| Column           | Data Type     | Constraints                                      |
|-----------------|--------------|--------------------------------------------------|
| id              | INTEGER       | Primary Key, Auto Increment                     |
| subject         | STRING        | Not Null                                        |
| content         | STRING        | Not Null                                        |
| recepientEmail  | STRING        | Not Null                                        |
| status          | ENUM          | `pending`, `success`, `failed` (Default: `pending`) |
| notificationTime| DATE          | Not Null                                        |
| createdAt       | TIMESTAMP     | Auto-generated                                 |
| updatedAt       | TIMESTAMP     | Auto-generated                                 |

---

## **Service Implementation**  

### **1. Email Sending Logic**  
- Uses **Nodemailer** to send emails asynchronously.  
- Updates the **status** of notifications in the database.  
- If sending fails, it marks the status as **failed**.  

### **2. Message Queue (RabbitMQ) Subscription**  
- Listens to **RabbitMQ** for new notification messages.  
- Processes email requests and triggers notifications.  

### **3. Job Scheduler**  
- Runs at a scheduled interval to **retry failed emails**.  

---

## **API Endpoints**  

| Method | Endpoint           | Description                                  |
|--------|--------------------|----------------------------------------------|
| POST   | `/api/v1/tickets`  | Creates a new email notification.           |

---

## **RabbitMQ Message Queue Integration**  
✔ **Listens for messages from the Booking Service.**  
✔ **Processes and stores notifications in the database.**  
✔ **Uses `REMAINDER_BINDING_KEY` for filtering.**  

---

## **Job Scheduling (node-cron)**  
✔ **Retries failed email notifications periodically.**  
✔ **Ensures delivery reliability.**  

---

## **Error Handling**  
✔ **Database updates notification status (`pending`, `success`, `failed`).**  
✔ **Retry mechanism for failed emails.**  

---

## **Conclusion**  
The **Reminder Service** ensures **reliable email notifications** using **RabbitMQ, Sequelize, and Nodemailer**. It efficiently manages **pending notifications**, **tracks email status**, and **automates retries**, making it a **scalable** and **efficient** notification system.  

🚀 **Now fully integrated with the Booking Service!** 🚀  

---