import { Router } from "express";

const router = Router();

router.post("/train", (req, res) => res.status(200).json({ id: "test" }));

export default router;
