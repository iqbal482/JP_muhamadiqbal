import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Copyright } from "@organisms";
import Link from "@mui/material/Link";
import { Container } from "@mui/system";

type SignUpViewType = {
  onForgotPassword: () => void;
  onSignUp: (e: any) => void;
  csrfToken: string;
  error?: string;
  cekPassword: () => void;
};

export const SignUpView = ({
  onForgotPassword,
  onSignUp,
  csrfToken,
  error,
  cekPassword,
}: SignUpViewType) => {
  return (
    <>
      <CssBaseline />
      {error && <Box>{error}</Box>}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form
            action="/api/auth/callback/credentials"
            method="post"
            onSubmit={onSignUp}
          >
            <input type={"hidden"} name={"csrfToken"} value={csrfToken} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              // value="oratoreeza@gmail.com"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type={"email"}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              // value="oratoreeza@gmail.com"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // value="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>

            <Container
              sx={{ display: "flex", justifyContent: "center", mt:2 }}>
              Sudah memiliki akun ?
              <Link href="/auth/sign-in" variant="body2">Login Disini</Link>
            </Container>
          </form>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};
