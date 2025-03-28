'use client';

import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

interface ExperienceProps {
	id?: string;
}

const Experience: React.FC<ExperienceProps> = ({ id }) => {
	const { experience } = portfolioData;

	return (
		<section id={id} className='py-20 bg-black'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='mb-8'
				>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>
						EXPERIENCE
					</h1>
					<div className='w-full h-0.5 bg-zinc-800 mt-4'></div>
				</motion.div>

				<div className='flex justify-center'>
					<div className='relative max-w-5xl w-full flex flex-col md:flex-row'>
						{/* Photo section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='md:w-1/2 mb-8 md:mb-0 flex justify-center'
						>
							<div className='relative w-full max-w-md aspect-square'>
								<img
									src='university.png'
									alt='University building'
									className='object-cover w-[500px] h-[500px] rounded-lg'
								/>
							</div>
						</motion.div>

						{/* Timeline section */}
						<div className='relative md:w-1/2'>
							<div className='hidden md:block absolute left-0 top-0 bottom-48 w-0.5 bg-zinc-700 transform translate-x-[7px]'></div>
							<div className='md:hidden absolute left-4 top-0 bottom-56 w-0.5 bg-zinc-700'></div>

							{experience.map((exp, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
									className='relative mb-16'
									onClick={() =>
										exp.website &&
										window.open(
											exp.website,
											'_blank',
											'noopener,noreferrer'
										)
									}
								>
									<div className='absolute md:left-0 left-[9px] top-0 w-4 h-4 bg-white rounded-full z-10'></div>

									<motion.div
										className={`md:w-full w-full pl-12 ${
											exp.website ? 'cursor-pointer' : ''
										}`}
									>
										<div
											className={`
											bg-zinc-900/70 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 
											transition-all duration-300 
											${
												exp.website
													? 'hover:bg-zinc-900/80 hover:border-zinc-700/80 hover:shadow-xl'
													: 'cursor-default'
											}
										`}
										>
											<div className='flex justify-between items-start'>
												<div>
													<div className='text-xs text-yellow-200/80 mb-2'>
														{exp.period}
													</div>
													<h3 className='text-xl font-bold text-white'>
														{exp.title}
													</h3>
													<p className='text-gray-300'>
														{exp.company}
													</p>
													<p className='text-gray-400 text-sm'>
														{exp.location}
													</p>
												</div>
											</div>

											{exp.website && (
												<div className='text-xs text-blue-400/70 mt-2 text-right'>
													{exp.website}
												</div>
											)}
										</div>
									</motion.div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
