import { Component } from "react";
import PropTypes from "prop-types";

import "./charInfo.scss";
import MarvelSrevice from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	};

	marvelService = new MarvelSrevice();

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) this.updateChar();
	}

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	};

	onCharLoading = () => {
		this.setState({ loading: true });
	};

	onError = () => {
		this.setState({ loading: false, error: true });
	};

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) return;

		this.onCharLoading();
		this.marvelService
			.getCharacter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError);
	};

	render() {
		const { char, loading, error } = this.state;
		const skeleton = char || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? (
			<View char={char} />
		) : null;

		return (
			<div className="char__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		);
	}
}

const View = ({
	char: { name, description, thumbnail, homepage, wiki, comics },
}) => {
	const imgStyle =
		thumbnail ===
		"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
			? { objectFit: "unset" }
			: { objectFit: "cover" };

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : "No comics"}
				{comics.slice(0, 9).map((item, i) => (
					<li className="char__comics-item" key={i}>
						{item.name}
					</li>
				))}
			</ul>
		</>
	);
};

CharInfo.propTypes = { charId: PropTypes.number };

export default CharInfo;
