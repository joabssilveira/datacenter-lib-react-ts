import { styled, TextField, Typography } from '@mui/material';

export enum DetailsStatus {
  undefined,
  saving,
  success,
  error,
}

export const StepContentStyled = styled('div')(({ }) => ({
  display: 'flex',
  gap: 20,
  flexWrap: 'wrap',
}));

export const StepTitleStyled = styled(Typography)(({ }) => ({

  width: '100%'
}))

export const StepInputStyled = styled(TextField)(({ }) => ({
  minWidth: 200,
  flex: 1,
}))