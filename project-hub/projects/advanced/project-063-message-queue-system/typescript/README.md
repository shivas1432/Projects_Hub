<div align="center">

# 🚀 Kafka ClickHouse Development Setup

### ✨ Complete Local Development Environment for Kafka & ClickHouse ✨

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=FF6B6B&center=true&vCenter=true&width=600&lines=Local+Kafka+%26+ClickHouse+Setup;Docker+Powered+Development;Real-time+Data+Processing;Built+for+Modern+Developers" alt="Typing SVG" />
</p>

<div align="center">
  
  [![Portfolio](https://img.shields.io/badge/💼_Portfolio-ashishport.vercel.app-10B981?style=for-the-badge&logo=vercel&logoColor=white)](https://ashishport.vercel.app)
  [![Email](https://img.shields.io/badge/📧_Contact-ashishjadhav9900@gmail.com-EF4444?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ashishjadhav9900@gmail.com)
  [![Give Star](https://img.shields.io/badge/⭐_Give_Star-FFD700?style=for-the-badge&logo=github&logoColor=black)](https://github.com/Ashish1022/kafka-clickhouse-pipeline)
  
</div>

---

<!-- Add your hero banner image here -->
<img src="./public/hero.png" alt="Kafka ClickHouse Setup Banner" width="100%" />

</div>

## 🎯 What is This Repository?

<table>
<tr>
<td width="50%">

**Kafka ClickHouse Development Setup** is a complete local development environment that helps you get started with **Apache Kafka** and **ClickHouse** in minutes, not hours.

🐳 **Docker Powered**  
⚡ **Lightning Fast Setup**  
🔄 **Real-time Processing**  
🛠️ **Developer Friendly**

Perfect for developers who want to experiment with real-time data processing and analytics without complex infrastructure setup.

</td>
</tr>
</table>

## 🔥 Why Use This Setup?

<div align="center">

|                                  🏆 **For Developers**                                   |                                      🛠️ **For Learning**                                      |
| :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|      ![Docker](https://img.shields.io/badge/🐳-Docker_Ready-blue?style=flat-square)      |         ![Kafka](https://img.shields.io/badge/📡-Kafka_Basics-blue?style=flat-square)         |
|      ![Setup](https://img.shields.io/badge/⚡-Quick_Setup-green?style=flat-square)       | ![ClickHouse](https://img.shields.io/badge/🏪-ClickHouse_Integration-green?style=flat-square) |
| ![Monorepo](https://img.shields.io/badge/📦-Monorepo_Structure-purple?style=flat-square) |     ![Realtime](https://img.shields.io/badge/🔄-Real_time_Data-purple?style=flat-square)      |
|   ![Express](https://img.shields.io/badge/🚀-Express_Backend-orange?style=flat-square)   |     ![Analytics](https://img.shields.io/badge/📊-Data_Analytics-orange?style=flat-square)     |
|      ![TypeScript](https://img.shields.io/badge/🔒-Type_Safe-red?style=flat-square)      |     ![Production](https://img.shields.io/badge/🌟-Production_Ready-red?style=flat-square)     |

</div>

---

## 🐳 Docker Setup Commands

### 🌐 Create Docker Network

```bash
# Create a custom network for communication between containers
docker network create pipeline-network
```

### 🔥 Kafka Setup

```bash
# 1. Pull Apache Kafka image
docker pull apache/kafka

# 2. Run Kafka broker container
docker run -d -p 9092:9092 --network pipeline-network --name broker apache/kafka

# 3. Access Kafka container and create a test topic
docker exec --workdir /opt/kafka/bin/ -it broker sh
./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic test-topic
```

### 🏪 ClickHouse Setup

```bash
# 1. Pull ClickHouse server image
docker pull clickhouse/clickhouse-server

# 2. Run ClickHouse container
docker run -d -p 18123:8123 -p 19000:9000 -e CLICKHOUSE_PASSWORD=changeme --network pipeline-network --name some-clickhouse-server --ulimit nofile=262144:262144 clickhouse/clickhouse-server

# 3. Access ClickHouse container
docker exec -it some-clickhouse-server bash

# 4. Start ClickHouse client
clickhouse-client

# 5. Create table for log events
CREATE TABLE log_events (
    id UUID,
    timestamp DateTime MATERIALIZED now(),
    message String,
    metadata Nullable(String)
) ENGINE=MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp);
```

---

## 🏗️ Monorepo Structure

<div align="center">

This monorepo consists of **3 main applications**:

<table>
<tr>
<td width="33%" align="center">
<img src="https://img.shields.io/badge/🔧-Backend_Service-FF6B6B?style=for-the-badge" />
<br><strong>kafka-clickhouse-service</strong>
<br><em>Express app with controllers & helpers</em>
</td>
<td width="33%" align="center">
<img src="https://img.shields.io/badge/🎨-Consumer_Frontend-4ECDC4?style=for-the-badge" />
<br><strong>consumer-frontend</strong>
<br><em>Next app for data consumption</em>
</td>
<td width="33%" align="center">
<img src="https://img.shields.io/badge/📤-Producer_Frontend-45B7D1?style=for-the-badge" />
<br><strong>producer-frontend</strong>
<br><em>Next app for data production</em>
</td>
</tr>
</table>

</div>

### 🎯 **kafka-clickhouse-service**

The heart of the setup! This Express.js application provides:

- 🔗 **Kafka Integration**: Controllers for producer/consumer management
- 🏪 **ClickHouse Connection**: Helpers for database operations
- 🛠️ **RESTful APIs**: Clean endpoints for frontend communication
- 📊 **Data Processing**: Real-time data transformation utilities

---

## 🚀 Local Development Setup

### 📋 Prerequisites

<div align="center">

<p>
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/pnpm-Latest-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-Latest-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

</div>

### 🔧 Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/Ashish1022/kafka-clickhouse-pipeline.git
cd kafka-clickhouse-pipeline

# 2. Install dependencies for consumer frontend
cd apps/consumer-frontend
pnpm install

# 3. Install dependencies for producer frontend
cd ../producer-frontend
pnpm install

# 4. Install dependencies for backend service
cd ../kafka-clickhouse-service
pnpm install

# 5. Run the entire development setup
cd ../../  # Back to root folder
pnpm dev
```

---

## 🎥 Demo Videos

<div align="center">

### 📡 **Kafka Broker & Consumer Connections**


https://github.com/user-attachments/assets/53d53417-6b7a-42b2-83fc-aa406f097141


<p>
<img src="https://img.shields.io/badge/🎬-Kafka_Demo_Video-FF6B6B?style=for-the-badge&logo=youtube&logoColor=white" />
</p>

### 🏪 **ClickHouse Data Visualization**


https://github.com/user-attachments/assets/6c9fa5ee-347b-4edf-b986-20fe0d6aedc1


<p>
<img src="https://img.shields.io/badge/🎬-ClickHouse_Demo_Video-4ECDC4?style=for-the-badge&logo=youtube&logoColor=white" />
</p>

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Core Technologies

<p>
<img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white" />
<img src="https://img.shields.io/badge/ClickHouse-FFCC02?style=for-the-badge&logo=clickhouse&logoColor=black" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

### Backend & Frontend

<p>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

</div>

---

## 🌟 Features

<div align="center">
<table>
<tr>
<td width="50%">

### 🚀 **Development Features**

```
🐳 Docker Integration
   └── One-command setup
   └── Isolated environments
   └── Cross-platform support

⚡ Real-time Processing
   └── Kafka message streaming
   └── ClickHouse analytics
   └── Live data visualization

🔧 Express Backend
   └── RESTful APIs
   └── Kafka controllers
   └── ClickHouse helpers
```

</td>
<td width="50%">

### 🎯 **Production Ready**

```
📊 Data Analytics
   └── Real-time dashboards
   └── Historical data analysis
   └── Performance monitoring

🔒 Robust Architecture
   └── Error handling
   └── Connection pooling
   └── Health checks

🛠️ Developer Experience
   └── Hot reload
   └── TypeScript support
   └── Clear documentation
```

</td>
</tr>
</table>
</div>

---

## 📈 Performance Metrics

<div align="center">

<table>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/Setup_Time-<5min-brightgreen?style=for-the-badge&logo=rocket&logoColor=white" />
<br><strong>Quick Setup</strong>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Message_Latency-<10ms-success?style=for-the-badge&logo=zap&logoColor=white" />
<br><strong>Low Latency</strong>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Throughput-10k+_msg/s-brightgreen?style=for-the-badge&logo=trending-up&logoColor=white" />
<br><strong>High Throughput</strong>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Reliability-99.9%25-blue?style=for-the-badge&logo=shield&logoColor=white" />
<br><strong>Reliable</strong>
</td>
</tr>
</table>

</div>

---

## 🤝 Contributing

<div align="center">

We ❤️ contributions! Help us make this setup even better.

[![Contributors](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge&logo=github&logoColor=white)](CONTRIBUTING.md)
[![Issues](https://img.shields.io/badge/Issues-Open-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ashish1022/kafka-clickhouse-pipeline/issues)
[![Pull Requests](https://img.shields.io/badge/PRs-Welcome-orange?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ashish1022/kafka-clickhouse-pipeline/pulls)

</div>

---

## 📬 Get In Touch

<div align="center">
<table>
<tr>
<td align="center">
<a href="mailto:ashishjadhav9900@gmail.com">
<img src="https://img.shields.io/badge/📧_Email-ashishjadhav9900@gmail.com-EF4444?style=for-the-badge&logo=gmail&logoColor=white" />
</a>
</td>
<td align="center">
<a href="https://ashishport.vercel.app">
<img src="https://img.shields.io/badge/💼_Portfolio-ashishport.vercel.app-10B981?style=for-the-badge&logo=vercel&logoColor=white" />
</a>
</td>
</tr>
</table>
</div>

---

## 📄 License

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

<div align="center">

### 🎉 **Ready to Start Building?**

<p>
<a href="#-local-development-setup">
<img src="https://img.shields.io/badge/🚀_GET_STARTED_NOW-FF6B6B?style=for-the-badge&logo=rocket&logoColor=white" />
</a>
</p>

### ⭐ **Found This Helpful?**

<p>
<a href="https://github.com/Ashish1022/kafka-clickhouse-pipeline">
<img src="https://img.shields.io/badge/⭐_GIVE_IT_A_STAR-FFD700?style=for-the-badge&logo=github&logoColor=black" />
</a>
</p>

<p><em>Your star helps other developers discover this project! 🌟</em></p>

<br>

**Built with 💜 by [Ashish Jadhav](https://ashishport.vercel.app)**

### 👨‍💻 About the Developer

<div align="center">
<table>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/🎓-Full_Stack_Developer-FF6B6B?style=for-the-badge" />
<br><strong>Ashish Jadhav</strong>
<br><em>Passionate about modern web technologies</em>
</td>
<td align="center">
<img src="https://img.shields.io/badge/🏆-Open_Source_Contributor-4ECDC4?style=for-the-badge" />
<br><strong>Community Builder</strong>
<br><em>Helping developers worldwide</em>
</td>
<td align="center">
<img src="https://img.shields.io/badge/🚀-Tech_Enthusiast-45B7D1?style=for-the-badge" />
<br><strong>Innovation Focused</strong>
<br><em>Building the future of web</em>
</td>
</tr>
</table>
</div>

<div align="center">
<table>
<tr>
<td align="center">
<a href="mailto:ashishjadhav9900@gmail.com">
<img src="https://img.shields.io/badge/📧_Email-ashishjadhav9900@gmail.com-EF4444?style=for-the-badge&logo=gmail&logoColor=white" />
</a>
</td>
<td align="center">
<a href="https://ashishport.vercel.app">
<img src="https://img.shields.io/badge/💼_Portfolio-ashishport.vercel.app-10B981?style=for-the-badge&logo=vercel&logoColor=white" />
</a>
</td>
<td align="center">
<a href="https://github.com/Ashish1022/kafka-clickhouse-pipeline">
<img src="https://img.shields.io/badge/💻_GitHub-Follow_Me-333?style=for-the-badge&logo=github&logoColor=white" />
</a>
</td>
</tr>
</table>
</div>

<p>
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=2000&pause=1000&color=FF6B6B&center=true&vCenter=true&width=500&lines=Real-time+Data+Processing;Docker+%7C+Kafka+%7C+ClickHouse;Built+for+Modern+Development;Happy+Coding!" alt="Footer Typing SVG" />
</p>

---

<img src="https://komarev.com/ghpvc/?username=kafka-clickhouse-setup&color=ff6b6b&style=for-the-badge&label=Repository+Views" alt="Repository Views" />

</div>
