import { useState } from "react";
import {
	Formik,
	Form,
	Field,
	ErrorMessage as FormikErrorMessage,
	ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/useMarvelService";

import "./charSearchForm.scss";

const CharSearchForm = () => {
	const [char, setChar] = useState(null);

	const { process, setProcess, getCharacterByName, clearError } =
		useMarvelService();

	const updateChar = (name) => {
		clearError();
		getCharacterByName(name)
			.then(onCharLoaded)
			.then(() => setProcess("success"));
	};

	const onCharLoaded = (char) => setChar(char);

	const errorMessage =
		process === "error" ? (
			<div className="char__search-critical-error">
				<ErrorMessage />
			</div>
		) : null;
	const result = !char ? null : char.length > 0 ? (
		<div className="char__search-wrapper">
			<div className="char__search-success">
				There is! Visit {char[0].name} page?
			</div>
			<Link
				to={`/characters/${char[0].id}`}
				className="button button__secondary"
			>
				<div className="inner">To page</div>
			</Link>
		</div>
	) : (
		<div className="char__search-error">
			The character was not found. Check the name and try again
		</div>
	);

	return (
		<div className="char__search-form">
			<Formik
				initialValues={{
					name: "",
				}}
				validationSchema={Yup.object({
					name: Yup.string().required("This field is required"),
				})}
				onSubmit={({ name }) => updateChar(name)}
			>
				<Form>
					<label className="char__search-label" htmlFor="name">
						Or find a character by name:
					</label>
					<div className="char__search-wrapper">
						<Field
							id="name"
							name="name"
							type="text"
							placeholder="Enter name"
						/>
						<button type="submit" className="button button__main">
							<div className="inner">find</div>
						</button>
					</div>
					<FormikErrorMessage
						component="div"
						className="char__search-error"
						name="name"
					/>
				</Form>
			</Formik>
			{errorMessage}
			{result}
		</div>
	);
};

export default CharSearchForm;
