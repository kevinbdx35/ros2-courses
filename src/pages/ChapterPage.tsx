import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Stack,
  Alert,
  Fab,
  Collapse,
  LinearProgress,
} from '@mui/material';
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { CodeBlock, Quiz } from '../components';
import chaptersData, { ChapterData } from '../data/chaptersData';

const ChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  
  const chapter: ChapterData | undefined = chaptersData.find(
    (ch) => ch.id === parseInt(chapterId || '1')
  );

  useEffect(() => {
    if (!chapter) {
      navigate('/');
      return;
    }
  }, [chapter, navigate]);

  if (!chapter) {
    return null;
  }

  const handleNext = () => {
    if (activeStep < chapter.content.sections.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const markStepCompleted = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  };

  const progress = (completedSteps.size / chapter.content.sections.length) * 100;

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

  const nextChapter = chaptersData.find(ch => ch.id === chapter.id + 1);
  const prevChapter = chaptersData.find(ch => ch.id === chapter.id - 1);

  return (
    <Box>
      {/* Chapter Header */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.05) 100%)',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            color: 'primary.main',
          }}
        >
          {chapter.title}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}
        >
          {chapter.content.introduction}
        </Typography>
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={chapter.difficulty}
              color={getDifficultyColor(chapter.difficulty) as any}
              variant="outlined"
            />
            <Chip label={chapter.duration} variant="outlined" />
            <Chip label={`${chapter.content.sections.length} sections`} variant="outlined" />
          </Stack>
          
          <Button
            variant="outlined"
            onClick={() => setShowTableOfContents(!showTableOfContents)}
            endIcon={showTableOfContents ? <CollapseIcon /> : <ExpandIcon />}
          >
            Table des matières
          </Button>
        </Stack>

        {/* Progress Bar */}
        {completedSteps.size > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Progression : {Math.round(progress)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}

        {/* Table of Contents */}
        <Collapse in={showTableOfContents}>
          <Paper
            variant="outlined"
            sx={{ mt: 3, p: 2, backgroundColor: 'background.default' }}
          >
            <Typography variant="h6" gutterBottom>
              Contenu du chapitre
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              {chapter.content.sections.map((section, index) => (
                <Box
                  component="li"
                  key={section.id}
                  sx={{
                    mb: 1,
                    cursor: 'pointer',
                    color: activeStep === index ? 'primary.main' : 'text.primary',
                    fontWeight: activeStep === index ? 600 : 400,
                    '&:hover': { color: 'primary.main' },
                  }}
                  onClick={() => handleStepClick(index)}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <span>{section.title}</span>
                    {completedSteps.has(index) && (
                      <CheckIcon color="success" sx={{ fontSize: 16 }} />
                    )}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Paper>
        </Collapse>
      </Paper>

      {/* Chapter Content */}
      <Stepper activeStep={activeStep} orientation="vertical">
        {chapter.content.sections.map((section, index) => (
          <Step key={section.id} completed={completedSteps.has(index)}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              sx={{ cursor: 'pointer' }}
            >
              <Typography variant="h6" component="h2">
                {section.title}
              </Typography>
            </StepLabel>
            <StepContent>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 2,
                  borderRadius: 2,
                }}
                elevation={1}
              >
                <Typography
                  variant="body1"
                  sx={{ mb: 3, lineHeight: 1.7, fontSize: '1rem' }}
                >
                  {section.content}
                </Typography>

                {section.codeExample && (
                  <CodeBlock
                    code={section.codeExample.code}
                    language={section.codeExample.language}
                    title={section.codeExample.title}
                    description={section.codeExample.description}
                  />
                )}

                {section.quiz && (
                  <Quiz
                    question={section.quiz.question}
                    options={section.quiz.options}
                    explanation={section.quiz.explanation}
                    title={`Quiz - Section ${index + 1}`}
                  />
                )}

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    startIcon={<PrevIcon />}
                  >
                    Précédent
                  </Button>
                  
                  <Button
                    variant="contained"
                    onClick={() => {
                      markStepCompleted(index);
                      if (!completedSteps.has(index)) {
                        setTimeout(() => handleNext(), 500);
                      } else {
                        handleNext();
                      }
                    }}
                    endIcon={activeStep === chapter.content.sections.length - 1 ? 
                      <CheckIcon /> : <NextIcon />}
                  >
                    {completedSteps.has(index) 
                      ? (activeStep === chapter.content.sections.length - 1 ? 'Terminé' : 'Suivant')
                      : 'Marquer comme lu'}
                  </Button>
                </Stack>
              </Paper>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {/* Chapter Completion */}
      {completedSteps.size === chapter.content.sections.length && (
        <Alert
          severity="success"
          sx={{ mt: 4, mb: 4 }}
          action={
            <Button color="inherit" size="small">
              Voir les statistiques
            </Button>
          }
        >
          <Typography variant="h6" gutterBottom>
            Félicitations ! Chapitre terminé
          </Typography>
          <Typography variant="body2">
            Vous avez complété toutes les sections de ce chapitre. 
            {nextChapter && " Vous pouvez maintenant passer au chapitre suivant."}
          </Typography>
        </Alert>
      )}

      {/* Chapter Navigation */}
      <Paper
        sx={{
          p: 3,
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          {prevChapter && (
            <Button
              variant="outlined"
              onClick={() => navigate(`/chapter/${prevChapter.id}`)}
              startIcon={<PrevIcon />}
              sx={{ mb: { xs: 1, sm: 0 } }}
            >
              {prevChapter.title}
            </Button>
          )}
        </Box>
        
        <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
          {nextChapter && (
            <Button
              variant="contained"
              onClick={() => navigate(`/chapter/${nextChapter.id}`)}
              endIcon={<NextIcon />}
            >
              {nextChapter.title}
            </Button>
          )}
        </Box>
      </Paper>

      {/* Floating Action Button for Quick Navigation */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', sm: 'none' },
        }}
        onClick={() => setShowTableOfContents(!showTableOfContents)}
      >
        {showTableOfContents ? <CollapseIcon /> : <ExpandIcon />}
      </Fab>
    </Box>
  );
};

export default ChapterPage;