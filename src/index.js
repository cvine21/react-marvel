import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import MarvelSrevice from "./services/MarvelService";

import "./style/style.scss";

const marvelService = new MarvelSrevice();

marvelService.getAllCharacters().then((res) =>
	res.data.results.forEach((element) => {
		console.log(element.name);
	})
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
