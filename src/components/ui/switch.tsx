"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

// Card suit icons
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ClubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-1.5 0-3 1.5-3 3 0 1 .5 2 1.5 2.5-1.5.5-2.5 2-2.5 3.5 0 2 1.5 4 4 4h1v3c0 1.1.9 2 2 2s2-.9 2-2v-3h1c2.5 0 4-2 4-4 0-1.5-1-3-2.5-3.5C18.5 7 19 6 19 5c0-1.5-1.5-3-3-3-1 0-2 .5-2.5 1.5C13 2.5 12 2 12 2z" />
  </svg>
);

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [isChecked, setIsChecked] = React.useState(
    props.checked || props.defaultChecked || false
  );

  React.useEffect(() => {
    if (props.checked !== undefined) {
      setIsChecked(props.checked);
    }
  }, [props.checked]);

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked);
    if (props.onCheckedChange) {
      props.onCheckedChange(checked);
    }
  };

  return (
    <SwitchPrimitive.Root
      {...props}
      onCheckedChange={handleCheckedChange}
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 shadow-lg transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // Card-themed styling
        "bg-gradient-to-r from-muted/80 to-muted/60 border-border",
        "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary/90 data-[state=checked]:to-primary/70",
        "data-[state=checked]:border-primary data-[state=unchecked]:border-muted-foreground/30",
        "hover:shadow-xl transition-shadow duration-300",
        // Table felt effect
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-black/5",
        className
      )}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full ring-0 transition-all duration-300",
          // Card-like thumb with white background and suit icons
          "bg-white shadow-lg border border-border/50",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:shadow-xl data-[state=unchecked]:shadow-md",
          // Ensure icons are centered
          "flex items-center justify-center relative",
          "hover:scale-105 active:scale-95"
        )}
      >
        {/* Heart icon for "on" state (checked) */}
        <HeartIcon
          className={cn(
            "absolute h-3 w-3 text-red-600 transition-opacity duration-300",
            isChecked ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Club icon for "off" state (unchecked) */}
        <ClubIcon
          className={cn(
            "absolute h-3 w-3 text-gray-800 transition-opacity duration-300",
            isChecked ? "opacity-0" : "opacity-100"
          )}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
