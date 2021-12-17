import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	window.onscroll = () => {
		setIsScrolled(window.scrollY === 0 ? false : true);
		return () => (window.onscroll = null); // clean up function to prevent infinite loop
	};

	const [currentAccount, setCurrentAccount] = useState('');

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log('Make sure you have metamask!');
			return;
		} else {
			console.log('We have the ethereum object', ethereum);
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
	};

	/*
	 * Implement your connectWallet method here
	 */
	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}

			/*
			 * Fancy method to request access to account.
			 */
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			/*
			 * Boom! This should print out public address once we authorize Metamask.
			 */
			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	// Render Methods
	const renderNotConnectedContainer = () => (
		<button
			onClick={connectWallet}
			className='ml-24 mt-4 py-2 px-3 rounded-full bg-pink-500 text-white'
		>
			Connect Wallet
		</button>
	);

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div
			className={
				isScrolled
					? ' bg-slate-700 flex items-center justify-between  py-4 text-white fixed top-0 left-0 right-0 p-3  '
					: 'flex items-center bg-slate-600 justify-between  py-4 text-white fixed top-0 left-0 right-0 p-3 '
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

				{currentAccount === '' ? (
					renderNotConnectedContainer()
				) : (
					<div className='flex flex-col mr-5'>
						<p>Account</p>
						<p className='w-24 text-ellipsis overflow-hidden '>
							{currentAccount}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
