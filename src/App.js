import React, { useEffect, useState } from 'react';
// import fetch from 'isomorphic-fetch';
// import { connect } from 'react-redux';
// import { summaryDonations } from './helpers';
import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { summaryDonations } from './helpers';
import DonationCard from './components/donation-card';

const Card = ({ ...props }) => {
  const { index, charitiesData, setCharitiesData } = props;
  const charityData = charitiesData[index];
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
          // onClick={handlePay.call(
          //   item.id,
          //   charitiesData.selectedAmount,
          //   item.currency
          // )}
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
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        setCharitiesData({ ...initiateData, charities: data });
        setIsLoading(false);
      });
    fetch('http://localhost:3001/payments')
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: summaryDonations(data.map((item) => item.amount)),
        });
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-x-hidden z-1000">
      <div className="flex flex-col items-center justify-center my-10 mx-24 gap-4">
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
            charitiesData.charities.map((charity, index) => {
              return (
                <Card
                  key={index}
                  index={index}
                  charitiesData={charitiesData.charities}
                  setCharitiesData={setCharitiesData}
                />
              );
            })
          ) : (
            <div>No data available</div> // Handle case where no data is available
          )}
        </div>
      </div>
    </div>
  );
}

const handlePay = async (id, amt, cur) => {
  const fetchLength = await fetch('http://localhost:3001/payments');
  const response = await fetchLength.json();
  const currentDonationLength = response.length;

  // fetch('http://localhost:3001/payments', {
  //         method: 'POST',
  //         body: JSON.stringify({ charitiesId: id, amount: amt, currency: cur , id: currentDonationLength+1}),
  //       }).then(() => {
  //         console.log('success')
  //       })
};
// /**
//  * Handle pay button
//  *
//  * @param {*} The charities Id
//  * @param {*} amount The amount was selected
//  * @param {*} currency The currency
//  *
//  * @example
//  * fetch('http://localhost:3001/payments', {
//       method: 'POST',
//       body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
//     })
//  */
// function handlePay(id, amount, currency) {}
