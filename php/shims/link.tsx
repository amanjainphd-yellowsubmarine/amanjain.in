import type { AnchorHTMLAttributes, ReactNode } from "react";

export default function Link({
  href,
  children,
  className,
  target,
  rel,
  onClick,
  title,
  id,
}: {
  href?: string;
  children?: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
  title?: string;
  id?: string;
}) {
  return (
    <a href={href || "#"} className={className} target={target} rel={rel} onClick={onClick} title={title} id={id}>
      {children}
    </a>
  );
}
