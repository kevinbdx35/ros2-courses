import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
  Collapse,
  Chip,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as ErrorIcon,
  Quiz as QuizIcon,
} from '@mui/icons-material';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  title?: string;
}

const Quiz: React.FC<QuizProps> = ({ 
  question, 
  options, 
  explanation,
  title = "Quiz" 
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAnswered) {
      setSelectedOption(event.target.value);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setShowResult(true);
      setIsAnswered(true);
    }
  };

  const handleReset = () => {
    setSelectedOption('');
    setShowResult(false);
    setIsAnswered(false);
  };

  const selectedOptionData = options.find(opt => opt.id === selectedOption);
  const isCorrect = selectedOptionData?.isCorrect || false;

  return (
    <Card
      elevation={3}
      sx={{
        mb: 3,
        border: showResult 
          ? `2px solid ${isCorrect ? '#4caf50' : '#f44336'}` 
          : '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <QuizIcon color="primary" />
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          {showResult && (
            <Chip
              icon={isCorrect ? <CheckIcon /> : <ErrorIcon />}
              label={isCorrect ? 'Correct!' : 'Incorrect'}
              color={isCorrect ? 'success' : 'error'}
              size="small"
            />
          )}
        </Box>

        <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
          {question}
        </Typography>

        <RadioGroup
          value={selectedOption}
          onChange={handleOptionChange}
          sx={{ mb: 3 }}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              label={option.text}
              disabled={isAnswered}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.95rem',
                },
                ...(showResult && option.id === selectedOption && {
                  backgroundColor: isCorrect 
                    ? 'rgba(76, 175, 80, 0.1)' 
                    : 'rgba(244, 67, 54, 0.1)',
                  borderRadius: 1,
                  padding: 1,
                }),
                ...(showResult && option.isCorrect && option.id !== selectedOption && {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  borderRadius: 1,
                  padding: 1,
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                  },
                }),
              }}
            />
          ))}
        </RadioGroup>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {!isAnswered ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!selectedOption}
              color="primary"
            >
              Valider la réponse
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleReset}
              color="primary"
            >
              Recommencer
            </Button>
          )}
        </Box>

        <Collapse in={showResult}>
          <Alert 
            severity={isCorrect ? 'success' : 'error'}
            icon={isCorrect ? <CheckIcon /> : <ErrorIcon />}
            sx={{ mt: 2 }}
          >
            <Typography variant="body2">
              <strong>Explication :</strong> {explanation}
            </Typography>
          </Alert>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default Quiz;