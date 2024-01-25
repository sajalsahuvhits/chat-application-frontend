import React, { useState } from "react";
import Index from "../../../components/Index";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "../../../validation/Validation";
import { postApiHandler } from "../../../config/DataService";
import { UserApiEndpoint } from "../../../config/Api";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const res = await postApiHandler(UserApiEndpoint.REGISTER_USER, values);
    if (res.status === 200 || res.status === 201) {
      toast.success("Registration Successfull");
      navigate("/login");
    } else {
      toast.error(res.data.message);
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
          Sign up
        </Index.Typography>
        <Index.Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Index.Grid container spacing={2}>
            <Index.Grid item xs={12} sm={12}>
              <Index.TextField
                autoComplete="given-name"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                className={`${errors?.name ? "" : "mb-4"}`}
                {...register("name")}
                error={!!errors?.name}
                helperText={errors?.name?.message}
              />
            </Index.Grid>
            <Index.Grid item xs={12}>
              <Index.TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                className={`${errors?.email ? "" : "mb-4"}`}
                {...register("email")}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            </Index.Grid>
            <Index.Grid item xs={12}>
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
            </Index.Grid>
            <Index.Grid item xs={12}>
              <Index.FormControl
                variant="outlined"
                fullWidth
                className={`${errors?.confirmPassword ? "" : "mb-4"}`}
              >
                <Index.InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </Index.InputLabel>
                <Index.OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmPassword ? "text" : "password"}
                  // fullWidth
                  required
                  endAdornment={
                    <Index.InputAdornment position="end">
                      <Index.IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword((show) => !show)}
                        edge="end"
                      >
                        {/* {showPassword ? <Index.VisibilityOffIcon /> : <Index.VisibilityIcon />} */}
                      </Index.IconButton>
                    </Index.InputAdornment>
                  }
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  error={!!errors?.confirmPassword}
                />
                <small className="css-1wc848c-MuiFormHelperText-root text-danger">
                  {errors?.confirmPassword?.message}
                </small>
              </Index.FormControl>
            </Index.Grid>
          </Index.Grid>
          <Index.Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Index.Button>
          <Index.Grid container justifyContent="flex-end">
            <Index.Grid item>
              <NavLink to="/login">Already have an account? Sign in</NavLink>
            </Index.Grid>
          </Index.Grid>
        </Index.Box>
      </Index.Box>
    </Index.Container>
  );
}
