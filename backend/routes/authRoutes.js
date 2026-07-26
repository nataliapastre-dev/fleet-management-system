import {
  login,
  register,
  me,
  testUsers,
} from "../controllers/authController.js";


import {
  auth,
  adminOnly,
} from "../middleware/auth.js";



// =====================================
// ROTAS DE AUTENTICAÇÃO
// Prefixo: /auth
// =====================================

export default async function authRoutes(app) {



  // =====================================
  // CADASTRAR USUÁRIO
  // POST /auth/register
  // Apenas administrador
  // =====================================

  app.post(
    "/register",
    {
      preHandler: [
        auth,
        adminOnly
      ]
    },
    register
  );





  // =====================================
  // LOGIN
  // POST /auth/login
  // Público
  // =====================================

  app.post(
    "/login",
    login
  );





  // =====================================
  // USUÁRIO AUTENTICADO
  // GET /auth/me
  // =====================================

  app.get(
    "/me",
    {
      preHandler: auth
    },
    me
  );





  // =====================================
  // TESTE BANCO RENDER
  // GET /auth/test-users
  // REMOVER DEPOIS
  // =====================================

  app.get(
    "/test-users",
    testUsers
  );



}