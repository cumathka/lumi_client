import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuCard from './MenuCard';
import { Container } from '@mui/material';
import quizAnimation from "../animations/quiz.json"
import startAnimation from "../animations/start.json"
import oneVsOne from "../animations/oneVone.json"
import Podium from "../animations/podium.json"
import manageAnimation from "../animations/manage.json"
import  {useTranslation} from 'react-i18next'
import "../translations/i18n"

export default function FullWidthGrid() {
  const { t } = useTranslation();
  const menuCardContent = [
    { title: t('title'),
      text: t('titleCreateText'), 
      path: '/create' ,
      img:"/jhn.png", 
      xs:12,
      md:3,
      sm:6,
      id:1,
      animation:{
        loop: true,
        autoplay: true, 
        animationData: quizAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
    },
    { 
      title:t('titlePlay'),
      text: t('textPlay'), 
      path: '/browsequizzes' ,
      img:"/jhn.png", 
      xs:12,
      md:9,
      sm:6,
      id:2,
      animation:{
        loop: true,
        autoplay: true, 
        animationData: startAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
    },
    {  title:t('titleDuell'),
      text: t('textDuell'), 
      path: '/comingSoon' ,
      img:"/jhn.png", 
      xs:12,
      md:7,
      sm:6,
      id:3,
      animation:{
        loop: true,
        autoplay: true, 
        animationData: oneVsOne,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
    },
    { 
      title:t('titleTournament'),
      text: t('textTournament'), 
      path: '/comingSoon' ,
      img:"/jhn.png", 
      xs:12,
      md:5,
      sm:6,
      id:4,
      animation:{
        loop: true,
        autoplay: true, 
        animationData: Podium,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
    },
    { 
      title:t('titleManage'),
      text:t('textManage'), 
      img:"/logo512.png", 
      path: '/settings' ,
      xs:12,
      md:12,
      sm:12,
      id:5,
      animation:{
        loop: true,
        autoplay: true, 
        animationData: manageAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
    },
  ];
  return (
    <Container>
    <Box>
      <Grid container spacing={2}>
        {menuCardContent.map((cardContent) => (
        <Grid key={cardContent.id} item xs={cardContent.xs} md={cardContent.md} sm={cardContent.sm}  >
                  <MenuCard   {...cardContent}/>
        </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
  );
}
