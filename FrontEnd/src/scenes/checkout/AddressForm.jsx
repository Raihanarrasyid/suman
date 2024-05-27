import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios"; // Impor Axios
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const AddressForm = () => {
  const { API } = useAuth();
  const token = localStorage.getItem("token");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      detailAddress: {
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
      },
    },
    validationSchema: Yup.object().shape({
      detailAddress: Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        country: Yup.string().required("Country is required"),
        street1: Yup.string().required("Street Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zipCode: Yup.string().required("Zip Code is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
      }),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          `${API}/address`,
          {
            detailAddress: values.detailAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSubmitting(false);
        setTimeout(() => {
          navigate("/address");
        }, 2000);
      } catch (error) {
        // Tangani kesalahan jika ada
        console.error("Error sending data:", error);

        // Set isSubmitting menjadi false saat terjadi kesalahan
        setSubmitting(false);
      }
    },
  });

  if (token) {
    return (
      <Box>
        <Box className="mx-auto my-5 w-4/5">
          <Typography
            variant="h3"
            sx={{ gridColumn: "span 4", fontWeight: "bold" }}
          >
            Add New Address
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box
            className="mx-auto my-5 w-4/5"
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              type="text"
              label="First Name"
              name="detailAddress.firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.firstName}
              sx={{ gridColumn: "span 2" }}
              error={
                formik.touched.detailAddress?.firstName &&
                Boolean(formik.errors.detailAddress?.firstName)
              }
              helperText={
                formik.touched.detailAddress?.firstName &&
                formik.errors.detailAddress?.firstName
              }
            />
            <TextField
              fullWidth
              type="text"
              label="Last Name"
              name="detailAddress.lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.lastName}
              sx={{ gridColumn: "span 2" }}
              error={
                formik.touched.detailAddress?.lastName &&
                Boolean(formik.errors.detailAddress?.lastName)
              }
              helperText={
                formik.touched.detailAddress?.lastName &&
                formik.errors.detailAddress?.lastName
              }
            />
            <TextField
              fullWidth
              type="text"
              label="Country"
              name="detailAddress.country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.country}
              sx={{ gridColumn: "span 4" }}
              error={
                formik.touched.detailAddress?.country &&
                Boolean(formik.errors.detailAddress?.country)
              }
              helperText={
                formik.touched.detailAddress?.country &&
                formik.errors.detailAddress?.country
              }
            />
            <TextField
              fullWidth
              type="text"
              label="Street Address"
              name="detailAddress.street1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.street1}
              sx={{ gridColumn: "span 2" }}
              error={
                formik.touched.detailAddress?.street1 &&
                Boolean(formik.errors.detailAddress?.street1)
              }
              helperText={
                formik.touched.detailAddress?.street1 &&
                formik.errors.detailAddress?.street1
              }
            />
            <TextField
              fullWidth
              type="text"
              label="Street Address 2 (optional)"
              name="detailAddress.street2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.street2}
              sx={{ gridColumn: "span 2" }}
              error={
                formik.touched.detailAddress?.street2 &&
                Boolean(formik.errors.detailAddress?.street2)
              }
              helperText={
                formik.touched.detailAddress?.street2 &&
                formik.errors.detailAddress?.street2
              }
            />
            <TextField
              fullWidth
              type="text"
              label="City"
              name="detailAddress.city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.city}
              sx={{ gridColumn: "span 2" }}
              error={
                formik.touched.detailAddress?.city &&
                Boolean(formik.errors.detailAddress?.city)
              }
              helperText={
                formik.touched.detailAddress?.city &&
                formik.errors.detailAddress?.city
              }
            />
            <TextField
              fullWidth
              type="text"
              label="State"
              name="detailAddress.state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.state}
              sx={{ gridColumn: "1fr" }}
              error={
                formik.touched.detailAddress?.state &&
                Boolean(formik.errors.detailAddress?.state)
              }
              helperText={
                formik.touched.detailAddress?.state &&
                formik.errors.detailAddress?.state
              }
            />
            <TextField
              fullWidth
              type="text"
              label="Zip Code"
              name="detailAddress.zipCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.zipCode}
              sx={{ gridColumn: "1fr" }}
              error={
                formik.touched.detailAddress?.zipCode &&
                Boolean(formik.errors.detailAddress?.zipCode)
              }
              helperText={
                formik.touched.detailAddress?.zipCode &&
                formik.errors.detailAddress?.zipCode
              }
            />

            <TextField
              fullWidth
              type="tel"
              label="Phone Number"
              inputMode="tel"
              name="detailAddress.phoneNumber"
              onChange={(e) => {
                // Memastikan hanya angka yang diperbolehkan
                const numericValue = e.target.value.replace(/\D/g, "");
                formik.handleChange({
                  target: {
                    name: "detailAddress.phoneNumber",
                    value: numericValue,
                  },
                });
              }}
              onBlur={formik.handleBlur}
              value={formik.values.detailAddress.phoneNumber}
              sx={{ gridColumn: "span 2" }}
              error={
                formik.touched.detailAddress?.phoneNumber &&
                Boolean(formik.errors.detailAddress?.phoneNumber)
              }
              helperText={
                formik.touched.detailAddress?.phoneNumber &&
                formik.errors.detailAddress?.phoneNumber
              }
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ gridColumn: "span 4" }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Save Address"}
            </Button>
          </Box>
        </form>
      </Box>
    );
  } else {
    return (
      <>
        <div className="container mx-auto my-2">
          <Box
            width="80%"
            margin="80px auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <Alert severity="error" style={{ maxWidth: "100%" }}>
              You are not logged in.
            </Alert>
            <Typography variant="h5" className="my-2">
              Redirecting to the login page...
            </Typography>
          </Box>
        </div>
        {setTimeout(() => {
          navigate("/login"); // Navigasi ke halaman login setelah sejumlah detik
        }, 2000)}
      </>
    );
  }
};

export default AddressForm;
