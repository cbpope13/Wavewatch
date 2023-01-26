import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>WaveWatch</title>
				<meta name="description" content="Surf report app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/logo.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
