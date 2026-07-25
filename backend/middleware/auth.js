import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fleet_secret";


// =====================================
// VALIDAR TOKEN JWT
// =====================================

export async function auth(request, reply) {

  try {

    const authHeader = request.headers.authorization;


    if (!authHeader) {

      return reply.status(401).send({
        message: "Token não informado."
      });

    }


    const parts = authHeader.split(" ");


    if (parts.length !== 2 || parts[0] !== "Bearer") {

      return reply.status(401).send({
        message: "Formato de token inválido."
      });

    }


    const token = parts[1];


    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );


    request.user = decoded;


  } catch(error) {

    console.log("ERRO JWT:", error.message);

    return reply.status(401).send({
      message: "Token inválido ou expirado."
    });

  }

}




// =====================================
// PERMISSÃO ADMINISTRADOR
// =====================================

export async function adminOnly(request, reply) {


  if (!request.user) {

    return reply.status(401).send({
      message: "Usuário não autenticado."
    });

  }



  if (request.user.role !== "Administrador") {

    return reply.status(403).send({
      message: "Acesso permitido somente para administradores."
    });

  }

}