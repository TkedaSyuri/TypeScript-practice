import express from "express";
import morgan from "morgan";
import { Express, Request, Response, NextFunction } from "express";
import "express-async-errors";

const PORT = 3000;

const app: Express = express();

app.use(morgan("dev"));
app.use(express.static("static", { extensions: ["html"] }));

app.get("/api/hello", async (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.get("/api/error", async (req, res) => {
  throw new Error("error");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `);
});

function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("unexpected error occurred", err);
  res.status(500).send({
    message: "unexpected error occurred",
  });
}
