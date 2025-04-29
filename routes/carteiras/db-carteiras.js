import { sql } from "../../db.js";


export class DbCarteiras {
  tableName = 'carteiras';

  async getCarteiras() {
    return await sql.query(`SELECT * FROM ${this.tableName};`);
  }

  async createCarteira(carteira) {
    return sql.query(`INSERT INTO ${this.tableName} (titulo, valorNaConta, limiteCreditoTotal, idUsuario)
    VALUES('${carteira.titulo}', ${carteira.valorNaConta}, ${carteira.limiteCreditoTotal}, ${carteira.idUsuario})
    RETURNING id;`);
  }

  async updateCarteira(id, carteira) {
    const queryArr = [];

    if (carteira.titulo) queryArr.push(`titulo = '${carteira.titulo}'`);
    if (carteira.valorNaConta) queryArr.push(`valorNaConta = ${carteira.valorNaConta}`);
    queryArr.push(`limiteCreditoTotal = ${carteira.limiteCreditoTotal ?? null}`);
    queryArr.push(`ativo = ${carteira.ativo ?? true}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async updatePartialCarteira(id, carteira) {
    const queryArr = [];

    if (carteira.titulo) queryArr.push(`titulo = '${carteira.titulo}'`);
    if (carteira.valorNaConta) queryArr.push(`valorNaConta = ${carteira.valorNaConta}`);
    if (carteira.limiteCreditoTotal) queryArr.push(`limiteCreditoTotal = ${carteira.limiteCreditoTotal}`);
    // If para caso mande {ativo: false}
    if (carteira.ativo !== undefined) queryArr.push(`ativo = ${!!carteira.ativo}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async deleteCarteira(id) {
    return await sql.query(`DELETE FROM ${this.tableName} WHERE id = ${id};`);
  }
}
