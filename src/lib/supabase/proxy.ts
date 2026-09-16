import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const pathname = request.nextUrl.pathname;

    const protectedRoutes = [
      "/dashboard",
      "/programs",
      "/events",
      "/volunteers",
      "/participants",
      "/attendance",
      "/assessments",
      "/feedback",
      "/analytics",
      "/ai-tools",
      "/settings",
    ];

    const isProtectedRoute = protectedRoutes.some(
      (route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return supabaseResponse;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role;

  const adminOnlyRoutes = [
    "/volunteers",
    "/analytics",
  ];

  const adminVolunteerRoutes = [
    "/participants",
    "/ai-tools",
  ];

  const pathname = request.nextUrl.pathname;

  const isAdminOnlyRoute = adminOnlyRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAdminVolunteerRoute = adminVolunteerRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAdminOnlyRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    isAdminVolunteerRoute &&
    role !== "admin" &&
    role !== "volunteer"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}
