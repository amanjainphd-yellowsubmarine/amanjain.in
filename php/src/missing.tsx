import { Container } from "@/components/layout/Container";

export function Missing() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-muted">That page is not on this website.</p>
    </Container>
  );
}
