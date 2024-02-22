import request from "supertest";
import { app } from "@/app";

import { it, describe, expect, beforeAll, afterAll } from "vitest";

describe("Router test (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("Espera-se que seja possivel receber um json ok da rota /test", async () => {
		const response = await request(app.server).get("/teste");


		console.log(response.body);
		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual(expect.objectContaining({
			ok: true
		}));
	});


});
