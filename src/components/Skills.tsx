'use client';

import portfolioData from '../data/portfolio.json';

interface SkillsData {
	skills: {
		[category: string]: string[] | { [subCategory: string]: string[] };
	};
}

const Skills = () => {
	const { skills } = portfolioData as SkillsData;

	// Get categories from the JSON data
	const categories = Object.keys(skills);

	const hasSubCategories = (
		value: unknown
	): value is { [key: string]: string[] } => {
		return (
			typeof value === 'object' && value !== null && !Array.isArray(value)
		);
	};

	// Function to determine the width class based on content amount
	const getWidthClass = (category: string) => {
		// Count total number of items (including subcategories)
		let itemCount = 0;

		if (hasSubCategories(skills[category])) {
			const subCategories = skills[category] as {
				[key: string]: string[];
			};
			Object.keys(subCategories).forEach((subCat) => {
				itemCount += subCategories[subCat].length;
			});
		} else if (Array.isArray(skills[category])) {
			itemCount = (skills[category] as string[]).length;
		}

		// Return width class based on content amount
		if (itemCount > 8) return 'w-full md:w-1/3 lg:w-1/4 xl:w-1/4';
		if (itemCount > 5) return 'w-full md:w-1/3 lg:w-1/5 xl:w-1/5';
		return 'w-full md:w-1/4 lg:w-1/6 xl:w-1/6';
	};

	return (
		<section id='skills' className='py-10 bg-black text-white'>
			<div className='container mx-auto px-4'>
				<div className='mb-4'>
					<h2 className='text-6xl font-bold text-white'>SKILLS</h2>
					<div className='w-full h-0.5 bg-zinc-800 mt-2'></div>
				</div>

				<div className='flex flex-wrap gap-4 mt-10'>
					{/* Map through categories from the JSON */}
					{categories.map((category, index) => (
						<div
							key={index}
							className={`${getWidthClass(
								category
							)} bg-zinc-900 p-4 rounded flex-grow min-w-[250px] flex-basis-[calc(33.333%-1rem)] md:flex-basis-[calc(50%-1rem)]`}
						>
							<h3 className='font-medium mb-2 text-white'>
								{category}
							</h3>

							{hasSubCategories(skills[category]) ? (
								Object.keys(
									skills[category] as {
										[key: string]: string[];
									}
								).map((subCategory, subIndex) => (
									<div key={subIndex} className='mt-2'>
										<h4 className='font-medium text-sm'>
											{subCategory}
										</h4>
										<ul className='list-disc pl-5 space-y-1'>
											{(
												(
													skills[category] as {
														[key: string]: string[];
													}
												)[subCategory] || []
											).map((skill, skillIndex) => (
												<li key={skillIndex}>
													{skill}
												</li>
											))}
										</ul>
									</div>
								))
							) : (
								<ul className='list-disc pl-5 space-y-1'>
									{Array.isArray(skills[category]) &&
										(skills[category] as string[]).map(
											(skill, skillIndex) => (
												<li key={skillIndex}>
													{skill}
												</li>
											)
										)}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Skills;
