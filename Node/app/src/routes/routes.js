import express from "express";

const API_ROOT = '/api';

import { getRating, createRating, updateRating, deleteRating, getRatings } from "../controllers/ratings-controller.js";

const router = express.Router();
router.get(`${API_ROOT}/ratings/:userId`, getRatings);
router.get(`${API_ROOT}/ratings/:userId/:movieId`, getRating);
router.post(`${API_ROOT}/ratings`, createRating);
router.put(`${API_ROOT}/ratings/:idRating`, updateRating);
router.delete(`${API_ROOT}/ratings/:idRating`, deleteRating);

export default router;
