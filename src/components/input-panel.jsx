import { Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const InputPanel = ({ ...props }) => {
  const {
    setIsClick,
    charityData,
    charitiesData,
    setCharitiesData,
    isClick,
    handlePay,
  } = props;

  const payments = [10, 20, 50, 100, 500].map((amount, j) => (
    <label key={j}>
      <input
        type="radio"
        onClick={() => {
          setCharitiesData((prev) => ({ ...prev, selectedAmount: amount }));
        }}
      />
      &nbsp;{amount}
    </label>
  ));

  return (
    <div
      className={`${
        isClick ? 'block' : 'hidden'
      } absolute h-full w-full flex flex-col items-center justify-center rounded-xl gap-2 bg-white opacity-95 z-10 p-4`}
    >
      <div className="absolute top-0 right-0 p-4">
        <IconButton aria-label="close" onClick={() => setIsClick(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Typography
        sx={{
          fontWeight: 'semiBold',
          color: '#616A80',
          textAlign: 'center',
        }}
      >
        Select the amount to donate (THB)
      </Typography>
      <Typography
        sx={{
          fontWeight: 'semiBold',
          color: '#616A80',
          textAlign: 'center',
        }}
      >
        {charityData.name}
      </Typography>
      <div className="flex gap-2">{payments}</div>
      <Button
        variant="outlined"
        onClick={() => {
          setIsClick(false);
          handlePay(
            charityData.name,
            charityData.id,
            charitiesData.selectedAmount,
            charityData.currency,
          );
        }}
        sx={{
          color: '#155BE7',
          borderColor: '#155BE7',
        }}
      >
        Pay
      </Button>
    </div>
  );
};

export default InputPanel;
