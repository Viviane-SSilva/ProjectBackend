import fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";


const app = fastify({ logger: true })

app.register(cors);
app.register(routes);


app.setErrorHandler((error, request, reply) => {
   reply.code(400).send({ message: error.message })
})

export { app };