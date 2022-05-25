import { Box, Typography, Button, Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CommuNav from "../CommuNav";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function ColumnDetail() {
  const params = useParams();
  const [like, setLike] = useState(false);
  const [data, setData] = useState([]);
  //  FIXME: redux 적용 시 바뀜
  const [userinfo, setUserinfo] = useState<any>({
    username: "kimcoding",
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/column/${params.columnid}`).then((res) => {
      const column = res.data.data;
      setData(column);
    });
  }, [like]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/column/${params.columnid}/checklike`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "ok") {
          setLike(true);
        } else if (res.data.message === "no") {
          setLike(false);
        }
      });
  }, []);

  const handleLike = (like: string) => {
    if (like === "like") {
      axios
        .post(
          `http://localhost:4000/column/${params.columnid}/like`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setLike(true);
        });
    } else if (like === "unlike") {
      axios
        .post(
          `http://localhost:4000/column/${params.columnid}/unlike`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setLike(false);
        });
    }
  };

  return (
    <Box display="flex">
      <Box position="sticky">
        <CommuNav />
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        <Container>
          {data.map((item: any) => {
            return (
              <Box flexGrow={1} textAlign="center">
                <Typography
                  fontSize="1.9rem"
                  m="80px 0 30px 0"
                  fontFamily="serif"
                  fontWeight="600"
                >
                  {item.title}
                </Typography>

                <Box
                  sx={{
                    border: "1px solid #36AE7C",
                    //   #36AE7C
                    borderRadius: "100%",
                    width: "350px",
                    height: "350px",
                    m: "20px auto 10px",
                    p: 5,
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    //   p={2}
                    fontSize="1.1rem"
                    fontFamily="Nanum Gothic"
                  >
                    {item.chart.artist}
                  </Typography>
                  {/* <Divider sx={{ mb: 3 }} /> */}
                  <img src={item.chart.image} style={{ margin: "0 auto" }} />
                  <Typography fontSize="1rem" fontFamily="Nanum Gothic">
                    {item.chart.title}
                  </Typography>
                </Box>

                <Typography m="50px 0" fontSize="1.3rem" fontFamily="serif">
                  {item.body}
                </Typography>

                <Typography fontFamily="serif" fontSize="1.3rem" color="#333">
                  <span style={{ color: "#36AE7C" }}>critic.</span>
                  {item.username}
                </Typography>
                <Typography color="#888">
                  {item.updatedAt.slice(0, 10)}
                </Typography>
                <Box
                  display={{ xs: "block", md: "flex" }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" justifyContent="center">
                    {like ? (
                      <Button
                        sx={{ mt: 3, fontSize: 20 }}
                        onClick={() => {
                          handleLike("unlike");
                        }}
                      >
                        <ThumbUpAltIcon />
                        {item.likes}
                      </Button>
                    ) : (
                      <Button
                        sx={{ mt: 3, fontSize: 20 }}
                        onClick={() => {
                          handleLike("like");
                        }}
                      >
                        <ThumbUpOffAltIcon />
                        {item.likes}
                      </Button>
                    )}
                  </Box>
                  <Box>
                    {/* FIXME: redux 적용 시 바뀜 */}
                    {item.username === userinfo.username ? (
                      <Button
                        component={Link}
                        to={`/column/write`}
                        state={{
                          id: item.id,
                          title: item.title,
                          body: item.body,
                        }}
                      >
                        수정
                      </Button>
                    ) : (
                      <Button></Button>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Container>
      </Box>
    </Box>
  );
}
