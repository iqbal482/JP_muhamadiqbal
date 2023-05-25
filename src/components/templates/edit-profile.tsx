import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Copyright } from "@organisms";
import { Link } from "@mui/material";
// import { LinkOff } from "@mui/icons-material";

type EditProfileViewType = {
  onEditProfile: (e: any) => void;
  csrfToken: string;
  error?: string;
  profile: any;
};

export const EditProfileView = ({
  onEditProfile,
  csrfToken,
  error,
  profile,
}: EditProfileViewType) => {
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
          Edit Profile
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form
            action="/api/auth/callback/credentials"
            method="post"
            onSubmit={onEditProfile}
          >
            <input type={"hidden"} name={"csrfToken"} value={csrfToken} />
            <TextField
              margin="normal"
              defaultValue={profile?.nik || ""}
              required
              fullWidth
              id="nik"
              label="NIK"
              name="nik"
              autoComplete="nik"
              autoFocus
              // value="oratoreeza@gmail.com"
            />
            <TextField
              margin="normal"
              defaultValue={profile?.name || ""}
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
              defaultValue={profile?.phone || ""}
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="phone"
              id="phone"
              autoComplete="current-password"
              // value="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
            <Link sx={{display:"flex", justifyContent:"center", mt:2}} href="/profile" variant="body2">Kembali</Link>
          </form>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};
