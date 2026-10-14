export default function Image({
  src,
  alt,
  className,
  width,
  height,
  priority,
}: {
  src: string | { src: string };
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const url = typeof src === "string" ? src : src.src;
  return (
    <img
      src={url}
      alt={alt ?? ""}
      className={className}
      width={width}
      height={height}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
