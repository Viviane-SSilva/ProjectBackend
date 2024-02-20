import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest";

function gebereteDateBaseUrl(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL não configurado em arquivo .env");
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set("schema", schema);

	return url;
}

const prisma = new PrismaClient();

export default <Environment>{
	name: "prisma",
	transformMode: "ssr",
	// optional - only if you support "experimental-vm" pool
	async setupVM() {
		const vm = await import("node:vm");
		const context = vm.createContext();
		return {
			getVmContext() {
				return context;
			},
			teardown() {
				// called after all tests with this env have been run
			},
		};
	},
	setup() {
		const schema = randomUUID();
		const dataUrl = gebereteDateBaseUrl(schema);
		process.env.DATABASE_URL = dataUrl.href;
		// global.process.env.DATABASE_URL = dataUrl.href;

		execSync(`npx prisma migrate deploy`);

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`
				);
				await prisma.$disconnect();
			},
		};
	},
};
