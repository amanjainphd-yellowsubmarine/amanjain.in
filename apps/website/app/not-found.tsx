import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <Link href="/" className="mt-6 inline-block text-accent">
        Back to home
      </Link>
    </Container>
  );
}
