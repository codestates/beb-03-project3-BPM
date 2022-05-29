import { Link } from "react-router-dom";
import {
	Card,
	CardHeader,
	Divider,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ListWrapper = styled(List)(
	() => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

export default function RecentReviews({ chartData }: any) {
	return (
		<Card sx={{ height: "100%" }}>
			<CardHeader
				title="Recent Reviews"
				sx={{
					color: "#404040",
				}}
			/>
			<Divider />
			{chartData.reviews.map((review: any) => {
				return (
					<>
						<ListWrapper disablePadding>
							<ListItem component={Link} to={`/review/${review._id}`} button>
								<ListItemText primary={`${review.body.slice(0, 15)}`} />
							</ListItem>
							<Divider />
						</ListWrapper>
					</>
				);
			})}
		</Card>
	);
}
