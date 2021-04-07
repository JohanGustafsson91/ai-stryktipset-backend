import {
  Stryktips as DBStryktips,
  Results as DBResult,
  Odds as DBOdds,
  StryktipsModel,
} from "database/models/Stryktips";
import { unexpectedError } from "errors";
import { Request, Response, Router } from "express";
import { Odds, Result, Stryktips } from "models/Stryktips";

const router = Router();

router.get("/", async function handleGet(req: Request, res: Response) {
  try {
    const games = await StryktipsModel.find({ description: /brainjs/ });
    return res.status(200).json(formatStryktipsData(games));
  } catch (error) {
    return res.status(500).json(unexpectedError(error?.message, req.baseUrl));
  }
});

const formatStryktipsData = (data: DBStryktips[]): { items: Stryktips[] } => ({
  items: data.map((item) => ({
    id: item._id,
    name: item.description ?? "",
    games: item.games.map((game) => ({
      id: game._id,
      homeTeam: game.homeTeam.name,
      awayTeam: game.awayTeam.name,
      result: game.results ? formatResults(game.results) : null,
      odds: formatOdds(game.odds.find((o) => o.source === "oddsportal")),
    })),
  })),
});

const formatResults = (result: DBResult): Result =>
  Object.keys(result).reduce((acc, curr) => {
    const resultKey = curr as keyof DBResult;
    const isGameResult = result[resultKey] === true;
    return isGameResult ? MAP_RESULT[resultKey] : acc;
  }, "") as Result;

const formatOdds = (odds: DBOdds | undefined): Odds => ({
  "1": odds?.one ?? "",
  X: odds?.x ?? "",
  "2": odds?.two ?? "",
});

const MAP_RESULT = {
  one: "1",
  x: "X",
  two: "2",
};

export default router;
