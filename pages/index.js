import { useState } from 'react';
import TwelveHourChart from '../components/12HourChart';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
	const [report, setReport] = useState(null);
	const [err, setErr] = useState(null);
	const [location, setLocation] = useState('');

	const getReport = () => {
		fetch(`https://wavewatch.vercel.app/api/report?location=${location}`)
			.then((res) => res.json())
			.then((data) => {
				setReport(data);
				setErr(null);
			})
			.catch((err) => setErr(err));
	};

	const twelveHour = [];
	if (report) {
		for (let i = 0; i < 12; i++) {
			twelveHour.push(report.hours[i]);
		}
	}

	return (
		<div className="h-screen flex flex-col justify-between">
			<nav className="flex items-center px-4 py-2">
				<div className="flex justify-between items-center w-full h-full">
					<Link className="flex items-center" href="/">
						<Image src="/logo.png" alt="Logo" width={32} height={20} />
						<div className="text-xl md:text-2xl font-bold">WaveWatch</div>
					</Link>
					<div className="flex w-1/2 justify-end relative">
						<div
							className={
								err
									? 'border border-red-600 rounded-full px-4 py-2 flex items-center md:w-1/2'
									: 'border border-neutral-400 rounded-full px-4 py-2 flex items-center md:w-1/2'
							}
						>
							<input
								type="text"
								className="bg-transparent outline-none w-full"
								onChange={(e) => setLocation(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										getReport();
									}
								}}
							/>
							<button onClick={getReport} className="text-neutral-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-4 h-4"
								>
									<path
										fillRule="evenodd"
										d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
						{err && (
							<p className="text-red-600 text-xs font-semibold mt-2 absolute -bottom-5 right-8">
								Location not found
							</p>
						)}
					</div>
				</div>
			</nav>
			{!report && (
				<div className="flex h-full text-center justify-center flex-col space-y-4 px-4">
					<h1 className="text-2xl md:text-3xl font-bold">
						Welcome to <span className="text-teal-500">WaveWatch</span>
					</h1>
					<p>
						Simply search for a location and get real-time surf data including
						air temp, water temp, and wave height!
					</p>
				</div>
			)}
			{report && (
				<div className="mt-20 h-full">
					<div className="px-6 md:px-20 flex flex-col space-y-8">
						<div className="text-3xl font-semibold">Current Conditions</div>
						<div className="grid grid-cols-3 gap-2 md:gap-4">
							<div className="bg-neutral-50 flex flex-col justify-between shadow-md rounded-lg p-6">
								<p className="text-xs font-semibold">Air Temp</p>
								<div className="text-2xl font-bold">
									{Math.floor(
										report.hours[0].airTemperature[0].value * 1.8 + 32
									)}
									<span className="text-base">°F</span>
								</div>
							</div>
							<div className="bg-neutral-50 flex flex-col justify-between shadow-md rounded-lg p-6">
								<p className="text-xs font-semibold">Water Temp</p>
								<div className="text-2xl font-bold">
									{Math.floor(
										report.hours[0].waterTemperature[0].value * 1.8 + 32
									)}
									<span className="text-base">°F</span>
								</div>
							</div>
							<div className="bg-neutral-50 flex flex-col justify-between shadow-md rounded-lg p-6">
								<p className="text-xs font-semibold">Wave Height</p>
								<div className="text-2xl font-bold">
									{`${Math.floor(
										report.hours[0].swellHeight[0].value * 3.28
									)}-${Math.floor(
										report.hours[0].swellHeight[0].value * 3.28 + 1
									)}`}
									<span className="text-base">ft</span>
								</div>
							</div>
						</div>
					</div>
					<TwelveHourChart twelveHour={twelveHour} />
				</div>
			)}
			<footer className="flex flex-col md:flex-row justify-between items-center px-10 py-2 bg-teal-100">
				<div className="flex flex-col items-center">
					<Link className="flex items-center" href="/">
						<Image src="/logo.png" alt="Logo" width={50} height={50} />
						<div className="text-4xl font-bold">WaveWatch</div>
					</Link>
					<p>© 2023. All rights reserved.</p>
				</div>
				<div>
					Created by{' '}
					<a className="text-teal-500" href="/">
						Cade Pope
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Home;
