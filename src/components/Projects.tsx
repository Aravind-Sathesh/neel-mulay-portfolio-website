'use client';

import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import { Link } from 'react-router-dom';

interface Project {
	title: string;
	description: string;
	image?: string;
	tags: string[];
}

const Projects = () => {
	const { projects } = portfolioData;

	return (
		<section id='projects' className='py-20 bg-black'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='mb-8'
				>
					<div className='flex flex-col'>
						<h2 className='text-2xl font-bold'>FEATURED</h2>
						<h2 className='text-6xl font-bold'>PROJECTS</h2>
					</div>
					<div className='w-full h-0.5 bg-zinc-800 mt-4'></div>
				</motion.div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16'>
					{projects.map((project: Project, index: number) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800'
						>
							<Link to={`/project/${index}`}>
								<motion.div
									whileHover={{ scale: 1.03 }}
									className='relative aspect-video'
								>
									<img
										src={
											project.image || '/placeholder.svg'
										}
										alt={project.title}
										className='w-full h-full object-cover'
									/>
								</motion.div>
								<div className='p-4'>
									<h3 className='text-lg font-bold mb-2'>
										{project.title}
									</h3>
									<p className='text-gray-400 mb-4 text-sm line-clamp-2'>
										{project.description}
									</p>
									<div className='flex flex-wrap gap-2'>
										{project.tags
											.slice(0, 3)
											.map((tag, tagIndex) => (
												<span
													key={tagIndex}
													className='bg-zinc-800 text-white text-xs py-1 px-2 rounded'
												>
													{tag}
												</span>
											))}
									</div>
									<div className='mt-4 bg-purple-600 h-1 w-full rounded'></div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
