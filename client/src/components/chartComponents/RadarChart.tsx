import React from "react";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Box, Card, CardHeader, Divider, Grid } from "@mui/material";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

export default function RadarChart({ chartData }: any) {
	const {
		AddictiveAvg,
		artistryAvg,
		individualityAvg,
		lyricsAvg,
		popularityAvg,
	} = chartData;

	const data = {
		labels: ["중독성", "예술성", "개성", "가사", "대중성"],
		datasets: [
			{
				label: `${chartData.title}`,
				data: [
					AddictiveAvg,
					artistryAvg,
					individualityAvg,
					lyricsAvg,
					popularityAvg,
				],
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "coral",
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: false,
		interaction: {
			mode: "index" as const,
			intersect: false,
		},
	};

	return (
		<>
			<Card>
				<CardHeader
					title="Evaluation Average"
					sx={{
						color: "#404040",
					}}
				/>
				<Divider />
				<Box p={1} display="flex" justifyContent="center">
					<Grid spacing={2}>
						<Radar data={data} options={options} width={500} height={500} />
					</Grid>
				</Box>
			</Card>
		</>
	);
}