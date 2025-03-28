import { FC } from 'react';
import portfolioData from '../data/portfolio.json';

interface ContactInfo {
	email: string;
	phone: string;
}

interface AddressInfo {
	street: string;
	city: string;
	state: string;
	zip: string;
}

interface FooterProps {
	contactInfo?: ContactInfo;
	addressInfo?: AddressInfo;
	id: string;
}

const Footer: FC<FooterProps> = ({ id }) => {
	const contactInfo = portfolioData.contactInfo;
	const addressInfo = portfolioData.addressInfo;

	return (
		<footer className='bg-zinc-900 py-8 md:py-16' id={id}>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-white'>
					QUICK LINKS
				</h2>

				<div className='flex flex-col md:flex-row justify-center md:space-x-8 space-y-4 md:space-y-0 mb-8'>
					<a
						href='#home'
						className='text-white hover:text-gray-300 text-center'
					>
						HOME
					</a>
					<a
						href='#aboutme'
						className='text-white hover:text-gray-300 text-center'
					>
						ABOUT ME
					</a>
					<a
						href='#education'
						className='text-white hover:text-gray-300 text-center'
					>
						EDUCATION
					</a>
					<a
						href='#experience'
						className='text-white hover:text-gray-300 text-center'
					>
						EXPERIENCE
					</a>
					<a
						href='#projects'
						className='text-white hover:text-gray-300 text-center'
					>
						PROJECTS
					</a>
				</div>

				{/* Contact and Address sections */}
				<div className='flex flex-col md:flex-row justify-between mt-12 mb-12'>
					<div className='w-full md:w-1/2 mb-8 md:mb-0'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 text-white text-center md:text-left'>
							CONTACT
						</h2>
						<p className='text-white text-center md:text-left mb-2'>
							{contactInfo.email}
						</p>
						<p className='text-white text-center md:text-left'>
							{contactInfo.phone}
						</p>
					</div>
					<div className='w-full md:w-1/2 md:text-right'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 text-white text-center md:text-right'>
							ADDRESS
						</h2>
						<p className='text-white text-center md:text-right mb-2'>
							{addressInfo.street},
						</p>
						<p className='text-white text-center md:text-right'>
							{addressInfo.city}, {addressInfo.state},{' '}
							{addressInfo.zip}
						</p>
					</div>
				</div>

				{/* Social media links */}
				<div className='flex justify-center space-x-4 mb-8'>
					<a
						href={portfolioData.socialLinks?.linkedin || '#'}
						className='w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center'
						aria-label='LinkedIn'
					>
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z'
								stroke='white'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M6 9H2V21H6V9Z'
								stroke='white'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z'
								stroke='white'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</a>
					<a
						href={portfolioData.socialLinks?.github || '#'}
						className='w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center'
						aria-label='GitHub'
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
							<path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
						</svg>
					</a>
				</div>

				{/* Copyright text */}
				<p className='text-center text-gray-500 text-sm'>
					Copyright © {portfolioData.name} {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
