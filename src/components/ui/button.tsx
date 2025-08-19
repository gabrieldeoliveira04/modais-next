import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none cursor-pointer disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none",
				cancel:
					"bg-white border border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_white,0_0_0_4px_#DC2626]",
				next:
					"bg-[#0f5193] text-white hover:bg-[#4A7FB5] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_white,0_0_0_4px_#004080]",
				destructive:
					"bg-[#DC2626] text-destructive-foreground hover:bg-[#EF4444] text-white focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_white,0_0_0_4px_#DC2626]",
				outline:
					"border dark:text-[#5878BA] bg-background text-nc-base-600 border-[#E6E6E6] hover:text-nc-base-600 hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_white,0_0_0_4px_#004080] dark:bg-[#171717] dark:hover:bg-[#212121] dark:border-[#393E47]",
				outlineDestructive:
					"border bg-background text-nc-stt-red-600 border-[#FECACA] hover:bg-destructive/10 focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_white,0_0_0_4px_#DC2626] dark:bg-[#171717] dark:border-[#C8544D] dark:hover:bg-destructive/10 dark:text-[#C8544D]",
				primary:
					"bg-nc-base-600 hover:bg-nc-base-800 text-white focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_white,0_0_0_4px_#004080]",

				secondary: "bg-nc-stt-red-600 hover:bg-nc-stt-red-800 text-white",
				ghostPrimary: "hover:bg-[#F7F7F7] dark:hover:bg-[#212121] dark:text-[#5878BA] text-nc-base-600 hover:text-nc-base-400",
				ghost: "hover:bg-[#F7F7F7] dark:hover:bg-[#212121] dark:text-[#5878BA]",
				link: "text-primary underline-offset-4 hover:underline ",
			},
			size: {
				default: "h-9 [@media(min-width:1599px)]:h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
