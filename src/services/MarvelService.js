class MarvelSrevice {
	_apiBase = "https://gateway.marvel.com:443/v1/public/";
	_apiKey = "apikey=029590be118da14e326d2d8857dcbd55";

	getResource = async (url) => {
		try {
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(
					`Could not fetch ${url}, status: ${res.status}`
				);
			}

			return await res.json();
		} catch (e) {
			console.error(e.message);
		}
	};

	getAllCharacters = () => {
		return this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		);
	};

	getCharacter = (id) => {
		return this.getResource(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		);
	};
}

export default MarvelSrevice;
