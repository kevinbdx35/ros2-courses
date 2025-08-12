import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  description?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  title, 
  description 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleCloseCopied = () => {
    setCopied(false);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3,
      }}
    >
      {(title || description) && (
        <Box sx={{ p: 2, backgroundColor: 'grey.50' }}>
          {title && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" component="h3">
                {title}
              </Typography>
              <Chip
                label={language}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      )}
      
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
          }}
          size="small"
        >
          <CopyIcon fontSize="small" />
        </IconButton>
        
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={handleCloseCopied}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseCopied} severity="success">
          Code copié !
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CodeBlock;