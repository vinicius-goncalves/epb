import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
	base: 'mt-2.5 rounded-md p-2 text-blue-500 hover:opacity-70',
	variants: {
		color: {
			primary: 'border border-blue-500 bg-blue-500/10 text-blue-500',
			error: 'border border-red-500 bg-red-500/10 text-red-500',
		},
	},
	defaultVariants: {
		color: 'primary',
	},
});

type ButtonVariants = VariantProps<typeof button>;

interface Props extends ButtonVariants {
	title: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

function Button({
	title,
	onClick,
	className,
	...variants
}: Props): JSX.Element {
	return (
		<button
			className={button({ ...variants, className })}
			onClick={onClick}>
			{title}
		</button>
	);
}

export default Button;
