import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyCollections from '../components/MyCollections';
import NFTCard from '../components/NFTCard';

const Explore = ({ nfts, loadingState, buyNft }) => {
	const [activeTab, setActiveTab] = useState('1');
	return (
		<div className='flex flex-col p-2 '>
			<div className='pt-44'>
				<h2 className='text-5xl font-extrabold text-white'>
					Explore Collections{' '}
				</h2>
				<p className='text-sm  text-yellow-100'>
					Explore and buy NFTs from the digital artist around the world
				</p>

				<div className='mt-12'>
					<div className='flex bg-slate-700 text-2xl text-gray-800  rounded-lg pb-3 mb-2'>
						<button
							onClick={() => setActiveTab('1')}
							className=' mx-3 mt-4 border rounded-md py-1 px-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-600'
						>
							Marketplace
						</button>

						<button
							onClick={() => setActiveTab('2')}
							className='mx-3 mt-4 border rounded-md py-1 px-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-600'
						>
							Your Collection
						</button>
					</div>
				</div>

				{activeTab === '1' ? (
					<div className=''>
						<h1 className='text-3xl text-center my-10 font-bold text-yellow-50'>
							Explore Marketplace
						</h1>
						<div className='flex flex-wrap max-w-5xl justify-center  items-center'>
							{nfts.map((nft, i) => (
								<NFTCard nft={nft} buyNft={buyNft} key={i} />
							))}
						</div>
					</div>
				) : (
					<div className='h-screen'>
						<MyCollections />
					</div>
				)}
			</div>
		</div>
	);
};

export default Explore;
