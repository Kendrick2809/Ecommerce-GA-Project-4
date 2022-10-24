import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../features/Loader";
import FormContainer from "../features/FormContainer";
import { registerUser, userLogin } from "../../actions/userActions";
import Message from "../features/Message";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";

function ProfilePage() {
	const { loading, userInfo, error, success, userUpdateProfile } = useSelector(
		(state) => state.user
	);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		} else {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo]);

	const submitForm = () => {
		console.log(password);
		console.log(confirmPassword);
		if (password !== confirmPassword) {
			setMessage("Password mismatch");
			return;
		} else {
			dispatch(
				updateUserProfile({
					id: userInfo._id,
					name: name,
					email: email,
					password: password,
				})
			);
			setMessage("");
		}
	};
	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}

				<Form onSubmit={handleSubmit(submitForm)}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Name"
							value={name}
							className="form-input"
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							value={email}
							className="form-input"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							value=""
							className="form-input"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							value=""
							className="form-input"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type="submit" className="button my-3" disabled={loading}>
						Update
					</Button>
				</Form>
			</Col>

			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
}

export default ProfilePage;
