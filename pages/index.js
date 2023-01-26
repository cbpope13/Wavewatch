import { useState } from 'react';
import TwelveHourChart from '../components/12HourChart';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
	const [report, setReport] = useState(null);
	const [err, setErr] = useState(null);
	const [location, setLocation] = useState('');

	const getReport = () => {
		fetch(
			`https://wavewatch-px585z7cs-cbpope13.vercel.app/api/report?location=${location}`
		)
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
		<div className="bg-neutral-200 h-screen overflow-hidden">
			<nav className="py-4 px-8">
				<div className="flex justify-between items-center h-full">
					<Link className="flex items-center" href="/">
						<Image src="/logo.png" alt="Logo" width={32} height={20} />
						<div className="text-2xl font-bold">WaveWatch</div>
					</Link>
					<div className="flex flex-col items-center">
						<div
							className={
								err
									? 'border border-red-600 rounded-full px-4 py-2'
									: 'border border-neutral-400 rounded-full px-4 py-2'
							}
						>
							<input
								type="text"
								className="bg-transparent outline-none"
								onChange={(e) => setLocation(e.target.value)}
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
							<p className="text-red-600 text-xs font-semibold mt-2">
								Location not found
							</p>
						)}
					</div>
				</div>
			</nav>
			{!report && (
				<div className="flex h-full text-center mt-56 flex-col space-y-4">
					<h1 className="text-4xl font-bold">
						Welcome to <span className="text-teal-500">WaveWatch</span>
					</h1>
					<p>
						Simply search for a location and get real-time surf data including
						air temp, water temp, and wave height!
					</p>
				</div>
			)}
			{report && (
				<div className="mt-10 h-full">
					<div className="px-20 flex flex-col space-y-8">
						<div className="text-3xl font-semibold">Current Conditions</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="bg-neutral-50 shadow-md rounded-lg p-6">
								<p className="text-xs font-semibold">Air Temp</p>
								<div className="text-3xl font-bold">
									{Math.floor(
										report.hours[0].airTemperature[0].value * 1.8 + 32
									)}
									<span className="text-base">°F</span>
								</div>
							</div>
							<div className="bg-neutral-50 shadow-md rounded-lg p-6">
								<p className="text-xs font-semibold">Water Temp</p>
								<div className="text-3xl font-bold">
									{Math.floor(
										report.hours[0].waterTemperature[0].value * 1.8 + 32
									)}
									<span className="text-base">°F</span>
								</div>
							</div>
							<div className="bg-neutral-50 shadow-md rounded-lg p-6">
								<p className="text-xs font-semibold">Wave Height</p>
								<div className="text-3xl font-bold">
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
		</div>
	);
};

export default Home;
