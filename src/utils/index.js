export function createPageUrl(slug) {
  return slug.startsWith("/") ? slug : `/${slug}`;
}