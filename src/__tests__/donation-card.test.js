import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationCard from '../components/donation-card';

jest.mock('../components/info-card', () => (props) => (
  <div data-testid="info-card">{props.name}</div>
));

jest.mock('../components/input-panel', () => (props) => (
  <div data-testid="input-panel">{props.charityData.name}</div>
));

describe('Component test of DonationCard', () => {
  const mockHandlePay = jest.fn();
  const mockSetCharitiesData = jest.fn();

  const props = {
    index: 0,
    charitiesData: {
      charities: [
        {
          name: 'Charity1',
          image: 'charity1.png',
        },
        {
          name: 'Charity2',
          image: 'charity2.png',
        },
      ],
    },
    setCharitiesData: mockSetCharitiesData,
    handlePay: mockHandlePay,
  };

  test('renders the InfoCard and InputPanel components', () => {
    render(<DonationCard {...props} />);

    // check render
    expect(screen.getByTestId('info-card')).toBeInTheDocument();
    expect(screen.getByTestId('input-panel')).toBeInTheDocument();

    // check content
    expect(screen.getByTestId('info-card')).toHaveTextContent('Charity1');
    expect(screen.getByTestId('input-panel')).toHaveTextContent('Charity1');
  });
});
