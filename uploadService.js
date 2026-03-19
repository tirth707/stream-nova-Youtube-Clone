/**
 * @file uploadService.js
 * @description Standalone Express microservice responsible for accepting multipart
 * video file uploads, performing file-type validation, and persisting the raw asset
 * to a local buffer directory before enqueuing it for asynchronous transcoding.
 *
 * Endpoint: POST /api/v1/videos/upload
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Multer disk storage configuration.
 *
 * - destination: Resolves (and creates if absent) the `raw_uploads` directory
 *   adjacent to this file. This directory acts as a temporary local buffer
 *   before files are handed off to the transcoding worker.
 * - filename: Assigns a UUID v4-based name to prevent collisions while
 *   preserving the original file extension.
 *
 * @type {multer.StorageEngine}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'raw_uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

/**
 * Multer upload middleware instance.
 *
 * Configuration:
 * - Accepts a single file field named `video`.
 * - Enforces a maximum file size of 500 MB.
 * - Restricts uploads to files with a `video/*` MIME type.
 *
 * @type {multer.Multer}
 */
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed.'));
    }
  }
});

/**
 * POST /api/v1/videos/upload
 *
 * Accepts a single video file via `multipart/form-data` and saves it to the
 * local `raw_uploads` buffer directory. Upon successful ingestion the endpoint
 * responds with HTTP 202 Accepted, indicating that the asset has been received
 * and is pending asynchronous transcoding.
 *
 * @param {express.Request}  req - Express request object. Expects `req.file`
 *   to be populated by the Multer middleware (field name: `video`).
 * @param {express.Response} res - Express response object.
 * @returns {void}
 *
 * @example
 * // curl example
 * curl -X POST http://localhost:4001/api/v1/videos/upload \
 *   -F "video=@/path/to/your/video.mp4"
 */
app.post('/api/v1/videos/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Video file is required' });
    }

    res.status(202).json({
      message: 'Video uploaded and queued for processing',
      videoId: req.file.filename.split('.')[0],
      originalName: req.file.originalname,
      status: 'PROCESSING'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** Port on which the upload service listens, sourced from the environment. */
const PORT = process.env.UPLOAD_PORT || 4001;

app.listen(PORT, () => {
  console.log(`Upload service running on port ${PORT}`);
});