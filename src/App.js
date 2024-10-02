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
  Typography,
} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import { summaryDonations } from './lib/helpers';
import {
  UPDATE_MESSAGE,
  UPDATE_TOTAL_DONATE,
} from './redux/donation/donationSlice';
import DonationCard from './components/donation-card';

const initiateDonateData = {
  charities: [],
  selectedAmount: 0,
};

export default function App() {
  const [charitiesData, setCharitiesData] = useState(initiateDonateData);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openTotal, setIsOpenTotal] = useState(true);

  const totalDonation = useSelector((state) => state.donation.donate);
  const message = useSelector((state) => state.donation.message);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCharitiesData({ ...initiateDonateData, charities: data });
        setIsLoading(false);
      });
    fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        dispatch(
          UPDATE_TOTAL_DONATE({
            amount: summaryDonations(data.map((item) => item.amount)),
          }),
        );
        setIsLoading(false);
      });
  }, [dispatch]);

  const handlePay = async (name, id, amt, cur) => {
    if (amt > 0) {
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
        dispatch(
          UPDATE_MESSAGE({
            message: `${amt} ${cur} have been donated to ${name}`,
          }),
        );
      });

      fetch('http://localhost:3001/payments')
        .then((resp) => {
          return resp.json();
        })
        .then(() => {
          dispatch(
            UPDATE_TOTAL_DONATE({
              amount: amt,
            }),
          );
        });
    } else {
      setIsError(true);
      dispatch(
        UPDATE_MESSAGE({
          message: 'Please enter amount to donate',
        }),
      );
    }
    setCharitiesData((prev) => ({ ...prev, selectedAmount: 0 }));
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
        open={openTotal}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)', // Darken the backdrop
            },
          },
        }}
      >
        <div className="flex flex-col items-center mt-4">
          <img
            src="/images/donation.png"
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
            Current Total Amount of Tamboon
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText
            id="alert-welcome-dialog-description"
            sx={{
              textAlign: 'center',
              color: 'black',
              fontSize: '40px',
              fontWeight: 'bold',
            }}
          >
            {totalDonation}&nbsp;฿
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
              color="primary"
              onClick={() => setIsOpenTotal(false)}
            >
              Enter Tamboon site
            </Button>
          </DialogActions>
        </div>
      </Dialog>
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
      <Dialog
        open={isError}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darken the backdrop
            },
          },
        }}
      >
        <div className="flex flex-col items-center mt-4">
          <img
            src="/images/choose.png"
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
            No amount selected
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
              color="error"
              onClick={() => setIsError(false)}
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
        <div className="flex justify-center w-full items-center">
          <PaidIcon fontSize="large" />
          <Typography
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '24px',
              color: 'grey',
            }}
          >
            Total donations: {totalDonation}&nbsp;฿
          </Typography>
        </div>
        <div
          data-aos="zoom-in-down"
          className="flex flex-col justify-between flex-wrap gap-10 md:flex-row h-full w-full"
        >
          {charitiesData.charities.length > 0 ? (
            charitiesData.charities.map((_, index) => {
              return (
                <DonationCard
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
