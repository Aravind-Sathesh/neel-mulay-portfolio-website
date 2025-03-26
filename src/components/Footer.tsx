import { FC } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavLinkClick = (sectionId: string) => {
        // Programmatically navigate and scroll
        navigate('/', { state: { scrollTo: sectionId } });
    };

    return (
        <footer className='bg-zinc-900 py-8 md:py-16' id={id}>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-white'>
                    QUICK LINKS
                </h2>

                <div className='flex flex-col md:flex-row justify-center md:space-x-8 space-y-4 md:space-y-0 mb-8'>
                    <button  // Changed to <button>
                        onClick={() => handleNavLinkClick('home')} // Call handleNavLinkClick
                        className='text-white hover:text-gray-300 text-center'
                    >
                        HOME
                    </button>
                    <button // Changed to <button>
                        onClick={() => handleNavLinkClick('aboutme')} // Call handleNavLinkClick
                        className='text-white hover:text-gray-300 text-center'
                    >
                        ABOUT ME
                    </button>
                    <button  // Changed to <button>
                        onClick={() => handleNavLinkClick('experience')} // Call handleNavLinkClick
                        className='text-white hover:text-gray-300 text-center'
                    >
                        EXPERIENCE
                    </button>
                    <button  // Changed to <button>
                        onClick={() => handleNavLinkClick('skills')} // Call handleNavLinkClick
                        className='text-white hover:text-gray-300 text-center'
                    >
                        SKILLS
                    </button>
                    <button  // Changed to <button>
                        onClick={() => handleNavLinkClick('projects')} // Call handleNavLinkClick
                        className='text-white hover:text-gray-300 text-center'
                    >
                        PROJECTS
                    </button>
                    <button  // Changed to <button>
                        onClick={() => handleNavLinkClick('getintouch')} // Call handleNavLinkClick
                        className='text-white hover:text-gray-300 text-center'
                    >
                        GET IN TOUCH
                    </button>
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
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M2 12H22'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
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
