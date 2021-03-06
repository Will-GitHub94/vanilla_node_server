import validator from "validator";
import config from "../../../../config/config";

/**
 * Render the main application page
 */
const renderIndex = (req, res) => {
	let safeUserObject = null;
	if (req.user) {
		safeUserObject = {
			displayName: validator.escape(req.user.displayName),
			provider: validator.escape(req.user.provider),
			username: validator.escape(req.user.username),
			created: req.user.created.toString(),
			roles: req.user.roles,
			profileImageURL: req.user.profileImageURL,
			email: validator.escape(req.user.email),
			lastName: validator.escape(req.user.lastName),
			firstName: validator.escape(req.user.firstName),
			additionalProvidersData: req.user.additionalProvidersData,
		};
	}

	res.render("modules/core/server/views/index", {
		user: JSON.stringify(safeUserObject),
		sharedConfig: JSON.stringify(config.shared),
	});
};

/**
 * Render the server error page
 */
const renderServerError = (req, res) => {
	res.status(500).render("modules/core/server/views/500", {
		error: "Oops! Something went wrong...",
	});
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
const renderNotFound = (req, res) => {
	res.status(404).format({
		"text/html": () => {
			res.render("modules/core/server/views/404", {
				url: req.originalUrl,
			});
		},
		"application/json": () => {
			res.json({
				error: "Path not found",
			});
		},
		default() {
			res.send("Path not found");
		},
	});
};

export default {
	renderIndex,
	renderServerError,
	renderNotFound
};
