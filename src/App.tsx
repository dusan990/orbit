import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Create from "./pages/Create"
import Document from "./pages/Document"
import Questions from "./pages/Questions"
import UserProfile from "./pages/UserProfile"
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import "./styles/scss/styles.scss";

function App() {
	const { user, authIsReady } = useAuthContext()
	
	return (
		<div className="App theme-dark">
			{authIsReady && (
				<BrowserRouter>
					<Header />

					<main>
						<Sidebar />

						<Routes>
							<Route path="/" element={
								user ? <Home /> :  <Navigate to="/login" />
							} />

							<Route path="/all/:id" element={
								user ? <Document /> : <Navigate to="/login" />
							} />
							
							<Route path="/create" element={
								<Create />
							} />
							
							<Route path="/login" element={
								user ? <Navigate to="/" /> : <Login />
							} />
							<Route path="/register" element={
								user ? <Navigate to="/" /> : <Register />
							} />
							
							<Route path="/profile" element={<UserProfile />} />
							
							<Route path="/questions" element={<Questions />} />

						</Routes>
					</main>

				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
