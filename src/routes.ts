const routes = {
  boxesRoute: "/boxes",
  login: "/auth/login",
  logout: "/auth/logout",
  signup: "/coaches/create",
  me: "/coaches/me",
  home: "/",
  dashboard: "/dashboard",
  listBoxesApi: "/coaches/boxes",
  createBoxesApi: "/coaches/create-box",
}

export const publicRoutes = [routes.home]

export default routes
