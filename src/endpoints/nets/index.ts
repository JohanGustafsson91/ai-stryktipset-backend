import { Request, Response, Router } from "express";
import { trainNetSchema } from "./schema";
import brain from "brain.js";
import { validate } from "middlewares/validation";
import { unexpectedError } from "errors";

const router = Router();

router.post(
  "/",
  validate({ body: trainNetSchema }),
  async function handlePost(req: Request, res: Response) {
    try {
      const { errorThresh, iterations, trainingData } = req.body;
      trainNet({ errorThresh, iterations }, trainingData);
      return res.status(201).json({ id: "test" });
    } catch (error) {
      return res.status(500).json(unexpectedError(error.message, req.baseUrl));
    }
  }
);

/**
 * TODOs
 * - Persist net
 * - Update db
 * - Feedback on training
 */
function trainNet(
  config: brain.INeuralNetworkTrainingOptions,
  trainingData: brain.INeuralNetworkTrainingData
) {
  console.log(config, trainingData);

  const net = new brain.NeuralNetwork({ hiddenLayers: [7] });

  const stats = net.train(trainingData, {
    errorThresh: 0.05,
    log: true,
    logPeriod: 100000,
    ...config,
  });

  console.log(stats);
  console.log(JSON.stringify(net.toJSON()));
}

export default router;
