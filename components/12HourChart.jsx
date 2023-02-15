import { Chart as ChartJS } from 'chart.js/auto';
import { Chart, Line } from 'react-chartjs-2';

const TwelveHourChart = ({ twelveHour }) => {
	const today = new Date();
	const time = today.getHours();
	const currentTime = time >= 12 ? time - 12 : time;

	const twelveHourData = twelveHour.map((hour) =>
		Math.floor(hour.swellHeight[0].value * 3.28 + 1)
	);

	return (
		<div className="px-8 md:px-20 md:h-80 h-60 mb-40">
			<div>
				<div className="text-2xl font-medium mt-10 mb-6">12-Hour Forecast</div>
			</div>
			<Line
				data={{
					labels: [
						'Now',
						`${
							currentTime < 12
								? `${currentTime + 1}PM`
								: `${currentTime - 11}AM`
						}`,
						`${
							currentTime < 11
								? `${currentTime + 2}PM`
								: `${currentTime - 10}AM`
						}`,
						`${
							currentTime < 10 ? `${currentTime + 3}PM` : `${currentTime - 9}AM`
						}`,
						`${
							currentTime < 9 ? `${currentTime + 4}PM` : `${currentTime - 8}AM`
						}`,
						`${
							currentTime < 8 ? `${currentTime + 5}PM` : `${currentTime - 7}AM`
						}`,
						`${
							currentTime < 7 ? `${currentTime + 6}PM` : `${currentTime - 6}AM`
						}`,
						`${
							currentTime < 6 ? `${currentTime + 7}PM` : `${currentTime - 5}AM`
						}`,
						`${
							currentTime < 5 ? `${currentTime + 8}PM` : `${currentTime - 4}AM`
						}`,
						`${
							currentTime < 4 ? `${currentTime + 9}PM` : `${currentTime - 3}AM`
						}`,
						`${
							currentTime < 3 ? `${currentTime + 10}PM` : `${currentTime - 2}AM`
						}`,
						`${
							currentTime < 2 ? `${currentTime + 11}PM` : `${currentTime - 1}AM`
						}`,
					],
					datasets: [
						{
							label: 'Wave Height (ft)',
							data: twelveHourData,
							backgroundColor: 'rgba(20, 184, 166, 0.5)',
							borderColor: 'rgb(20 184 166)',
							pointRadius: 3,
							tension: 0.25,
							fill: true,
						},
					],
				}}
				height={400}
				width={600}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				}}
			/>
		</div>
	);
};

export default TwelveHourChart;
