import { DbCarteiras } from "./db-carteiras.js";

const db = new DbCarteiras();

const getCarteiras = (server) => server.get("/carteiras", async (request, reply) => {
  const carteiras = await db.getCarteiras(request.query.search);
  return reply.status(200).send({ carteiras });
});

const postCarteira = (server) => server.post("/carteiras", async (request, reply) => {
  const id = await db.createCarteira(request.body);
  return reply.status(201).send(id);
});

const putCarteira = (server) => server.put("/carteiras/:id", async (request, reply) => {
  await db.updateCarteira(request.params.id, request.body);
  return reply.status(204).send();
});

const patchCarteira = (server) => server.patch("/carteiras/:id", async (request, reply) => {
  await db.updatePartialCarteira(request.params.id, request.body);
  return reply.status(204).send();
});

const deleteCarteira = (server) => server.delete("/carteiras/:id", async (request, reply) => {
  await db.deleteCarteira(request.params.id);
  return reply.status(204).send();
});


export { getCarteiras, postCarteira, putCarteira, patchCarteira, deleteCarteira };

