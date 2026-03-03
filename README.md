# stream-nova-Youtube-Clone-

**stream-nova-Youtube-Clone-** is an enterprise-grade video infrastructure platform. This project goes beyond a basic UI clone, focusing on the engineering challenges of distributed systems, high-volume video ingestion, and Adaptive Bitrate Streaming (HLS).

---

## 🏗 System Architecture

The project is built with a decoupled microservice architecture to ensure the processing-heavy transcoding layer can scale independently of the API.

1.  **Ingestion Service:** A Node.js/Express service designed to handle multipart large-file uploads securely.
2.  **Transcoding Engine:** An asynchronous worker using **FFmpeg** to convert raw videos into HLS segments (`.m3u8`) at multiple resolutions (1080p, 720p, 480p).
3.  **Cloud Storage:** Integrated with **AWS S3** for durable storage of raw assets and processed streaming chunks.
4.  **Global Delivery:** Optimized for **CloudFront CDN** to ensure low-latency playback worldwide.

## 🚀 Engineering Highlights

* **Adaptive Bitrate Streaming (HLS):** Automatically adjusts video quality based on the user's network speed.
* **Asynchronous Task Processing:** Offloads heavy video transcoding to background workers to keep the main API responsive.
* **Scalable Storage:** Utilizes signed URLs for secure, direct-to-cloud asset management.
* **Clean Architecture:** Strict separation of concerns between business logic, controllers, and infrastructure.

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Processing** | FFmpeg, Fluent-FFmpeg |
| **Database** | MongoDB (Mongoose) |
| **Storage** | AWS S3 |
| **DevOps** | Docker, GitHub Actions |

## 📦 Getting Started

### Prerequisites
* Node.js (v18+)
* FFmpeg (installed on your system)
* MongoDB instance

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/tirth707/stream-nova-Youtube-Clone-.git](https://github.com/tirth707/stream-nova-Youtube-Clone-.git)
    cd stream-nova-Youtube-Clone-
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment:**
    Create a `.env` file with your `PORT`, `AWS_ACCESS_KEY`, and `MONGODB_URI`.
4.  **Run:**
    ```bash
    npm run dev
    ```

## 🗺 Roadmap
- [ ] Implement Redis-based Task Queue (BullMQ) for processing reliability.
- [ ] Integrate JWT-based Authentication & Role-Based Access Control (RBAC).
- [ ] Build a React-based frontend using HLS.js for seamless playback.
- [ ] Deploy via Kubernetes for auto-scaling transcoding workers.

---
*Developed by **Tirth Patel** — B.Tech IT Student at **Parul University**.*
