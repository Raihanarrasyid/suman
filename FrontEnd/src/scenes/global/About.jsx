import React from "react";
import { Box } from "@mui/system";
import { Card, CardContent, Typography } from "@mui/material";

const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets/history", false, /\.(png|jpe?g|svg)$/)
);

const motifs = [
  {
    name: "Motif Biji Pala",
    description:
      "Motif ini dahulunya terinspirasi dari Bambu rempah yang mana diangkat dari tumbuhakn biji Pala yang melambangkan kekuasaan/ketua.",
  },
  {
    name: "Motif Papan",
    description:
      "Motif papan ini diangkat dari legenda seorang Petani zaman dahulu membuat papan/kayu dengan cara ditarah untuk sebagai alat/bahan untuk membuat rumah yang artinya perlindungan",
  },
  {
    name: "Motif Angso Belago",
    description:
      "Artinya. Melambangkan komering itu kesannya kasar tapi berhati baik",
  },
  {
    name: "Motif Singkok Jala",
    description:
      "Diangkat dari mata pencaharian zaman dulu. Sering menangkap ikan dengan alat jala. Melambangkan satu suku yang kompak",
  },
];

const About = () => {
  return (
    <>
      <Box className="flex flex-col items-center justify-center">
        <Typography
          variant="h3"
          className="text-center"
          fontWeight={700}
          style={{ marginTop: "20px" }}
        >
          Historical Guide
        </Typography>
      </Box>
      <Box className="my-5 flex flex-col items-center justify-center w-4/5 mx-auto gap-5">
        <Box className="card-side card glass p-5 flex justify-between items-center">
          <img src={heroTextureImports["Biji Pala.png"]} className="w-1/2" />
          <Box className="flex flex-col gap-3 w-1/2">
            <Typography variant="h4" fontWeight={700}>
              {motifs[0].name}
            </Typography>
            <Typography variant="body1">{motifs[0].description}</Typography>
          </Box>
        </Box>
        <Box className="card card-side glass p-5 flex justify-between items-center">
          <Box className="flex flex-col gap-3 w-1/2">
            <Typography variant="h4" fontWeight={700}>
              {motifs[1].name}
            </Typography>
            <Typography variant="body1">{motifs[1].description}</Typography>
          </Box>
          <img src={heroTextureImports["Papan.png"]} className="w-1/2" />
        </Box>
      </Box>
      <Box className="my-5 flex flex-col items-center justify-center w-4/5 mx-auto gap-5">
        <Box className="card-side card glass p-5 flex justify-between items-center">
          <img src={heroTextureImports["Angso Belago.png"]} className="w-1/2" />
          <Box className="flex flex-col gap-3 w-1/2">
            <Typography variant="h4" fontWeight={700}>
              {motifs[2].name}
            </Typography>
            <Typography variant="body1">{motifs[2].description}</Typography>
          </Box>
        </Box>
        <Box className="card card-side glass p-5 flex justify-between items-center">
          <Box className="flex flex-col gap-3 w-1/2">
            <Typography variant="h4" fontWeight={700}>
              {motifs[3].name}
            </Typography>
            <Typography variant="body1">{motifs[3].description}</Typography>
          </Box>
          <img src={heroTextureImports["Singkok Jala.png"]} className="w-1/2" />
        </Box>
      </Box>
    </>
  );
};

export default About;
