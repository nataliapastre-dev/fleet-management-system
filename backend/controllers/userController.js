import db from "../database/database.js";
import bcrypt from "bcrypt";


// =====================================
// LISTAR USUÁRIOS
// GET /users
// =====================================

export async function getUsers(request, reply) {

  try {

    const users = db
      .prepare(`
        SELECT
          id,
          name,
          email,
          role,
          status,
          last_login,
          created_at
        FROM users
        ORDER BY id DESC
      `)
      .all();


    return reply.send(users);


  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      message: "Erro ao buscar usuários."
    });

  }

}



// =====================================
// CRIAR USUÁRIO
// POST /users
// =====================================

export async function createUser(request, reply) {

  try {

    const {
      name,
      email,
      password,
      role,
      status
    } = request.body || {};



    if (!name || !email || !password) {

      return reply.status(400).send({
        message: "Nome, e-mail e senha são obrigatórios."
      });

    }



    const existingUser = db
      .prepare(`
        SELECT id
        FROM users
        WHERE email = ?
      `)
      .get(email);



    if (existingUser) {

      return reply.status(400).send({
        message: "Usuário já cadastrado."
      });

    }



    const passwordHash = await bcrypt.hash(
      password,
      10
    );



    const result = db
      .prepare(`
        INSERT INTO users
        (
          name,
          email,
          password,
          role,
          status
        )
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        name,
        email,
        passwordHash,
        role || "Operador",
        status || "Ativo"
      );



    return reply.status(201).send({

      message: "Usuário criado com sucesso.",

      user: {
        id: result.lastInsertRowid,
        name,
        email,
        role: role || "Operador",
        status: status || "Ativo"
      }

    });



  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      message: "Erro ao criar usuário."
    });

  }

}



// =====================================
// EDITAR USUÁRIO
// PUT /users/:id
// =====================================

export async function updateUser(request, reply) {

  try {

    const { id } = request.params;


    const {
      name,
      email,
      role,
      status
    } = request.body || {};



    const user = db
      .prepare(`
        SELECT *
        FROM users
        WHERE id = ?
      `)
      .get(id);



    if (!user) {

      return reply.status(404).send({
        message: "Usuário não encontrado."
      });

    }



    const emailExists = db
      .prepare(`
        SELECT id
        FROM users
        WHERE email = ?
        AND id <> ?
      `)
      .get(email, id);



    if (emailExists) {

      return reply.status(400).send({
        message: "E-mail já utilizado por outro usuário."
      });

    }



    db.prepare(`
      UPDATE users
      SET
        name = ?,
        email = ?,
        role = ?,
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    .run(
      name,
      email,
      role,
      status,
      id
    );



    return reply.send({
      message: "Usuário atualizado com sucesso."
    });



  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      message: "Erro ao atualizar usuário."
    });

  }

}



// =====================================
// ALTERAR SENHA
// PATCH /users/:id/password
// =====================================

export async function updatePassword(request, reply) {

  try {

    const { id } = request.params;

    const { password } = request.body || {};



    if (!password) {

      return reply.status(400).send({
        message: "Nova senha obrigatória."
      });

    }



    const user = db
      .prepare(`
        SELECT id
        FROM users
        WHERE id = ?
      `)
      .get(id);



    if (!user) {

      return reply.status(404).send({
        message: "Usuário não encontrado."
      });

    }



    const passwordHash = await bcrypt.hash(
      password,
      10
    );



    db.prepare(`
      UPDATE users
      SET
        password = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    .run(
      passwordHash,
      id
    );



    return reply.send({
      message: "Senha alterada com sucesso."
    });



  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      message: "Erro ao alterar senha."
    });

  }

}



// =====================================
// EXCLUIR USUÁRIO
// DELETE /users/:id
// =====================================

export async function deleteUser(request, reply) {

  try {

    const { id } = request.params;



    if (Number(id) === Number(request.user.id)) {

      return reply.status(400).send({
        message: "Você não pode excluir o próprio usuário."
      });

    }



    const user = db
      .prepare(`
        SELECT id
        FROM users
        WHERE id = ?
      `)
      .get(id);



    if (!user) {

      return reply.status(404).send({
        message: "Usuário não encontrado."
      });

    }



    db.prepare(`
      DELETE FROM users
      WHERE id = ?
    `)
    .run(id);



    return reply.send({
      message: "Usuário removido com sucesso."
    });



  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      message: "Erro ao excluir usuário."
    });

  }

}