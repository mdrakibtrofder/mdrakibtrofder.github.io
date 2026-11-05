import { Controller, Get, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { mongoUri } from "./config/env";
import { AuthModule } from "./auth/auth.module";
import { ContentModule } from "./content/content.module";
import { MediaModule } from "./media/media.module";
import { PublishModule } from "./publish/publish.controller";

@Controller("health")
class HealthController {
  @Get()
  health() {
    return { ok: true, time: new Date().toISOString() };
  }
}

@Module({
  imports: [
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: mongoUri() }) }),
    // Per-IP requests per minute; login has its own stricter limit.
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: Number(process.env.RATE_LIMIT_PER_MINUTE) || 600 }]),
    AuthModule,
    ContentModule,
    MediaModule,
    PublishModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
