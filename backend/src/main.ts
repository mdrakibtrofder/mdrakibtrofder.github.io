import "dotenv/config";
import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { corsOrigins } from "./config/env";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set("trust proxy", 1); // behind Render's proxy: rate limits use the real client IP
  app.setGlobalPrefix("api");
  app.use(helmet());
  app.useBodyParser("json", { limit: "2mb" });
  app.enableCors({ origin: corsOrigins(), methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableShutdownHooks();
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`API listening on :${port}/api`);
}

bootstrap();
