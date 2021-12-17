import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import CreateNFT from './pages/CreateNFT.jsx';
import Error from './pages/Error.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Explore from './pages/Explore';
import Footer from './components/Footer.jsx';
import { nftAddress, nftMarketAddress } from './config.js';

import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';

import NFT from './artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from './artifacts/contracts/NFTMarket.sol/NFTMarket.json';

function App() {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');

	useEffect(() => {
		loadNFTs();
	}, []);

	async function loadNFTs() {
		/* create a generic provider and query for unsold market items */
		const provider = new ethers.providers.JsonRpcProvider(
			'https://rpc-mumbai.maticvigil.com'
		);
		const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
		const marketContract = new ethers.Contract(
			nftMarketAddress,
			NFTMarket.abi,
			provider
		);
		const data = await marketContract.fetchMarketItems();
		/*
		 *  map over items returned from smart contract and format
		 *  them as well as fetch their token metadata
		 */
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

	async function buyNft(nft) {
		/* needs the user to sign the transaction, so will use Web3Provider and sign it */
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			nftMarketAddress,
			NFTMarket.abi,
			signer
		);

		/* user will be prompted to pay the asking proces to complete the transaction */
		const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
		const transaction = await contract.createMarketSale(
			nftAddress,
			nft.tokenId,
			{
				value: price,
			}
		);
		await transaction.wait();
		loadNFTs();
	}

	return (
		<BrowserRouter>
			<div className='bg-slate-600  font-josefin box-border w-screen '>
				<div className=' max-w-screen-2xl  content-center  mx-auto '>
					<Header />
					<Routes>
						<Route
							path='/'
							element={
								<Home nfts={nfts} loadingState={loadingState} buyNft={buyNft} />
							}
						/>
						<Route
							path='/explore'
							element={
								<Explore
									nfts={nfts}
									loadingState={loadingState}
									buyNft={buyNft}
								/>
							}
						/>
						<Route path='/createnft' element={<CreateNFT />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='*' element={<Error />} />
					</Routes>
					<Footer />
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
