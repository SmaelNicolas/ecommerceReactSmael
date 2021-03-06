import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

import "./ButtonsDisplay.css";

function ButtonsDisplay() {
	const [cart, setCart] = useContext(CartContext);

	const isEmpty = () => {
		return cart.length === 0;
	};

	const vaciar = () => {
		setCart([]);
	};

	return isEmpty() ? (
		<>
			<Link to='/' className='ItemOnCartContainerListVaciar'>
				HOME
			</Link>
			<div className='ItemOnCartContainerListVaciarMensaje'>
				NO PRODUCTS TO DISPLAY
			</div>
		</>
	) : (
		<button className='ItemOnCartContainerListVaciar' onClick={vaciar}>
			EMPTY CART
		</button>
	);
}

export default ButtonsDisplay;
