const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

const ErrorCodes = require("../core/constants");

// Post Book Detail
router.post("/", async function (req, res, next) {
    let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "INR",
			description: "Bookshelf company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
			message: "Payment failed",
			success: false
		})
	}
});

module.exports = router;
