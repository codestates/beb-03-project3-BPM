import { Link } from "react-router-dom";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";

const CardCover = styled(Card)(
	({ theme }) => `
    position: realtive;

    .MuiCardMedia-root {
      height: ${theme.spacing(60)};
			// width: ${theme.spacing(60)}
    }
`
);

export default function ChartInfo({ chartData }: any) {
	return (
		<>
			<CardCover>
				<CardMedia image={`${chartData.image}`} />
			</CardCover>
			<Box display="flex" mt={1} mb={3} justifyContent="center">
				<Box>
					<Typography
						variant="subtitle2"
						sx={{
							color: "#404040",
							fontFamily: "Copperplate",
						}}
					>
						T R A C K
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						gutterBottom
						sx={{
							fontWeight: "bold",
							color: "#404040",
							fontFamily: "Avenir Next LT Pro",
						}}
					>
						{chartData.title}
					</Typography>
					<Typography variant="subtitle2">By {chartData.artist}</Typography>
				</Box>
			</Box>

			<Box
				display={{ xs: "block", md: "flex" }}
				alignItems="center"
				justifyContent="space-between"
			>
				<Box>
					<Button
						sx={{
							mt: { xs: 2, md: 0 },
							textDecoration: "none",
							backgroundColor: "coral",
						}}
						size="small"
						variant="contained"
						component={Link}
						to={`/review`}
					>
						{/*FIXME: 리뷰작성으로 연결 */}
						review
					</Button>
					<Button
						size="small"
						sx={{ mx: 1, borderColor: "coral", color: "coral" }}
						variant="outlined"
					>
						bookmark
					</Button>
				</Box>
				<Button
					sx={{
						mt: { xs: 2, md: 0, color: "coral" },
						textDecoration: "none",
					}}
					size="small"
					variant="text"
					endIcon={<ArrowForwardTwoToneIcon />}
					component={Link}
					to={`/column`}
				>
					See all columns
				</Button>
			</Box>
		</>
	);
}
