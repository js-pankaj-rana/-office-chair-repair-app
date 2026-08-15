import Home from "@/components/Home";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Office Chair Services",
};

export default async function HomePage() {
  return <Home />;
}
