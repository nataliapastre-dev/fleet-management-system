import db from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fleet_secret";


// =====================================
// CADASTRAR USUÁRIO
// POST /auth/register
// =====================================

export async function register(request, reply) {

  try {

    const {
      name,
      email,
      password,
      role
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


    const passwordHash = await bcrypt.hash(password, 10);


    const result = db
      .prepare(`
        INSERT INTO users (
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
        role || "Administrador",
        "Ativo"
      );


    return reply.status(201).send({

      message: "Usuário criado com sucesso.",

      user: {
        id: result.lastInsertRowid,
        name,
        email,
        role: role || "Administrador",
        status: "Ativo"
      }

    });


  } catch(error){

    console.error(error);


    return reply.status(500).send({
      message: "Erro ao cadastrar usuário."
    });

  }

}




// =====================================
// LOGIN
// POST /auth/login
// =====================================

export async function login(request, reply) {

  try {

    const {
      email,
      password
    } = request.body || {};


    if(!email || !password){

      return reply.status(400).send({
        message:"E-mail e senha são obrigatórios."
      });

    }


    const user = db
      .prepare(`
        SELECT *
        FROM users
        WHERE email = ?
      `)
      .get(email);



    if(!user){

      return reply.status(401).send({
        message:"Usuário ou senha inválidos."
      });

    }



    if(user.status !== "Ativo"){

      return reply.status(403).send({
        message:"Usuário desativado."
      });

    }



    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );



    if(!passwordMatch){

      return reply.status(401).send({
        message:"Usuário ou senha inválidos."
      });

    }



    db.prepare(`
      UPDATE users
      SET
        last_login = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    .run(user.id);



    const token = jwt.sign(

      {
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
      },

      JWT_SECRET,

      {
        expiresIn:"8h"
      }

    );



    return reply.send({

      message:"Login realizado com sucesso.",

      token,

      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        status:user.status
      }

    });



  } catch(error){

    console.error(error);


    return reply.status(500).send({
      message:"Erro ao realizar login."
    });

  }

}





// =====================================
// USUÁRIO LOGADO
// GET /auth/me
// =====================================

export async function me(request, reply){

  try {


    const authHeader = request.headers.authorization;



    if(!authHeader){

      return reply.status(401).send({
        message:"Token não informado."
      });

    }



    const parts = authHeader.split(" ");



    if(parts.length !== 2 || parts[0] !== "Bearer"){

      return reply.status(401).send({
        message:"Formato de token inválido. Use Bearer TOKEN."
      });

    }



    const token = parts[1];



    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );



    const user = db
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
        WHERE id = ?
      `)
      .get(decoded.id);



    if(!user){

      return reply.status(404).send({
        message:"Usuário não encontrado."
      });

    }



    return reply.send(user);



  } catch(error){


    console.error(error.message);



    if(error.name === "TokenExpiredError"){

      return reply.status(401).send({
        message:"Token expirado."
      });

    }



    return reply.status(401).send({
      message:"Token inválido ou expirado."
    });


  }

}