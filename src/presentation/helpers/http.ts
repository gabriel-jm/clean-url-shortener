export function redirect(content: string) {
  return {
    statusCode: 308,
    body: {
      hash: content
    }
  }
}
