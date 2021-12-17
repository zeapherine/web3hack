import React, { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { MdOutlinePolymer } from 'react-icons/md';

const NFTCard = ({ nft, buyNft }) => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<figure className=' rounded-3xl h-auto w-64 bg-slate-700 m-4'>
			<img
				src={nft.image}
				alt='digital art NFT'
				className=' rounded-3xl p-2 h-56 w-full object-cover'
			/>
			<h4 className='text-white text-sm p-2'>{nft.name}</h4>
			<p className='text-white text-lg p-2 font-bold'>{nft.description}</p>
			<div className='flex justify-between items-center mx-2 my-2'>
				<button
					className='rounded-xl py-1 px-3 bg-pink-500 font-bold text-lg text-white m-2'
					onClick={() => buyNft(nft)}
				>
					Buy
				</button>
				<div className='flex justify-center items-center text-purple-500 mr-2'>
					<h6 className='text-white text-lg p-2 flex justify-evenly'>
						{' '}
						{nft.price}
					</h6>
					<div className='rotate-45'>
						<MdOutlinePolymer />
					</div>
				</div>
			</div>
		</figure>
	);
};

export default NFTCard;
