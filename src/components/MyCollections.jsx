import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { nftAddress, nftMarketAddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const MyCollections = () => {
	const navigate = useNavigate();
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');

	useEffect(() => {
		loadNfts();
	}, []);

	async function loadNfts() {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const marketContract = new ethers.Contract(
			nftMarketAddress,
			NFTMarket.abi,
			signer
		);
		const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
		const data = await marketContract.fetchMyNFTs();

		const items = await Promise.all(
			data.map(async (i) => {
				const tokenUri = await tokenContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
					name: meta.data.name,
					description: meta.data.description,
				};
				return item;
			})
		);

		setNfts(items);
		setLoadingState('loaded');
	}

	async function ListSale(nft) {
		const { price, tokenId, name, description, image } = nft;
		console.log(
			'price: ',
			price,
			'tokenId: ',
			tokenId,
			'name: ',
			name,
			'description: ',
			description,
			'image: ',
			image
		);

		console.log('nft::::::: ', nft);

		// const data = JSON.stringify({
		// 	name,
		// 	description,
		// 	image,
		// });

		// const added = await client.add(data);
		// const url = `https://ipfs.infura.io/ipfs/${added.path}`;

		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const priceNft = ethers.utils.parseUnits(price, 'ether');

		const marketContract = new ethers.Contract(
			nftMarketAddress,
			NFTMarket.abi,
			signer
		);

		let listingPrice = await marketContract.getListingPrice();
		listingPrice = listingPrice.toString();

		const transaction = await marketContract.createMarketItem(
			nftAddress,
			tokenId,
			priceNft,
			{
				value: listingPrice,
			}
		);

		await transaction.wait();
		const updatedNfts = nfts.filter((item) => item !== nft);
		setNfts(updatedNfts);
		navigate('/explore', { replace: true });
	}

	if (loadingState === 'loaded' && !nfts.length)
		return (
			<h1 className='py-10 px-20 text-3xl text-white'>
				You haven't bought any art yet
			</h1>
		);
	return (
		<div className='flex justify-center'>
			<div className='p-4'>
				<h1 className='text-3xl text-center my-10 font-bold text-yellow-50'>
					Your Collections that you bought
				</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
					{nfts.map((nft, i) => (
						<div key={i} className='border shadow rounded-xl overflow-hidden'>
							<img src={nft.image} alt='art' className='rounded' />
							<div className='p-4 bg-slate-800'>
								<p className='text-2xl font-bold text-white'>
									Price - {nft.price} Eth
								</p>

								<button
									className='rounded-xl py-1 px-3 bg-pink-500 font-bold text-lg text-white m-2'
									onClick={() => ListSale(nft)}
								>
									List for sale
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyCollections;
