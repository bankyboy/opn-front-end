import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { summaryDonations } from './helpers';
import DonationCard from './components/donation-card';

const Card = ({ ...props }) => {
  const { index, charitiesData, setCharitiesData, handlePay } = props;
  const charityData = charitiesData.charities[index];
  const [isClick, setIsClick] = useState(false);

  const payments = [10, 20, 50, 100, 500].map((amount, j) => (
    <label key={j} className="text-gray-500 font-semibold whitespace-nowrap">
      <input
        type="radio"
        name="payment"
        onClick={() => {
          setCharitiesData((prev) => ({ ...prev, selectedAmount: amount }));
        }}
      />
      &nbsp;{amount}
    </label>
  ));

  return (
    <div className="flex flex-col rounded-2xl shadow-2xl relative w-full md:w-45">
      <div
        className={`${
          isClick ? 'block' : 'hidden'
        } absolute h-full w-full flex flex-col items-center justify-center rounded-xl gap-2 bg-white opacity-95 z-10 p-4`}
      >
        <div className="absolute top-0 right-0 p-4">
          <IconButton onClick={() => setIsClick(false)}>
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
          Select the amount to donate (USD)
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
      <DonationCard
        name={charityData.name}
        imgPath={`/images/${charityData.image}`}
        setIsClick={setIsClick}
      />
    </div>
  );
};

const initiateData = {
  charities: [],
  selectedAmount: 10,
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [charitiesData, setCharitiesData] = useState(initiateData);
  const totalDonation = useSelector((state) => state.donate);
  const message = useSelector((state) => state.message);
  const [isPaid, setIsPaid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCharitiesData({ ...initiateData, charities: data });
        setIsLoading(false);
      });
    fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: summaryDonations(data.map((item) => item.amount)),
        });
        setIsLoading(false);
      });
  }, [dispatch]);

  const handlePay = async (name, id, amt, cur) => {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        charitiesId: id,
        amount: amt,
        currency: cur,
      }),
    }).then(() => {
      setIsPaid(true);
      dispatch({
        type: 'UPDATE_MESSAGE',
        message: `${amt} ${cur} have been donated to ${name}`,
      });
    });

    fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then(() => {
        dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: amt,
        });
      });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-x-hidden z-1000">
      <Dialog
        open={isPaid}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darken the backdrop
            },
          },
        }}
      >
        <div className="flex flex-col items-center">
          <img
            src="/images/thank-you.png"
            alt="thank-you-img"
            className="w-32 h-32"
          />
          <DialogTitle
            id="alert-welcome-dialog-title"
            sx={{
              textAlign: 'center',
              color: 'black',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            Thank you
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText
            id="alert-welcome-dialog-description"
            sx={{
              textAlign: 'center',
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <div className="flex flex-grow w-full gap-2 justify-center p-5">
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              className="w-full"
              color="success"
              onClick={() => setIsPaid(false)}
            >
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <div className="flex flex-col items-center justify-center my-10 mx-6 md:mx-24 gap-4">
        <Typography
          className="text-center"
          sx={{
            fontWeight: 'bold',
            fontSize: '40px',
            color: '#616A80',
          }}
        >
          Omise Tamboon React
        </Typography>
        <div className="flex justify-start w-full">
          <PaidIcon />
          <Typography
            sx={{
              fontWeight: 'bold',
              textAlign: 'start',
            }}
          >
            Total donations: {totalDonation}&nbsp;฿
          </Typography>
        </div>
        <div className="flex flex-col justify-between flex-wrap gap-10 md:flex-row h-full w-full">
          {charitiesData.charities.length > 0 ? (
            charitiesData.charities.map((_, index) => {
              return (
                <Card
                  key={index}
                  index={index}
                  charitiesData={charitiesData}
                  setCharitiesData={setCharitiesData}
                  handlePay={handlePay}
                />
              );
            })
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>
    </div>
  );
}
