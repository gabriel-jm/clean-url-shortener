type RouteHandler = (request: Request) => void | Response

const routes: Record<string, RouteHandler> = {}

const router = {
  get(path: string, callback: RouteHandler) {
    routes[`get::${path}`] = callback
  },

  post(path: string, callback: RouteHandler) {
    routes[`post::${path}`] = callback
  }
}

function matchRoute(requestRoute: string) {
  if (!(requestRoute in routes)) return null
  
  return routes[requestRoute]
}

export { router, matchRoute }
