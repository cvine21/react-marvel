import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import {
	MainPage,
	ComicsPage,
	Page404,
	SingleCharacterLayout,
	SingleComicLayout,
} from "../pages";
import SinglePage from "../pages/SinglePage";

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Switch>
						<Route exact path="/">
							<MainPage />
						</Route>
						<Route exact path="/comics">
							<ComicsPage />
						</Route>
						<Route exact path={"/comics/:id"}>
							<SinglePage
								Component={SingleComicLayout}
								dataType={"comic"}
							/>
						</Route>
						<Route exact path={"/characters/:id"}>
							<SinglePage
								Component={SingleCharacterLayout}
								dataType={"character"}
							/>
						</Route>
						<Route path="*">
							<Page404 />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
};

export default App;
