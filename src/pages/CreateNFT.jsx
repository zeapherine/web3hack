import React, { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { nftAddress, nftMarketAddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Loader from '../components/loading/Loading';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const CreateNFT = () => {
	const navigate = useNavigate();

	const [fileUrl, setFileUrl] = useState(null);
	const [formInput, setFormInput] = useState({
		price: '',
		name: '',
		description: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	async function onChange(e) {
		const file = e.target.files[0];

		try {
			const added = await client.add(file, {
				progress: (prog) => console.log(`received: ${prog}`),
			});

			const url = `https://ipfs.infura.io/ipfs/${added.path}`;

			setFileUrl(url);
		} catch (err) {
			console.log(err);
		}
	}

	async function createItem() {
		setIsLoading(true);
		const { name, description, price } = formInput;
		if (!name || !description || !price) return;

		const data = JSON.stringify({
			name,
			description,
			image: fileUrl,
		});

		try {
			const added = await client.add(data);
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			createSale(url);
		} catch (err) {
			setIsLoading(false);
			console.log(err);
		}
	}

	async function createSale(url) {
		setIsLoading(true);

		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
		let transaction = await contract.createToken(url);
		let tx = await transaction.wait();

		let event = tx.events[0];
		let values = event.args[2];
		let tokenId = values.toNumber();
		console.log('event: ', event, 'values: ', values, 'tokenId: ', tokenId);

		const price = ethers.utils.parseUnits(formInput.price, 'ether');

		contract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, signer);
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();

		transaction = await contract.createMarketItem(nftAddress, tokenId, price, {
			value: listingPrice,
		});

		await transaction.wait();
		setIsLoading(false);
		navigate('/explore', { replace: true });
	}

	return (
		<div className='h-screen'>
			<div className='text-center mb-8 pt-32 text-white font-bold'>
				<h1 className='font-bold text-3xl'>Create NFT</h1>
				<p className=''>Mint an NFT and list it on the marketplace</p>
			</div>
			{!isLoading ? (
				<div className='flex justify-center  items-center mb-44'>
					<div className=' flex flex-col'>
						<input
							placeholder='Asset Name'
							className='mt-8 border rounded p-4'
							required
							onChange={(e) =>
								setFormInput({ ...formInput, name: e.target.value })
							}
						/>
						<textarea
							placeholder='Asset Description'
							className='mt-2 border rounded p-4'
							required
							onChange={(e) =>
								setFormInput({ ...formInput, description: e.target.value })
							}
						/>
						<input
							placeholder='Asset Price in Eth'
							className='mt-2 border rounded p-4'
							type='number'
							required
							min='0'
							onChange={(e) =>
								setFormInput({ ...formInput, price: e.target.value })
							}
						/>
						<input
							type='file'
							name='Asset'
							className='my-4'
							onChange={onChange}
						/>
						{fileUrl && (
							<img
								className='rounded mt-4'
								width='350'
								src={fileUrl}
								alt='selected file'
							/>
						)}

						<button
							onClick={createItem}
							className='font-bold mt-4 bg-blue-700 text-white rounded p-4 shadow-lg'
						>
							Create Digital Asset
						</button>
					</div>
				</div>
			) : (
				<Loader
					description={'Minting and Listing your NFT to market!!!!!!'}
					additionalInfo={'Please pay the Listing and gas fee...'}
				/>
			)}
		</div>
	);
};

export default CreateNFT;
