import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, Component, data) => {
	switch (process) {
		case "pending":
			return <Skeleton />;
		case "loading":
			return <Spinner />;
		case "success":
			return <Component data={data} />;
		case "error":
			return <ErrorMessage />;
		default:
			throw new Error("Unexpected process state");
	}
};

export default setContent;
