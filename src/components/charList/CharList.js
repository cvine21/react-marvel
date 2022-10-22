import { Component } from "react";

import "./charList.scss";

import MarvelSrevice from "../../services/MarvelService";

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
	};

	marvelService = new MarvelSrevice();

	componentDidMount() {
		this.updateCharList();
	}

	onCharListLoaded = (charList) => {
		this.setState({ charList, loading: false });
	};

	onError = () => {
		this.setState({ loading: false, error: true });
	};

	updateCharList = () => {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharListLoaded)
			.catch(this.onError);
	};

	render() {
		const charList = this.state.charList.map((item) => {
			const imgStyle =
				item.thumbnail ==
				"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
					? { objectFit: "contain" }
					: { objectFit: "cover" };

			return (
				<li className="char__item">
					<img style={imgStyle} src={item.thumbnail} alt="abyss" />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});

		return (
			<div className="char__list">
				<ul className="char__grid">{charList}</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;
