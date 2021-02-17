const express = require("express");
const request = require("supertest");
const rateLimit = require("../lib/setRateLimit");

describe("headers", () => {
	function createAppWith(limit) {
		const app = express();
		app.all("/", limit, (req, res) => {
			res.send("response!");
		});
		return app;
	}

	it("should send correct x-ratelimit-limit, x-ratelimit-remaining, and x-ratelimit-reset headers", async () => {
		const limit = 1000;
		const windowMs = 60 * 60 * 60 * 1000; // 60 * 1000 = 1 minute
		const app = createAppWith(
			rateLimit({
				windowMs: windowMs,
				limit: limit,
				headers: true,
			})
		);
		const expectedRemaining = 999;
		const expectedResetTimestamp = Math.ceil(
			(Date.now() + windowMs) / 1000
		).toString();
		
		await request(app)
			.get("/")
			.expect("x-ratelimit-limit", limit.toString())
			.expect("x-ratelimit-remaining", expectedRemaining.toString())
			.expect("x-ratelimit-reset", expectedResetTimestamp)
			.expect(200, /response!/);
	});

	it("should return the Retry-After header once IP has reached the max", async () => {
		const windowSeconds = 60 * 60 * 60;

		const app = createAppWith(
			rateLimit({
				windowMs: windowSeconds * 1000,
				delayMs: 0,
				max: 1,
			})
		);
		await request(app).get("/").expect(200);

		await request(app)
			.get("/")
			.expect(429)
			.expect("retry-after", windowSeconds.toString());
	});
});
