import React, { useEffect, useState } from "react";
import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../modules/userReducer";
import { useNavigate } from "react-router";

export default function Profile() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [click, setClick] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/mypage", {
        withCredentials: true,
      })
      .then((res) => {
        setAddress(res.data.data.address);
        setName(res.data.data.username);
        setDesc(res.data.data.desc);
        setEmail(res.data.data.email);
      })
      .catch((e) => {
        if (e.message === "Request failed with status code 400") {
          alert("로그인 만료");
          dispatch(unsetUser());
          navigate("/");
        }
      });
  }, []);

  const handleUpdate = (event: any) => {
    const formData = new FormData(event.currentTarget);
    if (formData.get("username")) {
      if (formData.get("username") === "") {
        alert("닉네임을 적어주세요");
      }
      axios
        .patch(
          "http://localhost:4000/user/update",
          {
            username: formData.get("username"),
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setClick("");
        })
        .catch((e) => {
          if (e.message === "Request failed with status code 404") {
            alert("중복 이름입니다.");
          }
        });
    } else if (formData.get("email")) {
      axios
        .patch(
          "http://localhost:4000/user/update",
          {
            email: formData.get("email"),
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setClick("");
        });
    } else if (formData.get("desc")) {
      axios
        .patch(
          "http://localhost:4000/user/update",
          {
            desc: formData.get("desc"),
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setClick("");
        });
    }
  };

  return (
    <Grid container justifyContent="center" p={5}>
      <Box
        sx={{
          width: "160px",
          height: "160px",
          // .com/collection/사용자고유id 번호 입력하면 매번 바뀌지 않고 같은 이미지 가능
          background: `center URL("https://source.unsplash.com/random")`,
          backgroundSize: "cover",
          borderRadius: 100,
        }}
      ></Box>
      <Grid item xs={3} mt={2} ml={7}>
        {click === "name" ? (
          <Box
            component="form"
            onSubmit={handleUpdate}
            mt={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              name="username"
              required
              fullWidth
              id="username"
              defaultValue={name}
              autoFocus
              size="small"
              sx={{ mt: 0.1 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: "1rem",
                "&: hover": {
                  bgcolor: "white",
                  color: "#000",
                  height: "100%",
                },
              }}
            >
              수정
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              onDoubleClick={() => {
                setClick("name");
              }}
              sx={{
                fontWeight: "bold",
                fontSize: 25,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Box
            onClick={() => {
              navigator.clipboard.writeText(address).then(
                () => {
                  alert("주소가 복사되었습니다.");
                },
                () => {
                  alert("주소 복사에 실패했습니다.");
                }
              );
            }}
            display="flex"
            justifyContent="center"
            sx={{
              width: "40%",
              textTransform: "lowercase",
              cursor: "pointer",
              borderRadius: 10,
              border: "1px dotted #333",
              pl: 8,
              pr: 8,
            }}
          >
            {address.slice(0, 4) +
              "..." +
              address.slice(address.length - 4, address.length)}
          </Box>
        </Box>
        {click === "email" ? (
          <Box
            component="form"
            onSubmit={handleUpdate}
            mt={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              name="email"
              required
              id="email"
              defaultValue={email}
              autoFocus
              size="small"
              sx={{ mt: 0.1 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: "1rem",
                "&: hover": {
                  bgcolor: "white",
                  color: "#000",
                  height: "100%",
                },
              }}
            >
              수정
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Typography
              onDoubleClick={() => {
                setClick("email");
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {email}
            </Typography>
          </Box>
        )}
        {click === "desc" ? (
          <Box
            component="form"
            onSubmit={handleUpdate}
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              name="desc"
              required
              id="desc"
              multiline
              rows={2}
              defaultValue={desc}
              autoFocus
              sx={{ fontSize: 20, width: 250 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: 3,
                "&: hover": {
                  bgcolor: "white",
                  color: "#000",
                  height: "100%",
                },
              }}
            >
              수정
            </Button>
          </Box>
        ) : (
          <Box
            onDoubleClick={() => {
              setClick("desc");
            }}
            sx={{
              mt: 2,
              height: 70,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography>{desc}</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
