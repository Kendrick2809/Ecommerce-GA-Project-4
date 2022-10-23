import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../features/Loader";
import FormContainer from "../features/FormContainer";
import { registerUser } from "../../actions/userActions";

const RegisterScreen = () => {
	const { loading, userInfo, error, success } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();

	const { register, handleSubmit } = useForm();

	const navigate = useNavigate();

	useEffect(() => {
		// redirect user to login page if registration was successful
		if (success) navigate("/login");
		// redirect authenticated user to profile screen
		if (userInfo) navigate("/");
	}, [navigate, userInfo, success]);

	const submitForm = (data) => {
		// check if passwords match
		if (data.password !== data.confirmPassword) {
			alert("Password mismatch");
			return;
		}
		// transform email string to lowercase to avoid case sensitivity issues during login
		data.email = data.email.toLowerCase();
		dispatch(registerUser(data));
	};
	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<div className="form-group">
				<label htmlFor="name">First Name</label>
				<input
					type="text"
					className="form-input"
					{...register("name")}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					className="form-input"
					{...register("email")}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					className="form-input"
					{...register("password")}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="email">Confirm Password</label>
				<input
					type="password"
					className="form-input"
					{...register("confirmPassword")}
					required
				/>
			</div>
			<button type="submit" className="button" disabled={loading}>
				Register
			</button>
		</form>
	);
};
export default RegisterScreen;
