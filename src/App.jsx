import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/partials/Header.jsx";
import Footer from "./components/partials/Footer.jsx";
import Productpage from "./components/pages/Productpage.jsx";
import Homepage from "./components/pages/Homepage.jsx";
import Cartpage from "./components/pages/Cartpage.jsx";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" element={<Homepage />} exact />
						<Route path="/product/:id" element={<Productpage />} />
						<Route path="/cart/" element={<Cartpage />} />
						<Route path="/cart/:id" element={<Cartpage />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
