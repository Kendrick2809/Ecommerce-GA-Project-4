import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/partials/Header.jsx";
import Footer from "./components/partials/Footer.jsx";
import Productpage from "./components/screens/Productpage.jsx";

import Homepage from "./components/screens/Homepage.jsx";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" element={<Homepage />} exact />
						<Route path="/product/:id" element={<Productpage />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
