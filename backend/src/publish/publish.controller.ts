import { Controller, Get, HttpCode, Injectable, Module, Post, ServiceUnavailableException, UseGuards } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtAuthGuard } from "../auth/jwt.guard";

/**
 * "Publish" asks GitHub to run the Pages workflow, which downloads the
 * public snapshot from this API and rebuilds the static site.
 */
@Injectable()
export class PublishService {
  private cfg() {
    const token = process.env.GITHUB_TOKEN?.trim();
    const repo = process.env.GITHUB_REPO?.trim() || "mdrakibtrofder/mdrakibtrofder.github.io";
    const workflow = process.env.GITHUB_WORKFLOW?.trim() || "deploy.yml";
    const ref = process.env.GITHUB_REF?.trim() || "main";
    if (!token) throw new ServiceUnavailableException("Publishing is not set up: GITHUB_TOKEN is missing on the server");
    return { token, repo, workflow, ref };
  }

  private headers(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "portfolio-api",
    };
  }

  async trigger() {
    const { token, repo, workflow, ref } = this.cfg();
    const res = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`, {
      method: "POST",
      headers: { ...this.headers(token), "Content-Type": "application/json" },
      body: JSON.stringify({ ref }),
    });
    if (res.status !== 204) {
      throw new ServiceUnavailableException(`GitHub refused the publish request (${res.status}): ${await res.text()}`);
    }
    return { started: true, actionsUrl: `https://github.com/${repo}/actions/workflows/${workflow}` };
  }

  async status() {
    const { token, repo, workflow } = this.cfg();
    const res = await fetch(
      `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/runs?per_page=1`,
      { headers: this.headers(token) },
    );
    if (!res.ok) throw new ServiceUnavailableException(`Could not read workflow status (${res.status})`);
    const body = (await res.json()) as { workflow_runs?: Record<string, unknown>[] };
    const run = body.workflow_runs?.[0];
    return run
      ? { status: run.status, conclusion: run.conclusion, startedAt: run.run_started_at, url: run.html_url }
      : { status: "none" };
  }
}

@Controller("admin/publish")
@UseGuards(JwtAuthGuard)
export class PublishController {
  constructor(private readonly publish: PublishService) {}

  @Post()
  @HttpCode(202)
  trigger() {
    return this.publish.trigger();
  }

  @Get("status")
  status() {
    return this.publish.status();
  }
}

@Module({ imports: [AuthModule], controllers: [PublishController], providers: [PublishService] })
export class PublishModule {}
