'use client';
import { motion, AnimatePresence } from 'framer-motion';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';

const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route
					path='/'
					element={
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className='bg-black min-h-screen text-white'
						>
							<Header />
							<Hero id='home' />
							<About id='aboutme' />
							<Experience id='education' />
							<Skills id='experience' />
							<Projects id='projects' />
							<Footer id='getintouch' />
						</motion.div>
					}
				/>
				<Route
					path='/project/:id'
					element={
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Header />
							<ProjectDetail />
						</motion.div>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
};

function App() {
	return (
		<Router>
			<AnimatedRoutes />
		</Router>
	);
}

export default App;
