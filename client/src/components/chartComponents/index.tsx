import { useParams } from "react-router";
import { Box, Grid, Container, CircularProgress } from "@mui/material";

import CommuNav from "../commuComponents/CommuNav";
import ChartInfo from "./ChartInfo";
import RecentColumns from "./RecentColumns";
import RadarChart from "./RadarChart";
import RecentReviews from "./RecentReviews";

import axios from "axios";
import { Async } from "react-async";

export default function ChartDetail() {
  const params = useParams();

  async function getDetail() {
    const detail = await axios.get(
      `http://localhost:4000/main/detail/${params.chartid}`
    );
    return detail.data.data;
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        //    sx={{ backgroundColor: "#FAF5F0" }}
      >
        <Box position="sticky">
          <CommuNav />
        </Box>
        <Async promiseFn={getDetail}>
          {({ data, error, isPending }) => {
            if (isPending) return <CircularProgress color="inherit" />;
            if (error) return `Something went wrong: ${error.message}`;

            return (
              <>
                {data.map((chartData: any, index: number) => {
                  return (
                    <>
                      <Container sx={{ mt: 5 }} maxWidth="lg">
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={8}>
                            <ChartInfo chartData={chartData} />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <RecentColumns chartData={chartData} />
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <RadarChart chartData={chartData} />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <RecentReviews chartData={chartData} />
                          </Grid>
                        </Grid>
                      </Container>
                    </>
                  );
                })}
              </>
            );
          }}
        </Async>
      </Box>
    </>
  );
}
