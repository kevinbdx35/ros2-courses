import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import {
  School as SchoolIcon,
  Rocket as RocketIcon,
  Code as CodeIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { ChapterCard } from '../components';
import chaptersData from '../data/chaptersData';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Apprentissage Progressif',
      description: 'Progression étape par étape depuis l\'installation jusqu\'aux concepts avancés',
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Exemples Pratiques',
      description: 'Code complet et fonctionnel avec explications détaillées',
    },
    {
      icon: <RocketIcon sx={{ fontSize: 40 }} />,
      title: 'Exercices Interactifs',
      description: 'Quiz et simulations pour valider vos connaissances',
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: 'Suivi de Progression',
      description: 'Gardez une trace de votre avancement à travers les chapitres',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          p: { xs: 4, md: 6 },
          mb: 6,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
          }}
        >
          Apprendre ROS 2 Interactivement
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          sx={{
            opacity: 0.9,
            mb: 4,
            fontSize: { xs: '1.1rem', md: '1.5rem' },
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Maîtrisez ROS 2 depuis les bases jusqu'aux concepts avancés avec 
          des exercices pratiques et des exemples concrets
        </Typography>
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' },
              px: 4,
              py: 1.5,
            }}
            href="#chapters"
          >
            Commencer l'apprentissage
          </Button>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip label="5 Chapitres" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
            <Chip label="~4h de contenu" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
            <Chip label="Exercices pratiques" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
          </Box>
        </Stack>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Pourquoi cette plateforme ?
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
                elevation={2}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Chapters Section */}
      <Box id="chapters">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Parcours d'Apprentissage
        </Typography>
        
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Suivez notre parcours structuré pour maîtriser ROS 2 progressivement,
          des concepts de base aux techniques avancées.
        </Typography>
        
        <Grid container spacing={4}>
          {chaptersData.map((chapter) => (
            <Grid item xs={12} sm={6} lg={4} key={chapter.id}>
              <ChapterCard
                id={chapter.id}
                title={chapter.title}
                description={chapter.description}
                duration={chapter.duration}
                difficulty={chapter.difficulty}
                topics={chapter.topics}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Paper
        sx={{
          mt: 8,
          p: { xs: 4, md: 6 },
          textAlign: 'center',
          backgroundColor: 'grey.50',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Prêt à commencer ?
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: '500px', mx: 'auto' }}
        >
          Commencez dès maintenant votre parcours d'apprentissage ROS 2 
          avec notre premier chapitre sur l'installation et la configuration.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          href="/chapter/1"
          sx={{ px: 4, py: 1.5 }}
        >
          Commencer le Chapitre 1
        </Button>
      </Paper>
    </Box>
  );
};

export default HomePage;