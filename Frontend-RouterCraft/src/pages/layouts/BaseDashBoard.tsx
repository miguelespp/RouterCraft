import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { ApiInstance } from "@/Services/Api.ts";
import { useJsApiLoader } from "@react-google-maps/api";

const BaseDashBoard = () => {
	const [selectedOption, setSelectedOption] = useState("Dashboard");
	const [expanded, setExpanded] = useState(false);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.APP_GOOGLE_MAPS_API_KEY,
	});

	const navigate = useNavigate();
	// const key = process.env.APP_GOOGLE_MAPS_API_KEY;

	useEffect(() => {
		const token = localStorage.getItem("jwtToken");

		if (!token) {
			navigate("/login");
			return;
		}

		try {
			const decodedToken: { exp: number } = jwtDecode(token); // Use jwtDecode
			const currentTime = Date.now() / 1000;

			if (decodedToken.exp < currentTime) {
				localStorage.removeItem("jwtToken");
				navigate("/login");
			} else {
				ApiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
			}
		} catch (error) {
			localStorage.removeItem("jwtToken");
			navigate("/login");
		}
	}, [navigate]);

	return (
		<div className="min-h-screen flex">
			<NavBar
				setSelectedOption={setSelectedOption}
				isExpanded={expanded}
				setExpandeState={setExpanded}
			/>
			<div className="grow flex flex-col">
				<Header selectedOption={selectedOption} />
				<div className="col-span-3 bg-gray-100 h-full w-full">
					{isLoaded ? (
						<Outlet />
					) : (
						<div className="flex justify-center items-center h-full">
							<h1 className="text-2xl">Loading...</h1>
						</div>
					)}
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default BaseDashBoard;
