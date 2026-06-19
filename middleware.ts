import { NextRequest, NextResponse } from "next/server";

const adminCookieName = "melon_admin_session";

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "melonadmin2026";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname === "/melonadmin/login") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (!pathname.startsWith("/melonadmin")) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const session = request.cookies.get(adminCookieName)?.value;
  if (session === sessionSecret()) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/melonadmin/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads).*)"],
};
