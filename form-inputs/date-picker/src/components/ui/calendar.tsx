"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("ktw-p-3", className)}
      classNames={{
        months:
          "ktw-flex ktw-flex-col sm:ktw-flex-row ktw-space-y-4 sm:ktw-space-x-4 sm:ktw-space-y-0",
        month: "ktw-space-y-4",
        caption:
          "ktw-flex ktw-justify-center ktw-pt-1 ktw-relative ktw-items-center",
        caption_label: "ktw-text-sm ktw-font-medium",
        nav: "ktw-space-x-1 ktw-flex ktw-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "ktw-h-7 ktw-w-7 ktw-bg-transparent ktw-p-0 ktw-opacity-50 hover:ktw-opacity-100",
        ),
        nav_button_previous: "ktw-absolute ktw-left-1",
        nav_button_next: "ktw-absolute ktw-right-1",
        table: "ktw-w-full ktw-border-collapse ktw-space-y-1",
        head_row: "ktw-flex",
        head_cell:
          "ktw-text-muted-foreground ktw-rounded-md ktw-w-9 ktw-font-normal ktw-text-[0.8rem]",
        row: "ktw-flex ktw-w-full ktw-mt-2",
        cell: "ktw-h-9 ktw-w-9 ktw-text-center ktw-text-sm ktw-p-0 ktw-relative [&:has([aria-selected].day-range-end)]:ktw-rounded-r-md [&:has([aria-selected].day-outside)]:ktw-bg-accent/50 [&:has([aria-selected])]:ktw-bg-accent first:[&:has([aria-selected])]:ktw-rounded-l-md last:[&:has([aria-selected])]:ktw-rounded-r-md focus-within:ktw-relative focus-within:ktw-z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "ktw-h-9 ktw-w-9 ktw-p-0 ktw-font-normal aria-selected:ktw-opacity-100",
        ),
        day_range_end: "ktw-day-range-end",
        day_selected:
          "ktw-bg-primary ktw-text-primary-foreground hover:ktw-bg-primary hover:ktw-text-primary-foreground focus:ktw-bg-primary focus:ktw-text-primary-foreground",
        day_today: "ktw-bg-accent ktw-text-accent-foreground",
        day_outside:
          "ktw-day-outside ktw-text-muted-foreground aria-selected:ktw-bg-accent/50 aria-selected:ktw-text-muted-foreground",
        day_disabled: "ktw-text-muted-foreground ktw-opacity-50",
        day_range_middle:
          "aria-selected:ktw-bg-accent aria-selected:ktw-text-accent-foreground",
        day_hidden: "ktw-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({}) => <ChevronLeft className="ktw-h-4 ktw-w-4" />,
        IconRight: ({}) => <ChevronRight className="ktw-h-4 ktw-w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
