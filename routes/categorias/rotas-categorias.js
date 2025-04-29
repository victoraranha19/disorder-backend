import { DbCategorias } from "./db-categorias.js";

const db = new DbCategorias();

const getCategorias = (server) => server.get("/categorias", async (request, reply) => {
  const categorias = await db.getCategoria(request.query.search);
  return reply.status(200).send({ categorias });
});

const postCategoria = (server) => server.post("/categorias", async (request, reply) => {
  const id = await db.createCategoria(request.body);
  return reply.status(201).send(id);
});

const putCategoria = (server) => server.put("/categorias/:id", async (request, reply) => {
  await db.updateCategoria(request.params.id, request.body);
  return reply.status(204).send();
});

const patchCategoria = (server) => server.patch("/categorias/:id", async (request, reply) => {
  await db.updatePartialCategoria(request.params.id, request.body);
  return reply.status(204).send();
});

const deleteCategoria = (server) => server.delete("/categorias/:id", async (request, reply) => {
  await db.deleteCategoria(request.params.id);
  return reply.status(204).send();
});


export { deleteCategoria, getCategorias, patchCategoria, postCategoria, putCategoria };

