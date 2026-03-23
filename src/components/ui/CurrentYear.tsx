export function CurrentYear() {
  const year = new Date().getFullYear().toString();

  return <span suppressHydrationWarning>{year}</span>;
}
