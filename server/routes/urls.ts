import Url from '../models/Url';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const router = express.Router();

// Short URL Generator
router.post('/short', async (req, res) => {
	const { origUrl } = req.body;
	const base = process.env.BASE;

	const urlId = generateCustomShortUrl(6);
	if (validateUrl(origUrl)) {
		try {
			let url = await Url.findOne({ origUrl });
			if (url) {
				res.json(url);
			} else {
				const shortUrl = `${base}/${urlId}`;

				url = new Url({
					origUrl,
					shortUrl,
					urlId,
					date: new Date(),
				});

				await url.save();
				res.json(url);
			}
		} catch (err) {
			console.log(err);
			res.status(500).json('Server Error');
		}
	} else {
		res.status(400).json('Invalid Original Url');
	}
});

export default router;

function validateUrl(value: string) {
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
		value
	);
}

// Define characters for custom short URL
const characters =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Function to generate custom short URL
function generateCustomShortUrl(length: number) {
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
