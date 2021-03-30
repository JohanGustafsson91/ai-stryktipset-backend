import {
  Stryktips as DBStryktips,
  StryktipsModel,
} from "database/models/Stryktips";
import { Router } from "express";
import { Odds, Result, Stryktips } from "models/Stryktips";

const router = Router();

router.get("/", async (req, res) => {
  const games = await StryktipsModel.find({ description: /brainjs/ });
  return res.status(200).json(formatStryktipsData(games));
});

const formatStryktipsData = (data: DBStryktips[]): { items: Stryktips[] } => ({
  items: data.map((item) => ({
    id: item._id,
    name: item.description ?? "",
    games: item.games.map((game) => ({
      id: game._id,
      homeTeam: game.homeTeam.name,
      awayTeam: game.awayTeam.name,
      result: formatResults(game.results),
      odds: formatOdds(game.odds.find((o) => o.source === "oddsportal")),
    })),
  })),
});

const formatResults = (result: Result | undefined): Result | null =>
  result
    ? (Object.keys(result).reduce((acc, curr) => {
        const resultKey = curr as keyof Result;
        const isGameResult = result[resultKey] === true;
        return isGameResult ? MAP_RESULT[resultKey] : acc;
      }, "") as Result)
    : null;

const formatOdds = (odds: any): Odds => ({
  1: odds.one,
  X: odds.x,
  2: odds.two,
});

const MAP_RESULT = {
  one: "1",
  x: "X",
  two: "2",
};

export default router;
