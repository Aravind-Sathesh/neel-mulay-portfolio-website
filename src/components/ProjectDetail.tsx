'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Play, X, Image as ImageIcon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import projectsData from '../data/projects.json';

interface Project {
	title: string;
	description: string;
	skills: string[];
	achievements: string[];
	components?: string[];
	location?: string;
	videos?: string[];
	images?: string[];
}

interface ProjectsData {
	projects: Project[];
}

/**
 * Convert a Google Drive view link to an embeddable format
 * @param url - The original Google Drive URL
 * @returns The embeddable URL for the video
 */
const getGoogleDriveEmbedUrl = (url: string): string => {
	if (!url.includes('drive.google.com/file/d')) {
		return url;
	}

	const fileIdMatch = url.match(/\/d\/([^\/]+)/);
	if (fileIdMatch && fileIdMatch[1]) {
		const fileId = fileIdMatch[1];
		return `https://drive.google.com/file/d/${fileId}/preview`;
	}

	return url;
};

/**
 * Get a thumbnail URL for a Google Drive video.
 */
const getGoogleDriveThumbnailUrl = (url: string): string | null => {
	if (!url.includes('drive.google.com/file/d')) {
		return null;
	}

	const fileIdMatch = url.match(/\/d\/([^\/]+)/);
	if (fileIdMatch && fileIdMatch[1]) {
		const fileId = fileIdMatch[1];
		return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1280-h720`;
	}

	return null;
};

/**
 *  Get YouTube Thumbnail URL
 */
const getYoutubeThumbnailUrl = (url: string): string | null => {
	if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
		return null;
	}

	const getYouTubeId = (url: string): string | null => {
		let videoId = null;
		if (url.includes('youtube.com')) {
			const urlParams = new URLSearchParams(new URL(url).search);
			videoId = urlParams.get('v');
		} else if (url.includes('youtu.be')) {
			videoId = url.split('/').pop()?.split('?')[0] || null;
		}
		return videoId;
	};

	const videoId = getYouTubeId(url);

	if (videoId) {
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}
	return null;
};

const getThumbnailUrl = (url: string): string | null => {
	return (
		getGoogleDriveThumbnailUrl(url) || getYoutubeThumbnailUrl(url) || null
	);
};

/**
 *  Get Google Drive image URL
 * @param url
 */
const getGoogleDriveImageUrl = (url: string): string | null => {
	if (!url.includes('drive.google.com/file/d')) {
		return null;
	}

	const fileIdMatch = url.match(/\/d\/([^\/]+)/);
	if (fileIdMatch && fileIdMatch[1]) {
		const fileId = fileIdMatch[1];
		return `https://lh3.googleusercontent.com/d/${fileId}`;
	}

	return null;
};

const ProjectDetail = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const [project, setProject] = useState<Project | null>(null);
	const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
	const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			const projectIndex = Number(id);
			if (isNaN(projectIndex)) {
				throw new Error('Invalid project ID');
			}

			const typedProjectsData = projectsData as ProjectsData;
			const projectData = typedProjectsData.projects[projectIndex];

			if (!projectData) {
				throw new Error('Project not found');
			}

			setProject(projectData);
			setIsLoading(false);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred'
			);
			setIsLoading(false);
		}

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [id]);

	const handleVideoClick = (videoUrl: string) => {
		setSelectedVideo(videoUrl);
		setIsVideoOpen(true);
	};

	const closeVideo = () => {
		setIsVideoOpen(false);
		setSelectedVideo(null);
	};

	const handleImageClick = (imageUrl: string | null) => {
		setSelectedImage(imageUrl);
		setIsImageOpen(true);
	};

	const closeImage = () => {
		setIsImageOpen(false);
		setSelectedImage(null);
	};

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/', { state: { scrollTo: 'projects' } });
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-black text-white flex items-center justify-center'>
				<div className='text-xl'>Loading project details...</div>
			</div>
		);
	}

	if (error || !project) {
		return (
			<div className='min-h-screen bg-black text-white flex flex-col items-center justify-center p-4'>
				<div className='text-2xl mb-4'>
					{error || 'Project not found'}
				</div>
				<button
					onClick={handleGoBack}
					className='inline-flex items-center text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors'
				>
					<ArrowLeft className='mr-2' size={16} /> Back to Projects
				</button>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-black text-white'>
			<div className='container mx-auto px-4 py-8 md:py-12'>
				<button
					onClick={handleGoBack}
					className='inline-flex items-center text-white hover:bg-zinc-700 my-4 px-4 py-2 rounded-md transition-colors'
				>
					<ArrowLeft className='mr-2' size={16} /> Back to Projects
				</button>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='mb-8 md:mb-12'
				>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-4xl md:text-6xl font-bold mb-4'
					>
						{project.title.toUpperCase()}
					</motion.h1>
					<div className='w-full h-0.5 bg-white'></div>
				</motion.div>

				{/* Video Gallery Section */}
				{project.videos && project.videos.length > 0 && (
					<div className='mb-12 md:mb-16'>
						{/* Video Selection Thumbnails Grid */}
						<h2 className='text-3xl md:text-4xl font-bold mb-6'>
							PROJECT VIDEOS
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
							{project.videos.map((videoUrl, index) => {
								const thumbnailUrl = getThumbnailUrl(videoUrl);
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className='relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200'
										onClick={() =>
											handleVideoClick(videoUrl)
										}
									>
										{thumbnailUrl ? (
											<img
												src={thumbnailUrl}
												alt={`Video ${
													index + 1
												} Thumbnail`}
												className='object-cover'
												sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
											/>
										) : (
											<div className='bg-zinc-800 flex items-center justify-center aspect-video'>
												<span className='text-gray-400'>
													No Thumbnail Available
												</span>
											</div>
										)}

										<div className='absolute inset-0 flex items-center justify-center'>
											<motion.div
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className='w-12 h-12 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
											>
												<Play
													size={20}
													fill='white'
													className='ml-1'
												/>
											</motion.div>
										</div>
										<div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent'>
											<p className='text-white text-sm font-medium'>
												Video {index + 1}
											</p>
										</div>
									</motion.div>
								);
							})}
						</div>

						{/* Modal Video Player */}
						{isVideoOpen && selectedVideo && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90'
								onClick={closeVideo}
							>
								<div
									className='relative w-full max-w-4xl max-h-full'
									onClick={(e) => e.stopPropagation()}
								>
									<div className='absolute top-4 right-4 z-10'>
										<button
											onClick={closeVideo}
											className='p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors text-white'
										>
											<X size={24} />
										</button>
									</div>
									<div className='w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-xl'>
										<iframe
											src={getGoogleDriveEmbedUrl(
												selectedVideo
											)}
											className='w-full h-full'
											frameBorder='0'
											allowFullScreen
											allow='autoplay'
											title={`${project.title} video`}
											loading='lazy'
										></iframe>
									</div>
								</div>
							</motion.div>
						)}
					</div>
				)}

				{/* Image Gallery Section */}
				{project.images && project.images.length > 0 && (
					<div className='mb-12 md:mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold mb-6'>
							PROJECT IMAGES
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
							{project.images.map((imageUrl, index) => {
								const driveImageUrl =
									getGoogleDriveImageUrl(imageUrl);
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className='relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200'
										onClick={() =>
											handleImageClick(driveImageUrl)
										}
									>
										{driveImageUrl ? (
											<img
												src={driveImageUrl}
												alt={`Image ${index + 1}`}
												className='object-cover w-full h-full'
											/>
										) : (
											<div className='bg-zinc-800 flex items-center justify-center aspect-video'>
												<span className='text-gray-400'>
													No Image Available
												</span>
											</div>
										)}
										<div className='absolute inset-0 flex items-center justify-center'>
											<motion.div
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className='w-12 h-12 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
											>
												<ImageIcon
													size={20}
													color='white'
												/>
											</motion.div>
										</div>
									</motion.div>
								);
							})}
						</div>

						{/* Modal Image Viewer */}
						{isImageOpen && selectedImage && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90'
								onClick={closeImage}
							>
								<div
									className='relative w-full max-w-4xl max-h-full'
									onClick={(e) => e.stopPropagation()}
								>
									<div className='absolute top-4 right-4 z-10'>
										<button
											onClick={closeImage}
											className='p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors text-white'
										>
											<X size={24} />
										</button>
									</div>
									<div className='w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-xl'>
										<img
											src={selectedImage}
											alt='Project Image'
											className='object-contain w-full h-full'
										/>
									</div>
								</div>
							</motion.div>
						)}
					</div>
				)}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className='mb-10 md:mb-16'
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
						PROJECT OVERVIEW
					</h2>
					<p className='text-gray-300 text-lg leading-relaxed'>
						{project.description}
					</p>

					{project.components && project.components.length > 0 && (
						<div className='mt-8'>
							<h3 className='text-xl md:text-2xl font-bold mb-3'>
								Key Components
							</h3>
							<ul className='list-disc list-inside text-gray-300 space-y-2'>
								{project.components.map((component, index) => (
									<li key={index} className='pl-2 text-lg'>
										{component}
									</li>
								))}
							</ul>
						</div>
					)}
				</motion.div>

				{project.achievements && project.achievements.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className='mb-10 md:mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
							KEY ACHIEVEMENTS
						</h2>
						<ul className='list-disc list-inside text-gray-300 space-y-4'>
							{project.achievements.map((achievement, index) => (
								<li
									key={index}
									className='pl-2 text-lg leading-relaxed'
								>
									{achievement}
								</li>
							))}
						</ul>
					</motion.div>
				)}

				{project.skills && project.skills.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className='mb-10 md:mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
							SKILLS DEVELOPED
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
							{project.skills.map((skill, index) => (
								<div
									key={index}
									className='bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors'
								>
									<p className='text-white text-center'>
										{skill}
									</p>
								</div>
							))}
						</div>
					</motion.div>
				)}

				{project.location && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className='mt-10 md:mt-16 mb-10 md:mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
							LOCATION
						</h2>
						<p className='text-gray-300 text-lg'>
							{project.location}
						</p>
					</motion.div>
				)}
			</div>
			<Footer id={'getintouch'} />
		</div>
	);
};

export default ProjectDetail;
