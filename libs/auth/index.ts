const AUTH_PAGES = ["/login", "/register"];

export async function isAuthPages(url: string) {
  return AUTH_PAGES.some((page) => page.startsWith(url));
}
