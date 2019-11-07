import React, { useState, useEffect } from "react";
import api from "../utils/api";

const UpdateUser = (props) => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		id: "",
	});

	useEffect(() => {
		api()
			.get(`/users/${props.match.params.id}`)
			.then((res) => setUser(res.data))
			.catch((err) => console.log(err));
	}, [props.match.params.id]);

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		api()
			.put(`/users/${user.id}`, user)
			.then((res) => props.history.push("/users"))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1>Update User</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={user.name}
					onChange={(e) => handleChange(e)}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={user.email}
					onChange={(e) => handleChange(e)}
				/>
				<button type="submit">Save</button>
			</form>
		</>
	);
};

export default UpdateUser;
