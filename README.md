# StreamNova: High-Performance Video Infrastructure

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![AWS S3](https://img.shields.io/badge/Storage-AWS%20S3-orange.svg)](https://aws.amazon.com/s3/)
[![FFmpeg](https://img.shields.io/badge/Engine-FFmpeg-blueviolet.svg)](https://ffmpeg.org/)

**StreamNova** is an enterprise-grade video infrastructure platform designed to handle the complexities of distributed video processing. The platform provides high-volume ingestion, asynchronous transcoding, and **Adaptive Bitrate Streaming (ABR)** via the HTTP Live Streaming (HLS) protocol — enabling a resilient, scalable, and low-latency video delivery experience.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Tech Stack](#tech-stack)
3. [Engineering Highlights](#engineering-highlights)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Environment Variables](#environment-variables)
8. [Running the Application](#running-the-application)
9. [API Reference](#api-reference)
10. [Contributing](#contributing)
11. [License](#license)

---

## System Architecture

StreamNova employs a decoupled architecture to ensure that the CPU-intensive transcoding layer scales independently of the user-facing API.

1. **Ingestion Layer:** A Node.js/Express gateway optimized for multipart, large-file uploads via the `multipart/form-data` content type.
2. **Transcoding Engine:** An asynchronous worker powered by **FFmpeg** that segments raw video files into HLS manifests (`.m3u8`) and media fragments (`.ts`).
3. **Multi-Resolution Processing:** Concurrent encoding pipelines generate 1080p, 720p, and 480p streams to accommodate varying network conditions and device capabilities.
4. **Global Distribution:** Processed assets are persisted to **AWS S3** and served through **AWS CloudFront CDN** for geographically distributed, low-latency playback.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend Runtime** | Node.js (v18+), Express.js |
| **Media Processing** | FFmpeg, Fluent-FFmpeg |
| **Database** | MongoDB (Mongoose ODM) |
| **Cloud Storage** | AWS S3 |
| **Content Delivery** | AWS CloudFront |
| **DevOps** | Docker, GitHub Actions |

---

## Engineering Highlights

- **Adaptive Bitrate Streaming (HLS):** Dynamic quality switching is implemented to ensure a buffer-free user experience across varying bandwidth conditions.
- **Asynchronous Processing:** Heavy encoding tasks are offloaded from the main event loop via a dedicated worker service, preserving high API throughput and responsiveness.
- **Secure Asset Management:** AWS Pre-Signed URLs are used to provide time-limited, authenticated access to private media assets stored on S3.
- **Clean Architecture:** A strict separation of concerns is maintained between request handling (controllers), business logic (services), and infrastructure providers (storage, database).

---

## Project Structure

```text
stream-nova/
├── src/
│   ├── controllers/    # HTTP request handlers and response formatting
│   ├── models/         # MongoDB/Mongoose data schemas
│   ├── routes/         # Express route definitions and middleware bindings
│   ├── services/       # Core business logic: FFmpeg transcoding and AWS S3 operations
│   ├── utils/          # Shared utility functions and helper modules
│   └── app.js          # Application entry point and server bootstrap
├── raw_uploads/        # Temporary local buffer for incoming video files (auto-created)
├── uploadService.js    # Standalone multipart upload microservice
├── docker-compose.yml
└── package.json
```

---

## Prerequisites

Before running this project, ensure the following software is installed on your system:

- **Node.js** v18.0.0 or higher — [Download](https://nodejs.org/)
- **npm** v9.0.0 or higher (bundled with Node.js)
- **FFmpeg** — [Installation Guide](https://ffmpeg.org/download.html)
- **Docker** and **Docker Compose** (optional, for containerized deployment)
- An active **AWS account** with an S3 bucket and CloudFront distribution configured

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tirth707/stream-nova-Youtube-Clone.git
   cd stream-nova-Youtube-Clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables)).

---

## Environment Variables

Create a `.env` file in the project root directory. The following variables are required:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `UPLOAD_PORT` | Port on which the upload service listens | `4001` |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret access key | `wJalrXUtnFEMI/K7MDENG/...` |
| `AWS_REGION` | AWS region for S3 and CloudFront | `us-east-1` |
| `S3_BUCKET_NAME` | Name of the target S3 bucket | `streamnova-assets` |
| `CLOUDFRONT_DOMAIN` | CloudFront distribution domain | `d1234abcd.cloudfront.net` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/streamnova` |

> **Security Note:** Never commit the `.env` file to version control. It is listed in `.gitignore` by convention.

---

## Running the Application

### Development Mode

Start the upload service with automatic restarts on file changes:

```bash
npx nodemon uploadService.js
```

### Standard Mode

```bash
node uploadService.js
```

### Docker Compose

To run the full stack using Docker:

```bash
docker-compose up --build
```

The upload service will be available at `http://localhost:4001` by default.

---

## API Reference

### Upload a Video

Submits a video file for asynchronous transcoding and HLS packaging.

**Endpoint:** `POST /api/v1/videos/upload`

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `video` | `File` | Yes | The video file to upload. Must be a valid video MIME type (e.g., `video/mp4`). Maximum size: 500 MB. |

**Success Response — `202 Accepted`:**

```json
{
  "message": "Video uploaded and queued for processing",
  "videoId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "originalName": "my-video.mp4",
  "status": "PROCESSING"
}
```

**Error Responses:**

| HTTP Status | Reason |
| :--- | :--- |
| `400 Bad Request` | No video file was included in the request. |
| `415 Unsupported Media Type` | The uploaded file is not a recognized video format. |
| `500 Internal Server Error` | An unexpected server-side error occurred during upload. |

---

## Contributing

Contributions are welcome and appreciated. To contribute:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes with a descriptive message: `git commit -m "feat: add your feature description"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against the `main` branch, describing your changes in detail.

Please ensure that your code adheres to the existing style and that all relevant tests pass before submitting a Pull Request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.
