import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import TextDescription from "./TextDescription/TextDescription";
import Image from "./Image/Image";
import Price from "./Price/Price";
import Title from "./Title/Title";
import AddToCart from "./AddToCart/AddToCart";
import getFirestore from "../../firebase/Firebase";
import "./ItemDescriptionContainer.css";
import Stock from "../ItemListContainer/Card/Stock/Stock";
import InvalidIdScreen from "./InvalidIdScreen/InvalidIdScreen";

// Se crea el producto seleccionado con sus caracteristicas y la opcion de agregar al carrito

function ItemDescriptionContainer() {
	//hook para guardar el producto solicitado
	const [prodDescription, setProductDescriptionFind] = useState([]);

	//loading effect
	const [loader, setLoader] = useState(true);

	//id del producto obtenido desde la URL
	const { idProduct } = useParams();

	useEffect(() => {
		setLoader(true);

		//consulta firebase
		const db = getFirestore();
		const dbQuery = db.collection("productos").doc(idProduct);
		dbQuery
			.get()
			.then((product) => {
				product.exists
					? setProductDescriptionFind({
							id: idProduct,
							...product.data(),
					  })
					: setProductDescriptionFind(null);
			})
			.finally(() =>
				setTimeout(() => {
					setLoader(false);
				}, 1500)
			);
	}, [idProduct]);

	return loader ? (
		<LoadingScreen />
	) : prodDescription !== null ? (
		<section className='ItemDescriptionContainer'>
			<div
				key={`description${prodDescription.id}`}
				className='ItemDescription'
			>
				<Stock stock={prodDescription.stock} />
				<Title title={prodDescription.title} />
				<Image img={prodDescription.img} />
				<TextDescription text={prodDescription.description} />
				<Price price={prodDescription.price} />
				<AddToCart prodDescription={prodDescription} />
				<div id='alertMessageStock' className='alertMessage'>
					<p className='alertMessageText'>
						You have reached the maximum stock
					</p>
				</div>
				<div id='alertMessageStock0' className='alertMessage'>
					<p className='alertMessageText'>Select a valid stock</p>
				</div>
				<div id='alertMessageNoStock' className='alertMessage'>
					<p className='alertMessageText'>
						Select the number of products
					</p>
				</div>
			</div>
		</section>
	) : (
		<InvalidIdScreen />
	);
}

export default ItemDescriptionContainer;
