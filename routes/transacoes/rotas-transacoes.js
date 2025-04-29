import { DbTransacoes } from "./db-transacoes.js";

const db = new DbTransacoes();

const getTransacoes = (server) => server.get("/transacoes", async (request, reply) => {
  const transacoes = await db.getTransacoes(request.query.search);
  return reply.status(200).send({ transacoes });
});

const postTransacao = (server) => server.post("/transacoes", async (request, reply) => {
  const id = await db.createTransacao(request.body);
  return reply.status(201).send(id);
});

const putTransacao = (server) => server.put("/transacoes/:id", async (request, reply) => {
  await db.updateTransacao(request.params.id, request.body);
  return reply.status(204).send();
});

const patchTransacao = (server) => server.patch("/transacoes/:id", async (request, reply) => {
  await db.updatePartialTransacao(request.params.id, request.body);
  return reply.status(204).send();
});

const deleteTransacao = (server) => server.delete("/transacoes/:id", async (request, reply) => {
  await db.deleteTransacao(request.params.id);
  return reply.status(204).send();
});


export { getTransacoes, postTransacao, putTransacao, patchTransacao, deleteTransacao };
