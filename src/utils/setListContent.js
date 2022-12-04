import { ErrorMessage } from "formik";
import Spinner from "../components/spinner/Spinner";

const setListContent = (process, Component, newItemLoading) => {
	switch (process) {
		case "pending":
			return <Spinner />;
		case "loading":
			return newItemLoading ? <Component /> : <Spinner />;
		case "success":
			return <Component />;
		case "error":
			return <ErrorMessage />;
		default:
			throw new Error("Unexpected process state");
	}
};

export default setListContent;
