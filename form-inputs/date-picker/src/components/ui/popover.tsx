"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "ktw-z-50 ktw-w-72 ktw-rounded-md ktw-border ktw-bg-popover ktw-p-4 ktw-text-popover-foreground ktw-shadow-md ktw-outline-none data-[state=open]:ktw-animate-in data-[state=closed]:ktw-animate-out data-[state=closed]:ktw-fade-out-0 data-[state=open]:ktw-fade-in-0 data-[state=closed]:ktw-zoom-out-95 data-[state=open]:ktw-zoom-in-95 data-[side=bottom]:ktw-slide-in-from-top-2 data-[side=left]:ktw-slide-in-from-right-2 data-[side=right]:ktw-slide-in-from-left-2 data-[side=top]:ktw-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
