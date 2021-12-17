import React from 'react';

export default function Loader({ description, additionalInfo }) {
	return (
		<>
			<div class='flex items-center justify-center  mt-16'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					class='w-24 h-24 text-pink-500 animate-spin'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='1'
						d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
					/>
				</svg>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					class='w-24 h-24 text-pink-600 animate-spin'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='1'
						d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
					/>
				</svg>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					class='w-24 h-24 text-pink-500 animate-spin'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='1'
						d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
					/>
				</svg>
			</div>
			<div className='flex flex-col justify-center items-center mt-16 text-pink-300 font-semibold text-xl'>
				<h2>{description}</h2>
				<p>{additionalInfo}</p>
				<p>Wait for transaction to commplete!!!!!!!</p>
			</div>
		</>
	);
}
