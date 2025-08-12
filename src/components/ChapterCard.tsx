import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  CheckCircle as CompletedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ChapterCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  progress?: number;
  isCompleted?: boolean;
  topics: string[];
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  id,
  title,
  description,
  duration,
  difficulty,
  progress = 0,
  isCompleted = false,
  topics,
}) => {
  const navigate = useNavigate();

  const handleStartChapter = () => {
    navigate(`/chapter/${id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'success';
      case 'Intermédiaire':
        return 'warning';
      case 'Avancé':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {isCompleted && (
            <CompletedIcon color="success" />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={difficulty}
            size="small"
            color={getDifficultyColor(difficulty) as any}
            variant="outlined"
          />
          <Chip
            label={duration}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Sujets couverts :
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {topics.map((topic, index) => (
              <Chip
                key={index}
                label={topic}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        </Box>

        {progress > 0 && !isCompleted && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Progression : {Math.round(progress)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
              }}
            />
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant={isCompleted ? "outlined" : "contained"}
          color="primary"
          fullWidth
          startIcon={isCompleted ? <CompletedIcon /> : <StartIcon />}
          onClick={handleStartChapter}
        >
          {isCompleted ? 'Revoir' : progress > 0 ? 'Continuer' : 'Commencer'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ChapterCard;