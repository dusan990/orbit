import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import logo from "../assets/logo.svg";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isPending } = useLogin();

	const handleFormSubmit = (event) => {
		event.preventDefault();
		login(email, password);
	};

	return (
		<main className="main" id="authentication">
			<div className="container">
				<img src={logo} className="app-logo" alt="logo" />
				<h3>Sign in to Orbit</h3>
				<p className="caption">Not a member? <Link to="/register">Create account</Link></p>

				<form onSubmit={handleFormSubmit} className="auth-form">
					<div className="textfield">
						<label for="email">Email</label>
						<input
							required
							type="email"
							id="email"
							placeholder="e.g. john@email.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className="input-field--fill"
						/>
					</div>

					<div className="textfield">
						<label for="password">Password</label>
						<input
							required
							type="password"
							id="password"
							placeholder="Must have at least 8 characters"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>

					{!isPending && <button className="btn btn-primary">Sign in</button>}
					
					{isPending && (
						<button className="btn btn-primary" disabled>
							loading
						</button>
					)}
					{error && <div className="error">{error}</div>}
				</form>
			</div>
		</main>
	);
}
