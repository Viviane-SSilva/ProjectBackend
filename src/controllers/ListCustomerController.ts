import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from '../services/ListCustomerService'

class ListCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listCustomersService = new ListCustomerService();

        const customers = await listCustomersService.execute();

        reply.send(customers);
    }



}

export { ListCustomerController }