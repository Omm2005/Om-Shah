import type { MDXComponents } from "mdx/types";
import clsx from "clsx";
import React from "react";

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={clsx("text-foreground/80 leading-relaxed md:text-base text-sm", className)}
    {...props}
  />
));

Paragraph.displayName = "Paragraph";

const Anchor = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={clsx(
        "underline underline-offset-2 hover:text-foreground font-semibold",
        className
      )}
      {...props}
    />
  )
);

Anchor.displayName = "Anchor";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: Paragraph,
    a: Anchor,
    ...components,
  };
}
