import { type ChangeEvent, type RefObject } from 'react';

import { useCallback, useEffect, useRef } from 'react';
import { tv } from 'tailwind-variants';
import ToolSection from '../../tool-section/ToolSection';

function useForumSelect(selectRef: RefObject<HTMLSelectElement>) {
	const storage = chrome.storage.sync;

	const setDefaultForum = async (ev: ChangeEvent<HTMLSelectElement>) => {
		const forumOptions = ev.target.options;
		const selectedForum = forumOptions[ev.target.selectedIndex];

		const [forumIndex, forumName] = [selectedForum.value, selectedForum.text];

		try {
			await storage.set({ default_forum: forumIndex });
			console.log(`[EPB] Default forum updated to ${forumName}.`);
		} catch (err) {
			console.log(err);
		}
	};

	const getDefaultForum = useCallback(async () => {
		const result = await storage.get('default_forum');

		if (!result.default_forum) return '0';

		return result.default_forum;
	}, [storage]);

	useEffect(() => {
		if (!selectRef.current) return;

		getDefaultForum().then((defaultForumIndex) => {
			const forumOptions = [...selectRef.current!.options];

			const defaultForum = forumOptions.find(({ value }) => value == defaultForumIndex);

			if (defaultForum) {
				defaultForum.selected = true;
			}
		});
	}, [selectRef, getDefaultForum]);

	return { updateForum: setDefaultForum };
}

const componentDetails = {
	title: 'Forum padrão',
	description: 'Selecione um fórum para se tornar padrão ao escalar uma pergunta',
};

const select = tv({
	base: 'my-3 border border-gray-300 px-1.5 py-2 text-sm hover:outline-none focus:outline-none',
});

function DefaultForumSelect(): JSX.Element {
	const selectRef = useRef<HTMLSelectElement | null>(null);
	const { updateForum } = useForumSelect(selectRef);

	return (
		<ToolSection
			title={componentDetails.title}
			description={componentDetails.description}
			showCheckbox={false}>
			<>
				<select className={select()} onChange={updateForum} ref={selectRef}>
					<>
						<option value="1">Fórum Ouro+ Privado</option>
						<option value="0">Fórum Prata+ Privado</option>
						<option className="hidden" selected />
					</>
				</select>
			</>
		</ToolSection>
	);
}

export default DefaultForumSelect;
