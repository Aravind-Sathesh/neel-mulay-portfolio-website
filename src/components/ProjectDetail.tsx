'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Play, X } from 'lucide-react'; // Keep Play for thumbnails, X for image modal
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import projectsData from '../data/projects.json';

// --- Updated Interface ---
interface VideoData {
	caption: string;
	link: string; // YouTube URL
}

interface Project {
	title: string;
	description: string;
	skills: string[];
	achievements: string[];
	components?: string[];
	location?: string;
	videos?: VideoData[]; // Updated type
	images?: string[];
}

interface ProjectsData {
	projects: Project[];
}

// --- YouTube Helper Functions ---

/**
 * Extracts YouTube Video ID from various URL formats
 */
const getYouTubeId = (url: string): string | null => {
	if (!url) return null;
	let videoId = null;
	try {
		const urlObj = new URL(url);
		if (urlObj.hostname === 'youtu.be') {
			videoId = urlObj.pathname.slice(1);
		} else if (
			urlObj.hostname === 'www.youtube.com' ||
			urlObj.hostname === 'youtube.com'
		) {
			if (urlObj.pathname === '/watch') {
				videoId = urlObj.searchParams.get('v');
			} else if (urlObj.pathname.startsWith('/embed/')) {
				videoId = urlObj.pathname.split('/embed/')[1];
			} else if (urlObj.pathname.startsWith('/v/')) {
				videoId = urlObj.pathname.split('/v/')[1];
			}
		}
		// Extract video ID if followed by query params
		if (videoId && videoId.includes('?')) {
			videoId = videoId.split('?')[0];
		}
	} catch (e) {
		console.error('Error parsing YouTube URL:', e);
		// Fallback for potentially incomplete URLs or other formats
		const regex =
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
		const match = url.match(regex);
		if (match) {
			videoId = match[1];
		}
	}

	return videoId;
};

/**
 *  Get YouTube Embed URL with recommended parameters
 */
const getYoutubeEmbedUrl = (url: string): string | null => {
	const videoId = getYouTubeId(url);
	if (videoId) {
		// Parameters:
		// - autoplay=0: Don't autoplay initially
		// - rel=0: Don't show related videos from other channels at the end
		// - modestbranding=1: Reduce YouTube logo
		// - playsinline=1: Play inline on iOS instead of fullscreen
		// - iv_load_policy=3: Don't show video annotations
		return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;
	}
	return null; // Return null if ID can't be extracted
};

/**
 *  Get YouTube Thumbnail URL (prefer max resolution)
 */
const getYoutubeThumbnailUrl = (url: string): string | null => {
	const videoId = getYouTubeId(url);
	if (videoId) {
		// Using maxresdefault, fallback could be hqdefault or default
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
		// Fallback: return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	}
	return null;
};

// --- Google Drive Image Function (Keep if still needed for images) ---
const getGoogleDriveImageUrl = (url: string): string | null => {
	if (!url?.includes('drive.google.com/file/d')) {
		// Add null check for url
		return null;
	}
	const fileIdMatch = url.match(/\/d\/([^\/]+)/);
	if (fileIdMatch && fileIdMatch[1]) {
		const fileId = fileIdMatch[1];
		return `https://lh3.googleusercontent.com/d/${fileId}`;
	}
	return null;
};

// --- Project Detail Component ---

const ProjectDetail = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [project, setProject] = useState<Project | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// State for selected video *index*
	const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);

	// State for image modal (keeping this separate)
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isImageOpen, setIsImageOpen] = useState<boolean>(false);

	useEffect(() => {
		try {
			const projectIndex = Number(id);
			if (isNaN(projectIndex) || projectIndex < 0) {
				// Added check for negative index
				throw new Error('Invalid project ID');
			}

			// Type assertion for the imported JSON
			const typedProjectsData = projectsData as ProjectsData;

			if (projectIndex >= typedProjectsData.projects.length) {
				throw new Error('Project index out of bounds');
			}
			const projectData = typedProjectsData.projects[projectIndex];

			if (!projectData) {
				throw new Error('Project not found');
			}

			setProject(projectData);
			// Reset video index when project changes
			setSelectedVideoIndex(0);
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

	// --- Image Modal Handlers ---
	const handleImageClick = (imageUrl: string | null) => {
		if (!imageUrl) return; // Don't open if URL is null
		setSelectedImage(imageUrl);
		setIsImageOpen(true);
	};

	const closeImage = () => {
		setIsImageOpen(false);
		setSelectedImage(null);
	};

	// --- Navigation Handler ---
	const handleGoBack = () => {
		navigate('/', { state: { scrollTo: 'projects' } });
	};

	// --- Loading and Error States ---
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
				<div className='text-2xl mb-4 text-red-500'>
					{' '}
					{/* Emphasize error */}
					Error: {error || 'Project could not be loaded'}
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

	// --- Determine selected video data ---
	const currentVideoData = project.videos?.[selectedVideoIndex];
	const currentVideoEmbedUrl = currentVideoData
		? getYoutubeEmbedUrl(currentVideoData.link)
		: null;

	// --- Render Component ---
	return (
		<div className='min-h-screen bg-black text-white'>
			<div className='container mx-auto px-4 py-8 md:py-12'>
				{/* Back Button */}
				<button
					onClick={handleGoBack}
					className='inline-flex items-center text-white hover:text-gray-300 mb-6 px-3 py-1 rounded-md transition-colors group' // Adjusted styling
				>
					<ArrowLeft
						className='mr-2 group-hover:-translate-x-1 transition-transform'
						size={16}
					/>{' '}
					Back to Projects
				</button>

				{/* Project Title */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='mb-8 md:mb-12'
				>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-4xl md:text-6xl font-bold mb-4 break-words' // Added break-words
					>
						{project.title.toUpperCase()}
					</motion.h1>
					<div className='w-full h-0.5 bg-white'></div>
				</motion.div>

				{/* --- NEW Video Gallery Section --- */}
				{project.videos && project.videos.length > 0 && (
					<div className='mb-12 md:mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
							VIDEOS
						</h2>

						{/* Caption Area */}
						{currentVideoData?.caption && (
							<motion.p
								key={selectedVideoIndex} // Re-animate caption on change
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='text-lg text-gray-300 mb-4 italic'
							>
								{currentVideoData.caption}
							</motion.p>
						)}

						{/* Main Video Player Area */}
						<motion.div
							layout // Animate layout changes smoothly
							className='relative w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-xl mb-6 md:mb-8 border border-zinc-700'
						>
							{currentVideoEmbedUrl ? (
								<iframe
									key={currentVideoEmbedUrl} // Force iframe reload if URL changes (though ID should be stable)
									src={currentVideoEmbedUrl}
									className='absolute top-0 left-0 w-full h-full'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									allowFullScreen
									title={`${project.title} - ${
										currentVideoData?.caption ||
										`Video ${selectedVideoIndex + 1}`
									}`}
									loading='lazy'
								></iframe>
							) : (
								<div className='w-full h-full flex items-center justify-center text-gray-500'>
									Video could not be loaded.
								</div>
							)}
						</motion.div>

						{/* Horizontal Thumbnail List */}
						{project.videos.length > 1 && ( // Only show list if more than one video
							<div className='relative'>
								{/* Add gradient overlays for scroll indication if desired */}
								{/* <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div> */}
								{/* <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div> */}

								{/* Added px-1 for padding inside scroll container */}
								<div className='flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 px-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900'>
									{project.videos.map((video, index) => {
										const thumbnailUrl =
											getYoutubeThumbnailUrl(video.link);
										const isSelected =
											index === selectedVideoIndex;

										return (
											<motion.button
												key={index}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													delay: index * 0.05,
												}}
												onClick={() =>
													setSelectedVideoIndex(index)
												}
												aria-current={
													isSelected
														? 'true'
														: 'false'
												}
												aria-label={`Play video: ${
													video.caption ||
													`Video ${index + 1}`
												}`}
												className={`relative flex-shrink-0 w-40 sm:w-48 md:w-56 aspect-video rounded-md overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white transition-all duration-200 ${
													isSelected
														? 'ring-2 ring-white ring-offset-2 ring-offset-black shadow-lg' // Highlight selected
														: 'opacity-70 hover:opacity-100' // Dim unselected
												}`}
											>
												{thumbnailUrl ? (
													<img
														src={thumbnailUrl}
														alt={
															video.caption ||
															`Video ${
																index + 1
															} Thumbnail`
														}
														className='w-full h-full object-cover'
														// Add loading lazy if many thumbnails expected
														// loading="lazy"
													/>
												) : (
													<div className='w-full h-full bg-zinc-800 flex items-center justify-center text-xs text-gray-400 px-2 text-center'>
														Thumbnail Unavailable
													</div>
												)}
												{/* Optional: Small Play Icon */}
												<div className='absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity flex items-center justify-center'>
													{!isSelected && ( // Show only if not selected
														<Play
															size={24}
															fill='white'
															className='text-white opacity-70 drop-shadow-lg'
														/>
													)}
												</div>
												{/* Optional: video number/caption overlay */}
												{/* <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent">
                                                    <p className="text-white text-xs font-medium truncate">{video.caption || `Video ${index+1}`}</p>
                                                </div> */}
											</motion.button>
										);
									})}
								</div>
							</div>
						)}
					</div>
				)}
				{/* --- End Video Gallery Section --- */}

				{/* --- Image Gallery Section (Modal remains) --- */}
				{project.images && project.images.length > 0 && (
					<div className='mb-12 md:mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold mb-6'>
							IMAGES
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
							{project.images.map((imageUrl, index) => {
								const displayImageUrl =
									getGoogleDriveImageUrl(imageUrl) ||
									imageUrl; // Use original if GDrive fails

								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className='relative aspect-video rounded-lg overflow-hidden cursor-pointer group bg-zinc-800' // Added bg for fallback
										onClick={() =>
											handleImageClick(displayImageUrl)
										}
									>
										<img
											src={displayImageUrl}
											// Use GDrive URL specifically for GDrive images, otherwise use original
											alt={`Image ${index + 1}`}
											className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
											sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
											loading='lazy'
											onError={(e) => {
												// Basic error handling for images
												e.currentTarget.style.display =
													'none'; // Hide broken image
												const parent =
													e.currentTarget
														.parentElement;
												if (parent) {
													// Show a fallback message if needed (might need extra div)
													parent.classList.add(
														'flex',
														'items-center',
														'justify-center'
													);
													parent.innerHTML +=
														'<span class="text-gray-400 text-sm">Image Error</span>';
												}
											}}
										/>
										<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity'></div>
										<div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent'>
											<p className='text-white text-sm font-medium'>
												Image {index + 1}
											</p>
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
								exit={{ opacity: 0 }} // Add exit animation
								className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90'
								onClick={closeImage} // Close on backdrop click
							>
								{/* Close Button */}
								<motion.button
									initial={{ scale: 0.5, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.5, opacity: 0 }}
									onClick={closeImage}
									className='absolute top-4 right-4 z-20 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors text-white'
									aria-label='Close image viewer'
								>
									<X size={24} />
								</motion.button>
								{/* Image Container */}
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.8, opacity: 0 }}
									className='relative w-full max-w-4xl max-h-[90vh]' // Use max-h for tall images
									onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
								>
									<img
										src={selectedImage}
										alt='Project Image enlarged'
										className='object-contain w-full h-full rounded-lg shadow-xl block' // Ensure block display
									/>
								</motion.div>
							</motion.div>
						)}
					</div>
				)}

				{/* --- Other Project Sections (Overview, Achievements, Skills, Location) --- */}
				{/* No changes needed here, keeping existing motion divs */}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }} // Adjust delay based on sections above
					className='mb-10 md:mb-16'
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
						OVERVIEW
					</h2>
					<p className='text-gray-300 text-lg leading-relaxed'>
						{project.description}
					</p>

					{project.components && project.components.length > 0 && (
						<div className='mt-8'>
							<h3 className='text-xl md:text-2xl font-semibold mb-3'>
								{' '}
								{/* Adjusted font weight */}
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
						transition={{ delay: 0.4 }} // Adjust delay
						className='mb-10 md:mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
							KEY ACHIEVEMENTS
						</h2>
						<ul className='list-disc list-inside text-gray-300 space-y-3'>
							{' '}
							{/* Adjusted spacing */}
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
						transition={{ delay: 0.5 }} // Adjust delay
						className='mb-10 md:mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
							SKILLS DEVELOPED
						</h2>
						<div className='flex flex-wrap gap-3 md:gap-4'>
							{' '}
							{/* Use flex-wrap for better flow */}
							{project.skills.map((skill, index) => (
								<div
									key={index}
									className='bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700 hover:bg-zinc-700 transition-colors' // Changed to pills
								>
									<p className='text-white text-sm md:text-base'>
										{' '}
										{/* Adjusted text size */}
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
						transition={{ delay: 0.6 }} // Adjust delay
						className='mb-10 md:mb-16' // Removed redundant mt
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
