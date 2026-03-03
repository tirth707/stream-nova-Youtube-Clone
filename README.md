# Vortex | Distributed Video Streaming Engine

Vortex is an enterprise-grade video infrastructure platform built to handle high-volume uploads and deliver content via Adaptive Bitrate Streaming (HLS). Unlike standard video clones, Vortex focuses on the engineering behind video processing, transcoding, and scalable delivery.

---

## 🏗 System Architecture

Vortex is designed with a decoupled microservice architecture to ensure independent scalability of the upload and processing layers.

1.  **Upload Service:** A Node.js/Express service that handles multipart large-file uploads and stores raw assets.
2.  **Transcoding Engine:** An asynchronous worker using **FFmpeg** to convert raw videos into HLS segments (`.m3u8` and `.ts` files) at multiple resolutions (1080p, 720p, 480p).
3.  **Storage Layer:** Integrated with **AWS S3** for durable storage of both raw and processed assets.
4.  **Delivery:** Optimized for **CloudFront CDN** to minimize latency and buffering globally.

## 🚀 Key Engineering Features

* **Adaptive Bitrate Streaming (HLS):** Automatically switches video quality based on the user's network conditions.
* **Asynchronous Processing:** Video transcoding is handled as a background job to prevent blocking the main API thread.
* **Scalable Storage:** Implementation of signed URLs for secure, direct-to-S3 uploads.
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
* FFmpeg installed on your local machine
* Docker (optional, for containerized setup)

### Installation
1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/tirth707/stream-nova-Youtube-Clone-.git](https://github.com/tirth707/stream-nova-Youtube-Clone-.git)
    cd vortex-engine
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment:**
    Create a `.env` file and add your `PORT`, `AWS_ACCESS_KEY`, and `MONGODB_URI`.
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 🗺 Roadmap
- [ ] Implement Redis-based Task Queue (BullMQ) for transcoding.
- [ ] Add JWT-based Authentication and Authorization.
- [ ] Develop a React-based frontend with HLS.js integration.
- [ ] Deploy via Kubernetes for auto-scaling transcoding workers.

---
*Created by [Tirth Patel](https://github.com/tirth707) - Focus on Scalable Infrastructure.*
