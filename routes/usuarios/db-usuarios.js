import { sql } from "../../db.js";


export class DbUsuarios {
  tableName = 'usuarios';

  async getUser(search) {
    let queryStr = `SELECT * FROM ${this.tableName}`;
    if (search) {
      queryStr = `${queryStr} WHERE username ILIKE '%${search}%' OR nomeCompleto ILIKE '%${search}%'`;
    }
    const query = sql.query(queryStr);
    return await query;
  }

  async createUser(user) {
    return sql.query(`INSERT INTO ${this.tableName} (username, senha, nomecompleto)
    VALUES('${user.username}', '${user.senha}', '${user.nomecompleto}')
    RETURNING id;`);
  }

  async updateUser(id, user) {
    const queryArr = [];

    if (user.username) queryArr.push(`username = '${user.username}'`);
    if (user.senha) queryArr.push(`senha = '${user.senha}'`);
    queryArr.push(`nomecompleto = '${user.nomecompleto ?? null}'`);
    queryArr.push(`emailcontato = '${user.emailcontato ?? null}'`);
    queryArr.push(`telefonecontato = '${user.telefonecontato ?? null}'`);
    queryArr.push(`chavepix = '${user.chavepix ?? null}'`);
    queryArr.push(`idconsultor = ${user.idconsultor ?? null}`);
    queryArr.push(`restricoesconsultor = '${user.restricoesconsultor ?? null}'`);
    queryArr.push(`ehconsultor = ${user.ehconsultor ?? false}`);
    queryArr.push(`ativo = ${user.ativo ?? true}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async updatePartialUser(id, user) {
    const queryArr = [];

    if (user.username) queryArr.push(`username = '${user.username}'`);
    if (user.senha) queryArr.push(`senha = '${user.senha}'`);
    if (user.nomecompleto) queryArr.push(`nomecompleto = '${user.nomecompleto}'`);
    if (user.emailcontato) queryArr.push(`emailcontato = '${user.emailcontato}'`);
    if (user.telefonecontato) queryArr.push(`telefonecontato = '${user.telefonecontato}'`);
    if (user.chavepix) queryArr.push(`chavepix = '${user.chavepix}'`);
    if (user.idconsultor) queryArr.push(`idconsultor = ${user.idconsultor}`);
    if (user.restricoesconsultor) queryArr.push(`restricoesconsultor = '${user.restricoesconsultor}'`);
    // If para caso mande {ehconsultor: false}
    if (user.ehconsultor !== undefined) queryArr.push(`ehconsultor = ${user.ehconsultor}`);
    // If para caso mande {ativo: false}
    if (user.ativo !== undefined) queryArr.push(`ativo = ${user.ativo}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async deleteUser(id) {
    return await sql.query(`DELETE FROM ${this.tableName} WHERE id = ${id};`);
  }
}
