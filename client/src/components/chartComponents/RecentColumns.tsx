import { Link } from "react-router-dom";
import {
	Box,
	Typography,
	Card,
	CardHeader,
	Divider,
	Avatar,
	useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import ArticleIcon from "@mui/icons-material/Article";

const AvatarPrimary = styled(Avatar)(
	({ theme }: any) => `
      background: #EBB37F;
      color: "#F5CAA4";
      width: spacing(7);
      height: spacing(7);
`
);

export default function RecentColumns({ chartData }: any) {
	const theme = useTheme();

	return (
		<>
			<Card>
				<CardHeader
					title="Recent Columns"
					sx={{
						color: "#404040",
					}}
				/>
				<Divider />
				{chartData.columns.map((column: any) => {
					return (
						<>
							<Box px={2} py={4} display="flex" alignItems="flex-start">
								<AvatarPrimary>
									<ArticleIcon />
								</AvatarPrimary>
								<Box
									pl={2}
									flex={1}
									component={Link}
									to={`/column/${column._id}`}
									sx={{ textDecoration: "none" }}
								>
									<Typography variant="h5">{column.title}</Typography>

									<Box pt={2} display="flex">
										<Box pr={8}>
											<Typography
												gutterBottom
												variant="caption"
												sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
											>
												추천
											</Typography>
											<Typography variant="h6">
												{column.likes.length}
											</Typography>
										</Box>
										<Box>
											<Typography
												gutterBottom
												variant="caption"
												sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
											>
												스크랩
											</Typography>
											<Typography variant="h6">10</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
							<Divider />
						</>
					);
				})}
			</Card>
		</>
	);
}
