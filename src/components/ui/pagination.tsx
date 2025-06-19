import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Card suit icons as components
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SpadeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4.5 9.5C4.5 12.5 7 15 10 15h1v3c0 1.1.9 2 2 2s2-.9 2-2v-3h1c3 0 5.5-2.5 5.5-5.5L12 2z" />
  </svg>
);

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l6 10-6 10L6 12z" />
  </svg>
);

const ClubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-1.5 0-3 1.5-3 3 0 1 .5 2 1.5 2.5-1.5.5-2.5 2-2.5 3.5 0 2 1.5 4 4 4h1v3c0 1.1.9 2 2 2s2-.9 2-2v-3h1c2.5 0 4-2 4-4 0-1.5-1-3-2.5-3.5C18.5 7 19 6 19 5c0-1.5-1.5-3-3-3-1 0-2 .5-2.5 1.5C13 2.5 12 2 12 2z" />
  </svg>
);

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(
        "mx-auto flex w-full justify-center",
        "bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm",
        "border border-border/50 rounded-xl p-2 shadow-lg",
        "table-felt relative",
        className
      )}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center gap-1",
        "bg-card/80 rounded-lg p-1 shadow-inner",
        className
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        // Card-themed styling
        "relative overflow-hidden transition-all duration-300",
        "hover:scale-105 active:scale-95",
        "border-2 rounded-lg shadow-md",
        isActive
          ? [
              "bg-gradient-to-br from-card to-card/90",
              "border-primary text-primary font-bold",
              "shadow-lg shadow-primary/25",
              "before:absolute before:inset-0",
              "before:bg-gradient-to-br before:from-primary/10 before:to-transparent",
            ]
          : [
              "bg-gradient-to-br from-muted/80 to-muted/60",
              "border-border hover:border-primary/50",
              "hover:bg-gradient-to-br hover:from-card/90 hover:to-card/70",
              "hover:shadow-lg hover:shadow-primary/10",
            ],
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "gap-2 px-3 py-2",
        "group relative overflow-hidden",
        "bg-gradient-to-r from-secondary/80 to-secondary/60",
        "hover:from-secondary hover:to-secondary/80",
        "text-secondary-foreground",
        className
      )}
      {...props}
    >
      <SpadeIcon className="w-4 h-4 text-card-black transition-transform group-hover:scale-110 rotate-90" />
      <span className="sm:flex items-center gap-1 hidden font-medium">
        <span>Previous</span>
        <span className="opacity-60 text-xs">Hand</span>
      </span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "gap-2 px-3 py-2",
        "group relative overflow-hidden",
        "bg-gradient-to-r from-primary/80 to-primary/60",
        "hover:from-primary hover:to-primary/80",
        "text-primary-foreground",
        className
      )}
      {...props}
    >
      <span className="sm:flex items-center gap-1 hidden font-medium">
        <span className="opacity-60 text-xs">Next</span>
        <span>Hand</span>
      </span>
      <SpadeIcon className="w-4 h-4 text-card-black transition-transform group-hover:scale-110 -rotate-90" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center",
        "relative group cursor-default",
        "rounded-lg border border-border/50",
        "bg-gradient-to-br from-muted/40 to-muted/20",
        className
      )}
      {...props}
    >
      <div className="flex gap-0.5">
        <HeartIcon className="opacity-60 group-hover:opacity-100 w-2 h-2 text-card-red transition-opacity" />
        <HeartIcon className="opacity-60 group-hover:opacity-100 w-2 h-2 text-card-red transition-opacity" />
        <HeartIcon className="opacity-60 group-hover:opacity-100 w-2 h-2 text-card-red transition-opacity" />
      </div>
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
