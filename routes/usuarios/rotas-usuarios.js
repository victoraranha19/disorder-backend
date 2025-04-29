import { DbUsuarios } from "./db-usuarios.js";

const db = new DbUsuarios();

const getUsuarios = (server) => server.get("/usuarios", async (request, reply) => {
  const usuarios = await db.getUser(request.query.search);
  return reply.status(200).send({ usuarios });
});

const postUsuario = (server) => server.post("/usuarios", async (request, reply) => {
  const id = await db.createUser(request.body);
  return reply.status(201).send(id);
});

const putUsuario = (server) => server.put("/usuarios/:id", async (request, reply) => {
  await db.updateUser(request.params.id, request.body);
  return reply.status(204).send();
});

const patchUsuario = (server) => server.patch("/usuarios/:id", async (request, reply) => {
  await db.updatePartialUser(request.params.id, request.body);
  return reply.status(204).send();
});

const deleteUsuario = (server) => server.delete("/usuarios/:id", async (request, reply) => {
  await db.deleteUser(request.params.id);
  return reply.status(204).send();
});


export { getUsuarios, postUsuario, putUsuario, patchUsuario, deleteUsuario };
