import { Input } from "@components/atoms/input";
// import { Password } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Copyright } from "@organisms";
import { useState } from "react";

type ForgotPasswordViewType = {
  onSignIn: () => void;
  onForgotPassword: (email: string, otp: string) => void;
  onSignUp: () => void;
  error?: string;
  cekPassword: () => void;
  sendOtp: (email: string) => void;
  resetPassword: (email: string, otp: string, password: string, confirmPassword: string) => void;
  reset: boolean
};

export const ForgotPasswordView = ({
  onSignIn,
  onForgotPassword,
  onSignUp,
  error,
  cekPassword,
  sendOtp,
  resetPassword,
  reset,
} : ForgotPasswordViewType) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {error && <Box>{error}</Box>}
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      {!reset && (
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
      )}
      {reset && (
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
      )}
      <Box sx={{ mt: 1, width: "100%" }}>
        <form action="/api/auth/callback/credentials" method="post">
          {reset && (
            <>
              <TextField
                onChange={(e: any) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                type="password"
                name="password"
                autoComplete="password"
              />
              <TextField
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="password"
                label="Confirm Password"
                type="password"
                name="confirm_password"
                autoComplete="password"
              />
              <Button
                onClick={() => {
                  resetPassword(email, otp, password, confirmPassword);
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </>
          )}
          {!reset && (
            <div>
              <Box className="wrapper">
                <Input
                  onChange={(e: any) => setEmail(e.target.value)}
                  sx={{ flex: 1 }}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email Address"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  // value="oratoreeza@gmail.com"
                />
                <Button
                  onClick={() => {
                    setShow(true);
                    sendOtp(email);
                  }}
                  disabled={email === ""}
                  className="btn-custom"
                  size="small"
                  variant="contained"
                >
                  Send OTP
                </Button>
              </Box>
              {show && (
                <Input
                  onChange={(e: any) => setOtp(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  name="Kode Verifikasi"
                  label="Kode Verifikasi"
                  type="Kode Verifikasi"
                  id="Kode Verifikasi"
                  autoComplete="Kode Verifikasi"
                  // value="password"
                />
              )}

              <Button
                disabled={otp === ""}
                onClick={() => {
                  onForgotPassword(email, otp);
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </div>
          )}
        </form>

        <Link
          sx={{ display: "flex", justifyContent: "center" }}
          href="/auth/sign-in"
          variant="body2"
        >
          Kembali
        </Link>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
};
