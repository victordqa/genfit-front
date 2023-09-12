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
  getBoxApi: "/coaches/box",
  boxPage: "/box",
  suggestTrainningApi: "/trainnings/suggest",
  listCoachExsApi: "/exercises/list",
  listCoachModsApi: "/exercises/list-modifiers",
  createTrainningApi: "/trainnings/create",
}

export const publicRoutes = [routes.home]

export default routes
