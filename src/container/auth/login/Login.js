import React, { useState } from "react";
import Index from "../../../components/Index";
import { NavLink, useNavigate } from "react-router-dom";
import { postApiHandler } from "../../../config/DataService";
import { UserApiEndpoint } from "../../../config/Api";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../validation/Validation";
import { GetContext } from "../../../appContext/AppContext";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = GetContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const res = await postApiHandler(UserApiEndpoint.USER_LOGIN, values);
    if (res.status === 200) {
      localStorage.setItem("authorization", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success(res.message);
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Index.Container component="main" maxWidth="xs">
      <Index.CssBaseline />
      <Index.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Index.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <Index.LockOutlinedIcon />
        </Index.Avatar>
        <Index.Typography component="h1" variant="h5">
          Sign in
        </Index.Typography>
        <Index.Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Index.TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className={`${errors?.email ? "" : "mb-4"}`}
            {...register("email")}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
          <Index.FormControl
            variant="outlined"
            fullWidth
            className={`${errors?.password ? "" : "mb-4"}`}
          >
            <Index.InputLabel htmlFor="outlined-adornment-password">
              Password
            </Index.InputLabel>
            <Index.OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              // fullWidth
              required
              endAdornment={
                <Index.InputAdornment position="end">
                  <Index.IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? (
                      <Index.VisibilityOff />
                    ) : (
                      <Index.Visibility />
                    )}
                  </Index.IconButton>
                </Index.InputAdornment>
              }
              autoComplete="current-password"
              label="Password"
              {...register("password")}
              error={!!errors?.password}
            />
            <small className="css-1wc848c-MuiFormHelperText-root text-danger">
              {errors?.password?.message}
            </small>
          </Index.FormControl>
          <Index.Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Index.Button>
          <Index.Grid container>
            <Index.Grid item xs>
              {/* <NavLink href="#" >
                  Forgot password?
                </NavLink> */}
            </Index.Grid>
            <Index.Grid item>
              <NavLink to="/register">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Index.Grid>
          </Index.Grid>
        </Index.Box>
      </Index.Box>
    </Index.Container>
  );
}
