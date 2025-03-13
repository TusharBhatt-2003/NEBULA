"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

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
      className={cn("p-4 bg-black rounded-xl shadow-md", className)}
      captionLayout="dropdown" // Enables dropdown for month & year selection
      fromYear={2000} // Starting year
      toYear={2030} // Ending year
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 ",
        caption: "flex justify-between items-center p-2 bg-black rounded-xl",
        caption_label: "text-sm font-semibold",
        nav: "flex space-x-2",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 p-1 rounded-xl transition",
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "w-10 text-xs font-medium text-center",
        row: "flex w-full",
        cell: cn(
          "relative w-10 h-10 text-center text-sm flex items-center justify-center cursor-pointer rounded-xl transition",
          "[&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:text-light",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-xl [&:has(>.day-range-start)]:rounded-l-xl"
            : "[&:has([aria-selected])]:rounded-xl",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal transition",
        ),
        day_selected: "light-bg text-black",
        day_today: "light-bg text-black font-semibold opacity-60",
        day_outside: "text-light opacity-40 cursor-default",
        day_disabled: "text-black opacity-50",
        day_hidden: "invisible",
        dropdown:
          "px-2 py-1 border rounded-xl text-black shadow-sm outline-none",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn("h-5 w-5 text-gray-600", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("h-5 w-5 text-gray-600", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
