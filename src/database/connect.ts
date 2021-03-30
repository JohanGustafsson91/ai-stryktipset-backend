import mongoose from "mongoose";

export const connectToDb = async (
  port: string,
  table: string,
  config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
) => mongoose.connect(`mongodb://localhost:${port}/${table}`, config);
