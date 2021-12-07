export interface RequestData {
  params: Record<string, string>
  body: string | Record<string, unknown> | null
}

type RouteHandler = (requestData: RequestData) => Response

const routes: Record<string, RouteHandler> = {}

const router = {
  get(path: string, callback: RouteHandler) {
    routes[`get::${path}`] = callback
  },

  post(path: string, callback: RouteHandler) {
    routes[`post::${path}`] = callback
  }
}

function matchRoute(requestMethod: string, requestPathname: string) {
  const requestRoute = `http://host.com${requestPathname}`
  let params: Record<string, string> = {}
  
  const matchedRoute = Object.keys(routes).find(key => {
    const [methodToCompare, routeToCompare] = key.split('::')
    const methodMatched = methodToCompare === requestMethod
    const routeMatched = new URLPattern({ pathname: routeToCompare}).test(requestRoute)
    
    return methodMatched && routeMatched
  })

  if (matchedRoute) {
    const [, route] = matchedRoute.split('::')
    const urlParams = new URLPattern({ pathname: route }).exec(requestRoute)

    if (urlParams) {
      params = urlParams.pathname.groups
    }
  }
  
  return matchedRoute ? { params, handler: routes[matchedRoute] } : null
}

export { router, matchRoute }
