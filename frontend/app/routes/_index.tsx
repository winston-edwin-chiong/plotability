import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Outlet,  
} from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="text-center">
      This is plot-a-probability!
      <Link to="/plot">Plot!</Link>
    </div>
  );
}
