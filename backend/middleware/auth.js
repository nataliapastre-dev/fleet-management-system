import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "fleet_secret";




// =====================================
// VALIDAR TOKEN JWT
// Middleware de autenticação
// =====================================

export async function auth(request, reply) {


  try {


    const authHeader = request.headers.authorization;



    console.log(
      "AUTH HEADER:",
      authHeader
    );



    if (!authHeader) {


      return reply.status(401).send({

        message:
          "Token não informado."

      });


    }





    const parts = authHeader.split(" ");




    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {


      return reply.status(401).send({

        message:
          "Formato de token inválido. Use Bearer TOKEN."

      });


    }





    const token = parts[1];




    const decoded = jwt.verify(

      token,

      JWT_SECRET

    );





    console.log(

      "TOKEN OK:",
      decoded

    );





    request.user = decoded;





  } catch(error) {


    console.log(
      "ERRO JWT:",
      error.message
    );



    if(error.name === "TokenExpiredError"){


      return reply.status(401).send({

        message:
          "Token expirado. Faça login novamente."

      });


    }





    return reply.status(401).send({

      message:
        "Token inválido ou expirado."

    });



  }


}









// =====================================
// PERMISSÃO ADMINISTRADOR
// =====================================

export async function adminOnly(request, reply) {



  try {



    if (!request.user) {


      return reply.status(401).send({

        message:
          "Usuário não autenticado."

      });


    }





    if (
      request.user.role !== "Administrador"
    ) {


      return reply.status(403).send({

        message:
          "Acesso permitido somente para administradores."

      });


    }



  } catch(error) {



    console.log(
      "ERRO ADMIN:",
      error.message
    );



    return reply.status(500).send({

      message:
        "Erro ao validar permissão."

    });


  }


}