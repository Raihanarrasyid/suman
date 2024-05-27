import { Box, TextField } from "@mui/material";

const Address = () => {
  return (
    <div className="container mx-auto my-10">
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      >
        <TextField
          fullWidth
          type="text"
          label="First Name"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Last Name"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Country"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Street Address"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Street Address 2 (optional)"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="text"
          label="City"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="text"
          label="State"
          sx={{ gridColumn: "1fr" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Zip Code"
          sx={{ gridColumn: "1fr" }}
        />
      </Box>
    </div>
  );
};

export default Address;
