import React from 'react';
import heroImg from '../images/heroImg.png';
import NFTCard from '../components/NFTCard';
import { useNavigate } from 'react-router-dom';

const Home = ({ nfts, loadingState, buyNft }) => {
	const navigate = useNavigate();
	return (
		<div>
			<div className='flex flex-wrap justify-around items-start '>
				<div className='aspect-auto w-80 ml-10 mt-36'>
					<img
						className='object-cover rounded-3xl'
						src={heroImg}
						alt='NFT art'
					/>
					<button
						className='rounded-3xl bg-pink-500 py-2 px-3 mt-14 text-white  text-2xl'
						onClick={() => navigate('/explore')}
					>
						View Drops
					</button>
				</div>
				<div className='max-w-lg flex flex-col justify-items-end  items-start  mt-24'>
					<h1 className='text-6xl font-josefin font-bold  text-white mt-28  -tracking-tight'>
						Help you sell your NFTs
					</h1>
					<p className='text-xl font-josefin font-bold text-white mt-10'>
						Create your first digital art NFT with{' '}
						<span className='font-bold text-4xl'>
							Art<span className='text-pink-500 '>NFT</span>
						</span>
					</p>
					<button
						className='rounded-3xl bg-pink-500 py-2 px-3 mt-14 text-white  text-2xl '
						onClick={() => navigate('/createnft')}
					>
						Create Now
					</button>
				</div>
			</div>

			<div className='flex justify-center items-center mt-14'>
				<div className='max-w-lg '>
					<h2 className='font-josefin font-bold text-5xl text-center text-white p-3 mt-20'>
						The NFT Marketplace for Art
					</h2>
					<p className='font-josefin text-lg text-center text-white p-3'>
						<span className='text-3xl'>
							Art<span className=' text-pink-500'>NFT</span>
						</span>{' '}
						is a marketplace for creators and collectors. Our NFTs unlock
						contents and experience with your favorite creators. Own digital
						arts, access exclusive content, and engage with creators in a new
						way.
					</p>
				</div>
			</div>

			<div className='flex flex-col justify-center items-center mt-28'>
				<h3 className='font-bold text-white text-2xl mb-12'>Featured Drops</h3>
				<div className='flex flex-wrap max-w-5xl justify-center items-center'>
					{nfts.map((nft, i) => (
						<NFTCard nft={nft} buyNft={buyNft} key={i} />
					))}
				</div>
				<button
					className='text-lg bg-pink-500 py-2 px-3 rounded-2xl text-white mt-12'
					onClick={() => navigate('/explore')}
				>
					{' '}
					See More
				</button>
			</div>
		</div>
	);
};

export default Home;
