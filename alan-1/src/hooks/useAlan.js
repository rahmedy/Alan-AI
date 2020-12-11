import { useEffect, useState, useCallback } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useCart } from '../context/CartContext';
import storeItems from '../items.json'

const COMMANDS = {
	OPEN_CART: 'open-cart',
	CLOSE_CART: 'close-cart',
	ADD_ITEM: 'add-item'
};

export default function useAlan() {
	const [ alanInstance, setAlanInstance ] = useState();
	const { setShowCartItems, isCartEmpty, addToCart } = useCart();

	const openCart = useCallback(
		() => {
			if (isCartEmpty) {
				alanInstance.playText('You have no items in your cart');
			} else {
				alanInstance.playText('Opening cart');
				setShowCartItems(true);
			}
		},
		[ alanInstance, isCartEmpty, setShowCartItems ]
	);

	const closeCart = useCallback(
		() => {
			if (isCartEmpty) {
				alanInstance.playText('You have no items in your cart');
			} else {
				alanInstance.playText('Closing cart');
				setShowCartItems(false);
			}
		},
		[ alanInstance, isCartEmpty, setShowCartItems ]
	);

	const addItem = useCallback(({detail: {name, quantity}}) =>{
		const item = storeItems.find(i => i.name.toLowerCase() === name.toLowerCase())
		if(item == null) {
			alanInstance.playText(`I cannot find the ${name} item `)
		} else {
			addToCart(item.id, quantity)
			alanInstance.playText(`Added ${quantity} of the ${name} item to your cart`)
		}


	})

	useEffect(
		() => {
			window.addEventListener(COMMANDS.OPEN_CART, openCart);
			window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
			window.addEventListener(COMMANDS.ADD_ITEM, addItem);


			return () => {
				window.removeEventListener(COMMANDS.OPEN_CART, openCart);
				window.removeEventListener(COMMANDS.CLOSE_CART, closeCart);
				window.removeEventListener(COMMANDS.ADD_ITEM, addItem);

			};
		},
		[ openCart, closeCart ]
	);

	useEffect(() => {
		if (alanInstance != null) return;

		setAlanInstance(
			alanBtn({
				key: process.env.REACT_APP_ALAN_KEY,
				onCommand: ({ command, payload }) => {
					window.dispatchEvent(new CustomEvent(command, {detail: payload}));
				}
			})
		);
	}, []);

	return null;
}
