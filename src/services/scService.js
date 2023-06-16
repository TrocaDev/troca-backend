const User = require("../models/trocaModel");
const { is24HoursAgo } = require("../utils/dateUtils");
const { socialConnect } = require("../utils/socialConnect");

async function checkConnection(mobile) {
	console.log("Checking Mobile connection for mobile:", mobile);

	let user = await User.findOne({ mobile });
    console.log(`Found Mobile entries: ${mobile}`)

	if (!user) {
		console.log("Mobile mobile not found. Creating new entry.");
		user = new User({ mobile });
	}

	if (user.connectedAddresses.length === 0 || is24HoursAgo(user.lastUpdated)) {
		console.log(
			"Connected address not found or last updated more than 24 hours ago. Performing social connect."
		);

		const connectedAddresses = await socialConnect(mobile);

		if (connectedAddresses) {
			user.connectedAddresses = connectedAddresses;
			user.lastUpdated = Date.now();
			await user.save();
			console.log(
				"Connected address updated for Mobile mobile:",
				mobile
			);
		} else {
			console.log(
				"No connected address found for Mobile mobile:",
				mobile
			);
		}
	} else {
		console.log(
			"Connected address found and last updated within 24 hours."
		);
	}

	console.log("Returning Mobile connection details.");
	return {
		mobile: user.mobile,
		connectedAddresses: user.connectedAddresses,
	};
}

module.exports = {
	checkConnection,
};
