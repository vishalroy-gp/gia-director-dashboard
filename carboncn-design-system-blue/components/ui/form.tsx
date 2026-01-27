import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

// Form Group - Container for form fields with consistent spacing
const FormGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    legendText?: string
  }
>(({ className, legendText, children, ...props }, ref) => (
  <div
    ref={ref}
    role={legendText ? "group" : undefined}
    aria-labelledby={legendText ? `${legendText}-legend` : undefined}
    className={cn("space-y-carbon-05", className)}
    {...props}
  >
    {legendText && (
      <legend
        id={`${legendText}-legend`}
        className="text-sm font-semibold text-foreground mb-carbon-03"
      >
        {legendText}
      </legend>
    )}
    {children}
  </div>
))
FormGroup.displayName = "FormGroup"

// Form Item - Individual form field wrapper
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, invalid, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-carbon-02", className)}
      data-invalid={invalid || undefined}
      {...props}
    />
  )
)
FormItem.displayName = "FormItem"

// Form Label - Label for form fields
export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn(
        "text-xs text-muted-foreground",
        "[.data-invalid_&]:text-carbon-red-60",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-carbon-red-60 ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </Label>
  )
)
FormLabel.displayName = "FormLabel"

// Form Helper Text
const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
FormHelperText.displayName = "FormHelperText"

// Form Error Message
const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    role="alert"
    className={cn("text-xs text-carbon-red-60", className)}
    {...props}
  />
))
FormErrorMessage.displayName = "FormErrorMessage"

// Form Warning Message
const FormWarningMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-carbon-yellow-30 dark:text-carbon-yellow-40", className)}
    {...props}
  />
))
FormWarningMessage.displayName = "FormWarningMessage"

// Form Row - Horizontal layout for form fields
const FormRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap gap-carbon-05 [&>*]:flex-1 [&>*]:min-w-[200px]", className)}
    {...props}
  />
))
FormRow.displayName = "FormRow"

// Fieldset - Group of related form fields
const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn("border-0 p-0 m-0 min-w-0", className)}
    {...props}
  />
))
Fieldset.displayName = "Fieldset"

// Legend for fieldset
const Legend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend
    ref={ref}
    className={cn(
      "text-sm font-semibold text-foreground mb-carbon-04",
      className
    )}
    {...props}
  />
))
Legend.displayName = "Legend"

export {
  FormGroup,
  FormItem,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormWarningMessage,
  FormRow,
  Fieldset,
  Legend,
}

