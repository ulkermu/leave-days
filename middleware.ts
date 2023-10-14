import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthPages } from "./libs/auth";

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const isAuthPageRequested = await isAuthPages(nextUrl.pathname);

  // Check if the request is for a static file and if so, do not process further
  if (nextUrl.pathname.startsWith("/_next/static/")) {
    return NextResponse.next();
  }

  if (isAuthPageRequested) {
    if (token) {
      // Eğer kullanıcı yetkiliyse ve yetkili olmayan bir sayfayı ziyaret etmeye çalışıyorsa, dashboard'a yönlendirilir.
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
      );
    } else {
      // Eğer kullanıcı yetkili değilse ve yetkili olmayan bir sayfayı ziyaret etmeye çalışıyorsa, bu sayfaya erişim sağlanır.
      return NextResponse.next();
    }
  } else {
    if (!token) {
      // Eğer kullanıcı yetkili değilse ve yetkili bir sayfayı ziyaret etmeye çalışıyorsa, login sayfasına yönlendirilir.
      const searchParams = new URLSearchParams(nextUrl.searchParams);
      searchParams.set("next", nextUrl.pathname);

      const redirectUrl = new URL(`/login?${searchParams}`, url);
      return NextResponse.redirect(redirectUrl);
    } else {
      // Eğer kullanıcı yetkiliyse ve yetkili bir sayfayı ziyaret etmeye çalışıyorsa, bu sayfaya erişim sağlanır.
      return NextResponse.next();
    }
  }
}
