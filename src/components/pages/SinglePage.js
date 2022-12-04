import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/useMarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const { process, setProcess, getComic, getCharacterById, clearError } =
		useMarvelService();

	useEffect(() => {
		updateData();
	}, [id]);

	const updateData = () => {
		clearError();

		switch (dataType) {
			case "comic":
				getComic(id)
					.then(onDataLoaded)
					.then(() => setProcess("success"));
				break;
			case "character":
				getCharacterById(id)
					.then(onDataLoaded)
					.then(() => setProcess("success"));
		}
	};

	const onDataLoaded = (data) => {
		setData(data);
	};

	const content = setContent(process, Component, data);

	return (
		<>
			<AppBanner />
			{content}
		</>
	);
};

export default SinglePage;
