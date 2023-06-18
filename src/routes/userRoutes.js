const express = require("express");
const router = express.Router();
const scService = require("../services/scService");
const { validateInput } = require("../utils/validateInput");
const { getAdderssOfSoulName } = require("../services/masaService");

router.get("/", async (req, res) => {
    console.log(req.body);
    const { handle } = req.body;

    const validatedInput = validateInput(handle);
    console.log(validatedInput);

    if (validatedInput._valid) {
        try {
            if (validatedInput._mobile) {
                let mobile = handle;
                const result = await scService.checkConnection(mobile);

                if (result.connectedAddresses.length === 0) {
                    console.log(
                        "No connected addresses found for the mobile:",
                        mobile
                    );

                    return res.status(404).json({
                        handle: result.mobile,
                        message: "No connected addresses found for the mobile",
                    });
                }

                return res.status(200).json({
                    handle: mobile,
                    connectedAddress: result.connectedAddresses[0],
                });
            } else {
                let soulname = handle.slice(0, -5);
                const result = await getAdderssOfSoulName(soulname);
                console.log("address", result);

                if (result.check) {
                    return res.status(200).json({
                        handle: handle,
                        connectedAddress: result.address,
                    });
                } else {
                    return res.status(404).json({
                        handle: handle,
                        message: "No soulname found",
                    });
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);

            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        console.log("Not a valid input");
        return res.status(400).json({
            error: "Invalid handle",
        });
    }
});

module.exports = router;
