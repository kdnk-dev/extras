import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { KdnkFormContextType } from "@kdnk.dev/forms";
import { FieldValues, UseFormReturn } from "react-hook-form";

type KdDatePickerProps =
  | {
      placeholder: string;
      type: "standard";
      linkedDate?: never;
      linkMode?: never;
    }
  | {
      placeholder: string;
      type: "weekly";
      linkedDate: string;
      linkMode?: never;
    }
  | {
      placeholder: string;
      type: "linked";
      linkedDate: string;
      linkMode: "before" | "after";
    };

export const KdDatePickerField = (props: KdDatePickerProps) => {
  const { type, placeholder, linkedDate, linkMode } = props;

  return (
    field: any,
    kdnkContext: KdnkFormContextType,
    formContext: UseFormReturn<FieldValues, any, any>,
  ) => {
    const isDisabled = (date: Date) => {
      if (type === "weekly") return date.getDay() !== 5;
      else if (linkedDate) {
        const linkedValue = formContext.getValues(linkedDate);

        if (linkMode === "after") {
          return !!linkedValue && date < linkedValue;
        }
        if (linkMode === "before") {
          return !!linkedValue && date > linkedValue;
        }
      }
      return false; // Standard type default
    };

    const [month, setMonth] = useState(new Date());
    const [date, setDate] = useState(field.value || new Date());

    const handleDayPickerSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      if (selectedDate) {
        field.onChange(selectedDate);
        if (type === "weekly" && linkedDate) {
          const endDate = new Date(selectedDate);
          endDate.setDate(endDate.getDate() + 6);
          formContext.setValue(linkedDate, endDate);
        }
      }
    };

    useEffect(() => {
      if (field.value && field.value !== date) {
        setDate(field.value);
      }
    }, [field.value]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
            disabled={kdnkContext.formMode != "edit"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? (
              type === "weekly" && linkedDate ? (
                `${format(new Date(field.value), "PPP")} - ${format(
                  new Date(formContext.getValues(linkedDate)),
                  "PPP",
                )}`
              ) : (
                format(new Date(field.value), "PPP")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDayPickerSelect}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown-buttons"
            fromYear={new Date().getFullYear() - 19}
            toYear={new Date().getFullYear()}
            disabled={isDisabled}
          />
        </PopoverContent>
      </Popover>
    );
  };
};
