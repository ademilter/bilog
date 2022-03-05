// TODO: https://github.com/vercel/next.js/issues/11993#issuecomment-617916930
export function deepCopy(data = {}): object {
  return JSON.parse(JSON.stringify(data));
}

export function getPostIdFromSlug(slug: string): string {
  return slug.split("-").pop();
}
