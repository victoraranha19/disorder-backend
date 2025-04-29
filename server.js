import Fastify from "fastify";
import { deleteCarteira, getCarteiras, patchCarteira, postCarteira, putCarteira } from "./routes/carteiras/rotas-categorias.js";
import { deleteCategoria, getCategorias, patchCategoria, postCategoria, putCategoria } from "./routes/categorias/rotas-categorias.js";
import { deleteUsuario, getUsuarios, patchUsuario, postUsuario, putUsuario } from "./routes/usuarios/rotas-usuarios.js";
import { deleteTransacao, getTransacoes, patchTransacao, postTransacao, putTransacao } from "./routes/transacoes/rotas-transacoes.js";

const server = Fastify();

getUsuarios(server);
postUsuario(server);
putUsuario(server);
patchUsuario(server);
deleteUsuario(server);

getCategorias(server);
postCategoria(server);
putCategoria(server);
patchCategoria(server);
deleteCategoria(server);

getCarteiras(server);
postCarteira(server);
putCarteira(server);
patchCarteira(server);
deleteCarteira(server);

getTransacoes(server);
postTransacao(server);
putTransacao(server);
patchTransacao(server);
deleteTransacao(server);

try {
  await server.listen({ port: process.env.PORT ?? 3000 });
  server.log.info(`Server listening on ${server.server.address().port}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
