import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { summaryDonations } from './helpers';
import MediaCard from './components/media-card';
import { Button, IconButton, Typography } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import CloseIcon from '@mui/icons-material/Close';

export default connect((state) => state)(
  class App extends Component {
    state = {
      charities: [],
      selectedAmount: 10,
    };

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.setState({ charities: data });
        });

      fetch('http://localhost:3001/payments')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => item.amount)),
          });
        });
    }

    render() {
      const self = this;
      const cards = this.state.charities.map(function (item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <label
            key={j}
            className="text-gray-500 font-semibold whitespace-nowrap"
          >
            <input
              type="radio"
              name="payment"
              onClick={function () {
                self.setState({ selectedAmount: amount });
              }}
            />
            &nbsp;{amount}
          </label>
        ));

        return (
          <div className="flex flex-col rounded-2xl shadow-2xl relative w-full md:w-45">
            <div className="absolute h-full w-full flex flex-col items-center justify-center rounded-xl gap-2 bg-white opacity-95 z-10 p-4">
              <div className="absolute top-0 right-0 p-4">
                <IconButton>
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
                {item.name}
              </Typography>
              <div className="flex gap-2">{payments}</div>
              <Button
                variant="outlined"
                onClick={handlePay.call(
                  self,
                  item.id,
                  self.state.selectedAmount,
                  item.currency
                )}
                sx={{
                  color: '#155BE7',
                  borderColor: '#155BE7',
                }}
              >
                Pay
              </Button>
            </div>
            <MediaCard
              key={i}
              name={item.name}
              imgPath={`/images/${item.image}`}
            />
          </div>
        );
      });

      const donate = this.props.donate;
      // const message = this.props.message;

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
                Total donations: {donate}&nbsp;฿
              </Typography>
            </div>
            <div className="flex flex-col justify-between flex-wrap gap-10 md:flex-row h-full w-full">
              {cards}
            </div>
          </div>
        </div>
      );
    }
  }
);

/**
 * Handle pay button
 * 
 * @param {*} The charities Id
 * @param {*} amount The amount was selected
 * @param {*} currency The currency
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
 */
function handlePay(id, amount, currency) {}
