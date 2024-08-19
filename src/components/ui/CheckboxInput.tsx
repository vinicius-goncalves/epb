import { tv } from 'tailwind-variants';

interface Props {
	text: string;
	description?: string;
	checked?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const label = tv({
	base: 'mt-2 flex items-center gap-1.5',
});

function CheckboxInput({ text, ...props }: Props): JSX.Element {
	return (
		<label className={label()}>
			<input
				type="checkbox"
				{...props}
			/>
			{text}
		</label>
	);
}

export default CheckboxInput;
