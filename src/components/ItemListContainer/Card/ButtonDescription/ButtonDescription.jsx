import { Link } from "react-router-dom";
import "./ButtonDescription.css";

function ButtonDescription({ id }) {
	return (
		<div className="productCardButtonContainer">
			<Link
				to={`/description/${id}`}
				className="productCardButtonDescription"
			>
				Description
			</Link>
		</div>
	);
}

export default ButtonDescription;
