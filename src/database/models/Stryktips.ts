import mongoose, { Schema, Document } from "mongoose";

export const STATUS_NOT_STARTED = "NOT_STARTED";
export const STATUS_ONGOING = "ONGOING";
export const STATUS_FINISHED = "FINISHED";

export interface Team {
  name: string;
  latest: Array<string>;
  position?: string;
  points?: string;
}

export interface Odds {
  source?: string;
  createdAt: Date;
  one?: string;
  x?: string;
  two?: string;
}

export interface Match extends Document {
  homeTeam: Team;
  awayTeam: Team;
  odds: Array<Odds>;
  results?: Results;
}

export interface Results {
  one?: boolean;
  x?: boolean;
  two?: boolean;
}

type RandomResultsStatus = "NOT_STARTED" | "ONGOING" | "STOPPED" | "FINISHED";

export interface Stryktips extends Document {
  createdAt: string;
  description?: string;
  games: Array<Match>;
  uniqueRows: number;
  numberOfTimes: number;
  randomResultsStatus: RandomResultsStatus;
}

const Team = {
  name: { type: String, required: true },
  latest: [String],
  position: { type: String },
  points: { type: String },
};

const StryktipsSchema = new Schema({
  createdAt: { type: String, default: Date.now },
  description: String,
  games: [
    {
      homeTeam: Team,
      awayTeam: Team,
      odds: [
        {
          source: { type: String },
          createdAt: { type: Date, default: Date.now },
          one: { type: String },
          x: { type: String },
          two: { type: String },
        },
      ],
      results: {
        one: Boolean,
        x: Boolean,
        two: Boolean,
      },
    },
  ],
  randomResultsStatus: {
    type: String,
    default: STATUS_NOT_STARTED,
  },
  uniqueRows: Number,
  numberOfTimes: Number,
});

export const StryktipsModel = mongoose.model<Stryktips>(
  "Game",
  StryktipsSchema,
  "games"
);
