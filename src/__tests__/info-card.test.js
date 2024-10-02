import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoCard from '../components/info-card';

describe('Component test of InfoCard Component', () => {
  const mockSetIsClick = jest.fn(); // Mock function for setIsClick

  const props = {
    name: 'Charity1',
    imgPath: '/images/charity1.png',
    setIsClick: mockSetIsClick,
  };

  test('renders the InfoCard with correct name and image', () => {
    render(<InfoCard {...props} />);

    // Check if the name is rendered correctly
    expect(screen.getByText('Charity1')).toBeInTheDocument();

    // Check if the CardMedia component has the correct image
    const cardMedia = screen.getByRole('img', { name: /charity 1/i });
    expect(cardMedia).toHaveStyle(
      'background-image: url(/images/charity1.png)',
    );
  });

  test('Donate button triggers setIsClick function', () => {
    render(<InfoCard {...props} />);

    // Find the button
    const donateButton = screen.getByRole('button', { name: /donate/i });

    // Simulate a click on the Donate button
    fireEvent.click(donateButton);

    // Expect the setIsClick function to be called with true
    expect(mockSetIsClick).toHaveBeenCalledTimes(1);
    expect(mockSetIsClick).toHaveBeenCalledWith(true);
  });
});
