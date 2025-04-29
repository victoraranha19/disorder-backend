import { sql } from "../../db.js";


export class DbTransacoes {
  tableName = 'transacoes';

  async getTransacoes(search) {
    let queryStr = `SELECT * FROM ${this.tableName}`;
    if (search) {
      queryStr = `${queryStr} WHERE descricao ILIKE '%${search}%'`;
    }
    const query = sql.query(queryStr);
    return await query;
  }

  async createTransacao(transacao) {
    return sql.query(`INSERT INTO ${this.tableName} (descricao, valor, dataTransacao, tipo, idUsuario)
    VALUES('${transacao.descricao}', ${transacao.valor}, '${transacao.dataTransacao}', '${transacao.tipo}', ${transacao.idUsuario})
    RETURNING id;`);
  }

  async updateTransacao(id, transacao) {
    const queryArr = [];

    if (transacao.descricao) queryArr.push(`descricao = '${transacao.descricao}'`);
    if (transacao.valor) queryArr.push(`valor = ${transacao.valor}`);
    if (transacao.dataTransacao) queryArr.push(`dataTransacao = '${transacao.dataTransacao}'`);
    if (transacao.tipo) queryArr.push(`tipo = '${transacao.tipo}'`);
    queryArr.push(`idCategoria = ${transacao.idCategoria ?? null}`);
    queryArr.push(`idCarteira = ${transacao.idCarteira ?? null}`);
    if (transacao.idUsuario) queryArr.push(`idUsuario = ${transacao.idUsuario}`);
    queryArr.push(`ativo = ${transacao.ativo ?? true}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async updatePartialTransacao(id, transacao) {
    const queryArr = [];

    if (transacao.descricao) queryArr.push(`descricao = '${transacao.descricao}'`);
    if (transacao.valor) queryArr.push(`valor = ${transacao.valor}`);
    if (transacao.dataTransacao) queryArr.push(`dataTransacao = '${transacao.dataTransacao}'`);
    if (transacao.tipo) queryArr.push(`tipo = '${transacao.tipo}'`);
    if (transacao.idCategoria) queryArr.push(`idCategoria = ${transacao.idCategoria}`);
    if (transacao.idCarteira) queryArr.push(`idCarteira = ${transacao.idCarteira}`);
    if (transacao.idUsuario) queryArr.push(`idUsuario = ${transacao.idUsuario}`);
    // If para caso mande {ativo: false}
    if (transacao.ativo !== undefined) queryArr.push(`ativo = ${transacao.ativo}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async deleteTransacao(id) {
    return await sql.query(`DELETE FROM ${this.tableName} WHERE id = ${id};`);
  }
}
