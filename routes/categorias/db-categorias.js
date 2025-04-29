import { sql } from "../../db.js";


export class DbCategorias {
  tableName = 'categorias';

  async getCategoria() {
    return await sql.query(`SELECT * FROM ${this.tableName};`);
  }

  async createCategoria(categoria) {
    return sql.query(`INSERT INTO ${this.tableName} (titulo, valorMes, idUsuario)
    VALUES('${categoria.titulo}', ${categoria.valorMes}, ${categoria.idUsuario})
    RETURNING id;`);
  }

  async updateCategoria(id, categoria) {
    const queryArr = [];

    if (categoria.titulo) queryArr.push(`titulo = '${categoria.titulo}'`);
    if (categoria.valorMes) queryArr.push(`valorMes = ${categoria.valorMes}`);
    queryArr.push(`ativo = ${categoria.ativo ?? true}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async updatePartialCategoria(id, categoria) {
    const queryArr = [];

    if (categoria.titulo) queryArr.push(`titulo = '${categoria.titulo}'`);
    if (categoria.valorMes) queryArr.push(`valorMes = ${categoria.valorMes}`);
    // If para caso mande {ativo: false}
    if (categoria.ativo !== undefined) queryArr.push(`ativo = ${!!categoria.ativo}`);

    let queryStr = `UPDATE ${this.tableName} SET ${queryArr.join(', ')} WHERE id = ${id}`;

    return await sql.query(queryStr);
  }

  async deleteCategoria(id) {
    return await sql.query(`DELETE FROM ${this.tableName} WHERE id = ${id};`);
  }
}
