import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartQuantity } from "../../slice/cart-api-slice";
import queryString from "query-string";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Cart,
} from "react-bootstrap";
import { useGetProductDetailQuery } from "../../slice/product-detail-api-slice";

function Cartpage() {
	const params = useParams();
	const productId = params.id;
	const queryParams = queryString.parse(window.location.search);
	const qty = queryParams.qty;
	const [cartItems, setCartItems] = useState();

	const cart = useSelector((state) => state.cart.cartItems);
	console.log(cart);

	const dispatch = useDispatch();

	const { data, error, isLoading } = useGetProductDetailQuery(productId);

	useEffect(() => {
		const cartData = {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		};
		setCartItems(cartData);
		dispatch(addToCart(cartData));
	}, [data]);

	const updateQuantity = (e) => {
		const updatedQuantity = Number(e.target.value);
		console.log(updatedQuantity);
	};

	return (
		// <div>cart</div>
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cart.length === 0 ? (
					<div>
						Your cart is empty <Link to="/">Go Back</Link>
					</div>
				) : (
					<ListGroup variant="flush">
						{cart.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>

									<Col md={2}>${item.price}</Col>

									<Col md={3}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													updateCartQuantity({
														productId: item.product,
														quantity: Number(e.target.value),
													})
												)
											}>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>

									{/* <Col md={1}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeFromCartHandler(item.product)}>
											<i className="fas fa-trash"></i>
										</Button>
									</Col> */}
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
		</Row>
	);
}

export default Cartpage;

// const { data, error, isLoading } = useGetProductDetailQuery(productID);
// const [cartItems, setCartItems] = useState([]);
// let oldData = JSON.parse(localStorage.getItem("cartItems"));

// console.log(oldData);

// useEffect(() => {
// 	if (error) {
// 		console.log(error);
// 	} else if (isLoading) {
// 		console.log("Loading...");
// 	} else {
// 		const cartData = {
// 			product: data._id,
// 			name: data.name,
// 			image: data.image,
// 			price: data.price,
// 			countInStock: data.countInStock,
// 			productQuantity,
// 		};

// 		setCartItems([...cartItems, cartData]);
// 	}
// }, []);

// localStorage.setItem("cartItems", JSON.stringify(cartItems));

// console.log(cartItems);
