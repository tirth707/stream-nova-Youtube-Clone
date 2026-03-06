# 🚀 StreamNova: High-Performance Video Infrastructure

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![AWS S3](https://img.shields.io/badge/Storage-AWS%20S3-orange.svg)](https://aws.amazon.com/s3/)
[![FFmpeg](https://img.shields.io/badge/Engine-FFmpeg-blueviolet.svg)](https://ffmpeg.org/)

**StreamNova** is an enterprise-grade video infrastructure platform designed to handle the complexities of distributed video processing. This project focuses on high-volume ingestion, asynchronous transcoding, and **Adaptive Bitrate Streaming (ABR)** via the HLS protocol.

---

## 🏗 System Architecture

StreamNova uses a decoupled architecture to ensure that the CPU-intensive transcoding layer scales independently of the user-facing API.

1.  **Ingestion Layer:** Node.js/Express gateway optimized for multipart large-file uploads.
2.  **Transcoding Engine:** An asynchronous worker using **FFmpeg** to segment raw files into HLS manifests (`.m3u8`) and fragments (`.ts`).
3.  **Multi-Resolution Processing:** Concurrently generates 1080p, 720p, and 480p streams to support varying network conditions.
4.  **Global Distribution:** Assets are persisted to **AWS S3** and served through **CloudFront CDN** for low-latency playback.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Media Processing** | FFmpeg, Fluent-FFmpeg |
| **Database** | MongoDB (Mongoose) |
| **Cloud Storage** | AWS S3 |
| **Content Delivery** | AWS CloudFront |
| **DevOps** | Docker, GitHub Actions |

---

## 🌟 Engineering Highlights

* **Adaptive Bitrate Streaming (HLS):** Implemented dynamic quality switching to ensure a buffer-free user experience.
* **Asynchronous Processing:** Offloaded heavy encoding tasks from the main event loop to maintain high API responsiveness.
* **Secure Asset Management:** Utilized **AWS Signed URLs** for temporary, secure access to private streaming data.
* **Clean Architecture:** Strict separation of concerns between business logic, media services, and infrastructure providers.

---

## 📁 Project Structure

```text
stream-nova/
├── src/
│   ├── controllers/    # Request handling
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── services/       # FFmpeg & S3 logic
│   ├── utils/          # Helpers
│   └── app.js          # Entry point
├── uploads/            # Temporary buffer
├── docker-compose.yml
└── package.json
