require('dotenv').config();

export default async function handler(req, res) {
	let location = req.query.location;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': process.env.RAPID_API_KEY,
			'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
		},
	};

	const response = await fetch(
		`https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${location}&accept-language=en&polygon_threshold=0.0`,
		options
	);
	const latLng = await response.json();

	if (latLng) {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': process.env.RAPID_API_KEY,
				'X-RapidAPI-Host': 'stormglass.p.rapidapi.com',
			},
		};

		const response = await fetch(
			`https://stormglass.p.rapidapi.com/forecast?lng=${latLng[0].lon}&lat=${latLng[0].lat}`,
			options
		);
		const data = await response.json();

		res.status(200).json(data);
	}
}
