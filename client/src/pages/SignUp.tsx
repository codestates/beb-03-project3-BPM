import {
  Container,
  CssBaseline,
  Stack,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, unsetUser } from "../modules/userReducer";

export default function SignUp() {
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validation, setValidation] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("username") === "") {
      setValidation("닉네임을 입력해주세요");
    } else if (formData.get("email") === "") {
      setValidation("이메일을 입력해주세요");
    } else {
      axios
        .post("http://localhost:4000/user/signup", {
          address: userInfo.address,
          username: formData.get("username"),
          email: formData.get("email"),
        })
        .then((res) => {
          dispatch(unsetUser());
          dispatch(setUser(res.data.data));
          setValidation("");
          navigate("/signin");
        })
        .catch((e) => {
          if (e.message === "Request failed with status code 404") {
            setValidation("로그인부터 다시 진행해주세요");
          } else if (e.message === "Request failed with status code 400") {
            setValidation("중복된 닉네임 입니다.");
          }
        });
    }
  };

  return (
    <Stack
      sx={{
        bgcolor: "#111",
        height: "100vh",
      }}
    >
      <Container sx={{ bgcolor: "#111" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            fontSize="5rem"
            // fontFamily='Copperplate'
            // fontFamily='Papyrus'
            // fontFamily='Lucida Handwriting'
            // fontFamily='Monaco'
            // fontFamily='cursive'
            // fontFamily='fantasy'
            // fontFamily='Tahoma'
            // fontFamily='Teko'
            // fontFamily='Play'
            // fontFamily='Great Vibes'
            fontFamily="Sacramento"
            sx={{
              color: "#fff",
              textAlign: "center",
            }}
            mb={10}
          >
            Better Paricipation in Music
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, border: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="닉네임"
                  autoFocus
                  sx={{
                    bgcolor: "darkviolet",
                    "& label.Mui-focused": {
                      color: "yellow",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "yellow",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        // borderColor: 'white',
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "yellow",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  sx={{
                    bgcolor: "darkviolet",
                    "& label.Mui-focused": {
                      color: "yellow",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "yellow",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        // borderColor: 'white',
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "yellow",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                p: 2,
                fontSize: "1.2rem",
                bgcolor: "darkviolet",
                "&: hover": {
                  bgcolor: "white",
                  color: "#000",
                },
              }}
            >
              회원가입
            </Button>

            <Grid>
              <Typography sx={{ color: "red", fontSize: 20, mt: 2 }}>
                {validation}
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
}
