import { lazy } from "react";

const Main = lazy(() => import("../pages/Main"));
const Email = lazy(() => import("../Components/Email"));
const ViewEmails = lazy(()=> import("../Components/ViewEmails"));
const routes = {
  main: {
    path: "/",
    element: Main,
  },
  emails: {
    path: "/emails",
    element: Email,
  },
  invalid: {
    path: "/*",
    element: Email,
  },
  view: {
    path: "/view",
    element: ViewEmails,
  },
};

export { routes };
