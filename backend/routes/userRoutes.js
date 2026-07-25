import {
  getUsers,
  createUser,
  updateUser,
  updatePassword,
  deleteUser
} from "../controllers/userController.js";


import {
  auth,
  adminOnly
} from "../middleware/auth.js";


// =====================================
// ROTAS DE USUÁRIOS
// Prefixo: /users
// Acesso: Administrador
// =====================================

export default async function userRoutes(app) {



  // =====================================
  // LISTAR USUÁRIOS
  // GET /users
  // =====================================

  app.get(
    "/",
    {
      preHandler: [
        auth,
        adminOnly
      ]
    },
    getUsers
  );




  // =====================================
  // CRIAR USUÁRIO
  // POST /users
  // =====================================

  app.post(
    "/",
    {
      preHandler: [
        auth,
        adminOnly
      ]
    },
    createUser
  );




  // =====================================
  // EDITAR USUÁRIO
  // PUT /users/:id
  // =====================================

  app.put(
    "/:id",
    {
      preHandler: [
        auth,
        adminOnly
      ]
    },
    updateUser
  );




  // =====================================
  // ALTERAR SENHA
  // PATCH /users/:id/password
  // =====================================

  app.patch(
    "/:id/password",
    {
      preHandler: [
        auth,
        adminOnly
      ]
    },
    updatePassword
  );




  // =====================================
  // EXCLUIR USUÁRIO
  // DELETE /users/:id
  // =====================================

  app.delete(
    "/:id",
    {
      preHandler: [
        auth,
        adminOnly
      ]
    },
    deleteUser
  );


}