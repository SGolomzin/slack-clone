import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isAuthPage = createRouteMatcher(["/auth"])

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
	if (!isAuthPage(request) && !convexAuth.isAuthenticated()) {
		return nextjsMiddlewareRedirect(request, "/auth");
	}
	if (isAuthPage(request) && convexAuth.isAuthenticated()) {
		return nextjsMiddlewareRedirect(request, "/");
	}
});

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};