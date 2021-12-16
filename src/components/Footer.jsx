import React from 'react';
import { FaTwitter } from 'react-icons/fa';

const Footer = () => {
	return (
		<div className='flex flex-col justify-center items-center mt-32 bg-slate-800 text-white p-8 w-full'>
			<p>Design and Developed with ❤️ by </p>
			<a className='flex my-7' href='https://twitter.com/zeapherine?lang=en'>
				<FaTwitter />
				Zeapherine Islary
			</a>
			<a className='flex' href='https://twitter.com/_abiodunAwoyemi'>
				<FaTwitter /> Abiodun Awoyemi
			</a>
		</div>
	);
};

export default Footer;
