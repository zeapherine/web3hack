import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	window.onscroll = () => {
		setIsScrolled(window.scrollY === 0 ? false : true);
		return () => (window.onscroll = null); // clean up function to prevent infinite loop
	};

	return (
		<div
			className={
				isScrolled
					? ' bg-slate-700 flex items-center justify-between  py-4 text-white fixed top-0 left-0 right-0 p-3 '
					: 'flex items-center bg-slate-600 justify-between  py-4 text-white fixed top-0 left-0 right-0 p-3'
			}
		>
			<Link to='/' className='text-4xl font-bold'>
				Art<span className='text-pink-500'>NFT</span>
			</Link>
			<div className='flex items-center justify-between'>
				<Link to='/explore' className='text-2xl mx-3 mt-4'>
					Explore
				</Link>
				<Link to='/createnft' className='text-2xl mx-3 mt-4'>
					Create NFT
				</Link>
				<Link to='/profile' className='text-2xl mx-3 mt-4'>
					Profile
				</Link>
				<button className='ml-24 mt-4 py-2 px-3 rounded-full bg-pink-500 text-white'>
					Connect Wallet
				</button>
			</div>
		</div>
	);
};

export default Header;
