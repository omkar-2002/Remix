import mainStyles from "../app/styles/main.css";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useRouteError } from "@remix-run/react";
import MainNavigation from "./components/common/MinNavigation";
import { V2_MetaFunction } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <header>
        <MainNavigation />
      </header>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  //REMIX has changed the built in error prop to a hook
  const routeError = useRouteError();
  const message = routeError?.data?.message
    ? routeError.data.message
    : routeError.message
    ? routeError.message
    : "Oops! Something went wrong.";

  return (
    <html lang="en">
      <header>
        <MainNavigation />
      </header>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{message}</p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const meta = () => {
  return [
    { title: "Very cool app | Remix" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};


export function links() {
  return [{ rel: "stylesheet", href: mainStyles }];
}
