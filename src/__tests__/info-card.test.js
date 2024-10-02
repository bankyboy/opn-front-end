import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoCard from '../components/info-card';

describe('Component test of InfoCard Component', () => {
  const mockSetIsClick = jest.fn();

  const props = {
    name: 'Charity1',
    imgPath: '/images/charity1.png',
    setIsClick: mockSetIsClick,
  };

  test('renders the InfoCard with correct name and image', () => {
    render(<InfoCard {...props} />);

    // check name on rendered info
    expect(screen.getByText('Charity1')).toBeInTheDocument();

    // check image
    const cardMedia = screen.getByRole('img', { name: /charity1/i });
    expect(cardMedia).toHaveStyle(
      'background-image: url(/images/charity1.png)',
    );
  });

  test('Donate button triggers setIsClick function', () => {
    render(<InfoCard {...props} />);

    const donateButton = screen.getByRole('button', { name: /donate/i });

    fireEvent.click(donateButton);

    expect(mockSetIsClick).toHaveBeenCalledTimes(1);
    expect(mockSetIsClick).toHaveBeenCalledWith(true);
  });
});
