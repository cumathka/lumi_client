import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import Halil from "../assets/Halil_K.jpeg";
import Cuma from "../assets/Cuma.jpeg";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";
import { CardActionArea, Link } from "@mui/material";
export default function About() {
  const { t } = useTranslation();
  const cards = [
    {
      name: "Halil Kömürcü",
      title: t('fullStack'),
      img: Halil,
      mail: "halilkom180@gmail.com",
      mailto: "mailto:halilkom180@gmail.com",
      id: 1,
      linkedIn:'https://www.linkedin.com/in/halil-k%C3%B6m%C3%BCrc%C3%BC-882051227'
    },
    {
      name: "Cuma Kaya",
      title: t('fullStack'),
      img: Cuma,
      mail: "cumakaya24@hotmail.com",
      mailto: "mailto:cumakaya24@hotmail.com",
      id: 2,
      linkedIn:'https://www.linkedin.com/in/cuma-kaya-b8124018a'
    },
  ];
  return (
    <>
      <CssBaseline />
      <>
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography variant='h3' color='whitesmoke'>
            <Typewriter
              options={{
                strings: [ t('welcome'), 'LUMI'],
                autoStart: true,
                loop: true,
              }}
            />
            </Typography>
            <Typography
              variant="h3"
              align="center"
              color="text.secondary"
              paragraph
            >
             {t('whatIsLumi')}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="whitesmoke"
              paragraph
            >
              {t('goal')}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ pb: 4 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={6}>
                <Card
                  elevation={13}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                <CardActionArea sx={{ height: "100%" }} >
                <a href={card.linkedIn}  target="_blank" rel="noreferrer" >
                  <CardMedia
                    component="img"
                    sx={{ height: "100%" }}
                    image={card.img}
                    alt="random"
                  />
                  </a>
                  </CardActionArea>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.title}</Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <ContactMailIcon sx={{ fontSize: "300%", p: 1 }} />{" "}
                      <Link href={card.mailto} style={{ color: "#e9723d" }} underline='hover'>
                        <b>{card.mail}</b>
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
               <Grid item xs={12} sm={12} md={12}>
                <Typography variant='h4'>
                  {t('thanks')}
                </Typography>
                <Link href="https://hicoders.ch/"  underline='hover' color='ButtonShadow' target="_blank">
                  {'Hicoders.ch'}
                  </Link>
                <Typography variant='subtitle1'>
                 {t('enes')}: Enes Hirka
                </Typography>
               </Grid>
          </Grid>
        </Container>
      </>
      <Footer />
    </>
  );
}
