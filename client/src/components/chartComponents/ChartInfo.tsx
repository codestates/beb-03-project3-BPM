import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

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
      {/* <CardCover>
        <CardMedia image={`${chartData.image}`} />
      </CardCover> */}
      <Box textAlign="center" mt={2} mb={10}>
        <img
          style={{
            width: "100%",
            boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.2)",
          }}
          src={`${chartData.image}`}
          alt="앨범자켓"
        />
        <Typography
          variant="h6"
          sx={{
            color: "#404040",
            fontFamily: "Copperplate",
            mt: 2,
          }}
        >
          T R A C K
        </Typography>
        <Typography
          fontSize="1.7rem"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#404040",
            fontFamily: "Avenir Next LT Pro",
          }}
        >
          {chartData.title}
        </Typography>
        <Typography variant="subtitle1">By {chartData.artist}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box>
          <Button
            sx={{
              textDecoration: "none",
              backgroundColor: "lightcoral",
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
            sx={{ mx: 1, borderColor: "lightcoral", color: "lightcoral" }}
            variant="outlined"
          >
            bookmark
          </Button>
        </Box>
        <Button
          sx={{
            color: "lightcoral",
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
