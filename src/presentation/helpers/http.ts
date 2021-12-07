export function ok(content: Record<string, unknown>) {
  return {
    statusCode: 200,
    body: content
  }
}

export function redirect(content: string) {
  return {
    statusCode: 308,
    body: {
      hash: content
    }
  }
}
