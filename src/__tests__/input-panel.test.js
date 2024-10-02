import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputPanel from '../components/input-panel';

describe('InputPanel Component', () => {
  const mockSetIsClick = jest.fn();
  const mockSetCharitiesData = jest.fn();
  const mockHandlePay = jest.fn();

  const charityData = {
    name: 'Charity 1',
    id: 1,
    currency: 'USD',
    image: 'charity1.png',
  };

  const charitiesData = {
    selectedAmount: 0,
  };

  test('renders correctly when `isClick` is true', () => {
    render(
      <InputPanel
        setIsClick={mockSetIsClick}
        charityData={charityData}
        charitiesData={charitiesData}
        setCharitiesData={mockSetCharitiesData}
        isClick={true}
        handlePay={mockHandlePay}
      />,
    );

    expect(
      screen.getByText('Select the amount to donate (USD)'),
    ).toBeInTheDocument();
    expect(screen.getByText(charityData.name)).toBeInTheDocument();

    [10, 20, 50, 100, 500].forEach((amount) => {
      expect(screen.getByLabelText(String(amount))).toBeInTheDocument();
    });
  });

  test('hides when `isClick` is false', () => {
    const { container } = render(
      <InputPanel
        setIsClick={mockSetIsClick}
        charityData={charityData}
        charitiesData={charitiesData}
        setCharitiesData={mockSetCharitiesData}
        isClick={false}
        handlePay={mockHandlePay}
      />,
    );

    expect(container.firstChild).toHaveClass('hidden');
  });

  test('triggers `setCharitiesData` when a payment is selected', () => {
    render(
      <InputPanel
        setIsClick={mockSetIsClick}
        charityData={charityData}
        charitiesData={charitiesData}
        setCharitiesData={mockSetCharitiesData}
        isClick={true}
        handlePay={mockHandlePay}
      />,
    );

    const radioButton = screen.getByLabelText('100');
    fireEvent.click(radioButton);

    const setStateCallback = mockSetCharitiesData.mock.calls[0][0];

    const updatedState = setStateCallback(charitiesData);

    expect(updatedState).toEqual({
      ...charitiesData,
      selectedAmount: 100,
    });
  });

  test('calls `handlePay` when "Pay" button is clicked', () => {
    render(
      <InputPanel
        setIsClick={mockSetIsClick}
        charityData={charityData}
        charitiesData={{ ...charitiesData, selectedAmount: 100 }}
        setCharitiesData={mockSetCharitiesData}
        isClick={true}
        handlePay={mockHandlePay}
      />,
    );

    const payButton = screen.getByText('Pay');
    fireEvent.click(payButton);

    expect(mockHandlePay).toHaveBeenCalledWith(
      charityData.name,
      charityData.id,
      100, // The selected amount
      charityData.currency,
    );
    expect(mockSetIsClick).toHaveBeenCalledWith(false);
  });

  test('closes the panel when the close button is clicked', () => {
    render(
      <InputPanel
        setIsClick={mockSetIsClick}
        charityData={charityData}
        charitiesData={charitiesData}
        setCharitiesData={mockSetCharitiesData}
        isClick={true}
        handlePay={mockHandlePay}
      />,
    );

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(mockSetIsClick).toHaveBeenCalledWith(false);
  });
});
