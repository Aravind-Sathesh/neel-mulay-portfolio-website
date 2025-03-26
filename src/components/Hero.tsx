'use client';

import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

interface HeroProps {
	id?: string;
}

const Hero: React.FC<HeroProps> = ({ id }) => {
	const { personalInfo, education, skills } = portfolioData;
	const mainEducation = education[0];

	const scrollToSection = (sectionId: string) => {
		setTimeout(() => {
			const element = document.getElementById(sectionId);
			if (element) {
				const header = document.querySelector('header');
				const headerHeight = header ? header.offsetHeight : 80;

				const elementPosition =
					element.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = elementPosition - headerHeight - 10;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});

				if (history.pushState) {
					history.pushState(null, '', `#${sectionId}`);
				} else {
					window.location.hash = sectionId;
				}
			}
		}, 50);
	};

	return (
		<section
			id={id}
			className='min-h-screen flex items-center justify-center bg-black text-white pt-40'
		>
			<div className='container mx-auto px-4 relative'>
				<div className='grid grid-cols-1 md:grid-cols-12 md:mt-0 mt-0 gap-8'>
					<motion.div
						className='md:col-span-4 relative h-[300px] md:h-[500px] hidden md:block'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							className='absolute top-10 left-0 bg-zinc-900 p-3 rounded-lg border border-zinc-800 cursor-pointer'
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							whileHover={{
								scale: 1.05,
								transition: {
									duration: 0.2,
									type: 'spring',
									stiffness: 300,
								},
							}}
						>
							<div className='flex justify-between items-center'>
								<div>
									<p className='text-xs text-green-400'>
										{mainEducation.degree.split(' in ')[0]}
									</p>
									<p className='text-xs text-green-400'>
										{mainEducation.degree.split(' in ')[1]},
									</p>
									<p className='text-sm font-bold'>
										{mainEducation.school}
									</p>
								</div>
								<div className='ml-2'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M7 17L17 7M17 7H7M17 7V17'
											stroke='white'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							</div>
						</motion.div>

						<motion.div
							className='absolute left-1/4 bottom-1/4 w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer'
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							onClick={() => scrollToSection('getintouch')}
							transition={{
								delay: 0.2,
								type: 'spring',
								stiffness: 200,
							}}
							whileHover={{
								scale: 1.1,
								transition: {
									duration: 0.3,
									type: 'spring',
									stiffness: 300,
								},
							}}
						>
							<svg
								width='80'
								height='80'
								viewBox='0 0 80 80'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z'
									fill='none'
								/>
								<text
									fill='white'
									fontFamily='Arial'
									fontSize='9.75'
									letterSpacing='2.5'
								>
									<textPath
										href='#circleText'
										startOffset='0%'
									>
										GET IN TOUCH • GET IN TOUCH •
									</textPath>
								</text>
								<path
									id='circleText'
									d='M40 2C20.1177 2 2 20.1177 2 40C2 59.8823 20.1177 78 40 78C59.8823 78 78 59.8823 78 40C78 20.1177 59.8823 0.5 40 2Z'
									fill='none'
								/>
								<svg
									x='28'
									y='28'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M7 17L17 7M17 7H7M17 7V17'
										stroke='white'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</svg>
						</motion.div>
					</motion.div>

					<motion.div
						className='md:col-span-4 md:mt-12 mt-0 flex flex-col items-center justify-center relative'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							className='text-center flex flex-col items-center justify-center relative'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							<motion.div
								className='absolute -mt-[20rem] md:mt-0 w-20 h-32 rounded-full overflow-hidden border-2 border-white z-10'
								style={{
									transform: 'translate(-50%, -50%)',
									borderRadius: '40px',
								}}
								whileHover={{
									scale: 1.03,
									transition: {
										duration: 0.2,
										type: 'spring',
										stiffness: 300,
									},
								}}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.5, type: 'spring' }}
							>
								<img
									src={personalInfo.image}
									alt={personalInfo.name}
									className='w-full h-full object-cover'
								/>
							</motion.div>

							<div className='relative'>
								<h1 className='text-7xl z-0 md:text-[200px] font-bold tracking-tighter leading-none'>
									{personalInfo.name.split(' ')[0]}
								</h1>
								<h1 className='text-7xl z-0 md:text-[200px] font-bold tracking-tighter leading-none md:-mt-4:'>
									{personalInfo.name.split(' ')[1]}
								</h1>
							</div>
						</motion.div>

						<motion.p
							className='text-center mt-6 md:mt-4 md:w-[150%] w-[80%]'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
						>
							{personalInfo.title}
						</motion.p>

						<motion.div
							className='md:hidden flex flex-col items-center mt-6'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
						>
							<div className='flex gap-4'>
								{[0, 1].map((i) => (
									<motion.a
										key={i}
										href='#'
										className='w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center'
										whileHover={{
											scale: 1.2,
											transition: {
												duration: 0.2,
												type: 'spring',
												stiffness: 300,
											},
										}}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='18'
											height='18'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											{i === 0 ? (
												<>
													<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
													<rect
														x='2'
														y='9'
														width='4'
														height='12'
													></rect>
													<circle
														cx='4'
														cy='4'
														r='2'
													></circle>
												</>
											) : (
												<path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
											)}
										</svg>
									</motion.a>
								))}
							</div>
						</motion.div>
					</motion.div>

					<motion.div
						className='md:col-span-4 hidden md:block'
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}
					>
						<motion.div
							className='w-full h-full flex items-center justify-center relative z-20'
							initial={{ x: 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							whileHover={{
								scale: 1.03,
								transition: {
									duration: 0.2,
									type: 'spring',
									stiffness: 300,
								},
							}}
						>
							<img
								src='/robotic-arm.png'
								alt='Robotic Arm'
								className='w-full z-5 h-auto object-contain'
							/>
						</motion.div>

						<motion.div
							className='flex flex-col items-end mt-2'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
						>
							<p className='text-sm'>Check these out?</p>
							<div className='flex gap-2 mt-1'>
								{[0, 1].map((i) => (
									<motion.a
										key={i}
										href='#'
										className='w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center'
										whileHover={{
											scale: 1.2,
											transition: {
												duration: 0.2,
												type: 'spring',
												stiffness: 300,
											},
										}}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											{i === 0 ? (
												<>
													<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
													<rect
														x='2'
														y='9'
														width='4'
														height='12'
													></rect>
													<circle
														cx='4'
														cy='4'
														r='2'
													></circle>
												</>
											) : (
												<path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
											)}
										</svg>
									</motion.a>
								))}
							</div>
						</motion.div>
					</motion.div>
				</div>

				<motion.div
					className='relative w-full bg-zinc-900 py-4 mt-32 overflow-hidden border-t border-b border-zinc-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9, duration: 0.8 }}
				>
					<div className='flex items-center justify-start whitespace-nowrap overflow-hidden'>
						<div className='flex space-x-8 px-4 animate-scroll'>
							{Object.values(skills)
								.flat()
								.map((skill, index) => (
									<span
										key={index}
										className='text-white text-xl font-bold tracking-wide border-r border-zinc-700 pr-8'
									>
										{skill}
									</span>
								))}
							{Object.values(skills)
								.flat()
								.map((skill, index) => (
									<span
										key={`duplicate-${index}`}
										className='text-white text-xl font-bold tracking-wide border-r border-zinc-700 pr-8'
									>
										{skill}
									</span>
								))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
