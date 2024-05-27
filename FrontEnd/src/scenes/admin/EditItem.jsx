import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { Alert, Typography } from "@mui/material";
import axios from "axios"; // Import Axios
import { animateScroll as scroll } from "react-scroll";
import { useParams } from "react-router-dom";

const EditItem = () => {
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi
  const { checkAdminPermission, isAdmin, loading, API } = useAuth(); // Gunakan checkAdminPermission dari useAuth
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState(0);
  const token = localStorage.getItem("token");
  const [urlFile, setUrlFile] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  let fileInputRef; // Deklarasikan variabel fileInputRef di sini

  useEffect(() => {
    if (!isAdmin) {
      checkAdminPermission(); // Gunakan checkAdminPermission untuk memeriksa apakah user adalah admin
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(`${API}/products/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.status === 200) {
                setName(response.data.product.name);
                setDescription(response.data.product.description);
                setPrice(response.data.product.price);
                setUrlFile(`${API}${response.data.product.pictureUrl}`);
                setLongDescription(response.data.product.longDescription);
              }
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Perbarui file dengan file yang dipilih
    setUrlFile(URL.createObjectURL(e.target.files[0])); // Perbarui file dengan URL dari file yang dipilih
  };
  const handleDeleteFile = (e) => {
    setFile(""); // Hapus file dengan mengosongkan URL
  };

  const handleSelectFileClick = () => {
    fileInputRef.click(); // Buka jendela pemilihan file ketika tombol "Select File" diklik
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", file); // File akan dikirim sebagai bagian dari FormData
      formData.append("longDescription", longDescription);

      const response = await axios.put(`${API}/admin/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Atur header untuk FormData
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Product saved successfully");
        // Di sini Anda bisa menavigasi ke halaman lain atau menampilkan pesan berhasil
        setSuccess(true);
        scroll.scrollToTop({
          duration: 1000, // Durasi animasi dalam milidetik
          smooth: "easeInOutQuart", // Jenis animasi (opsi tersedia)
        });
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setError("An error occurred. Please try again.");
        // Di sini Anda bisa menampilkan pesan kesalahan kepada pengguna
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      // Di sini Anda bisa menampilkan pesan kesalahan kepada pengguna
    }
  };

  // ...

  if (loading) {
    return <div>Loading...</div>;
  } else if (isAdmin) {
    return (
      <div className="container mx-auto my-10">
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <Box sx={{ gridColumn: "span 4" }}>
            <Box className="flex justify-center">
              <Box className="flex flex-col gap-4">
                {success ? (
                  <Alert severity="success" className="fade-in-fade-out flex-1">
                    Product saved successfully! Redirecting to admin page...
                  </Alert>
                ) : (
                  error && (
                    <Alert severity="error" className="fade-in-fade-out">
                      {error}
                    </Alert>
                  )
                )}
                <img
                  src={urlFile}
                  alt="Input File"
                  className={`w-96 h-96 object-contain ${
                    file ? "" : "border-2 border-gray-400"
                  }`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                />
                <Box className="flex flex-row gap-3">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleFileChange}
                    ref={(input) => (fileInputRef = input)}
                  />
                  <Button
                    variant="contained"
                    className="glass"
                    style={{ flex: 1 }}
                    onClick={handleSelectFileClick}
                  >
                    Select File
                  </Button>
                  <Button
                    variant="contained"
                    className="glass"
                    onClick={handleDeleteFile}
                    style={{ flex: 1 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <TextField
            fullWidth
            type="text"
            label="Name"
            sx={{ gridColumn: "span 4" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            type="text"
            label="Summary"
            sx={{ gridColumn: "span 4" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            className="w-full h-40 border rounded-md p-2 text-lg"
            placeholder="Description"
            style={{
              fontFamily: "inherit", // Gunakan font yang sama dengan TextField
              fontSize: "inherit", // Gunakan ukuran font yang sama dengan TextField
              gridColumn: "span 4",
              backgroundColor: "transparent",
            }}
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          />
          <Box sx={{ gridColumn: "span 4" }}>
            <TextField
              className=""
              type="number"
              label="Price"
              value={price}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                if (!isNaN(newValue) && newValue >= 0) {
                  setPrice(newValue);
                }
              }}
            />
          </Box>
          <Button
            variant="contained"
            className="glass"
            onClick={handleSubmit} // Memanggil fungsi handleSubmit saat tombol "Submit" diklik
            style={{
              gridColumn: "span 4",
            }}
          >
            Submit
          </Button>
        </Box>
      </div>
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
              You are not authorized to access this page.
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

export default EditItem;
