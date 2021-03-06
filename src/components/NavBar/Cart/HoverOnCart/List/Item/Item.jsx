import { useContext } from "react";

import { CartContext } from "../../../../../../context/CartContext";
import "./Item.css";

function Item({ product }) {
	const [cart, setCart] = useContext(CartContext);

	const deleteItem = () => {
		setCart(cart.filter((prod) => prod.id !== product.id));
	};

	return (
		<>
			<p className='cartListHoverTitle'> {product.title} </p>
			<p className='cartListHoverPrice'>
				US$ {(product.price * product.quantity).toFixed(2)}
			</p>
			<p className='cartListHoverCantidad'>
				QUANTITY: {product.quantity}
			</p>
			<div className='buttonDeleteFromHover'>
				<i className='fas fa-trash' onClick={deleteItem}></i>
			</div>
		</>
	);
}

export default Item;
