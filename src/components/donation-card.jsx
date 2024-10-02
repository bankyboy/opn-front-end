import React, { useState } from 'react';
import InfoCard from './info-card';
import InputPanel from './input-panel';

const DonationCard = ({ ...props }) => {
  const { index, charitiesData, setCharitiesData, handlePay } = props;
  const charityData = charitiesData.charities[index];
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl shadow-2xl relative w-full md:w-45">
      <InputPanel
        isClick={isClick}
        setIsClick={setIsClick}
        charitiesData={charitiesData}
        charityData={charityData}
        setCharitiesData={setCharitiesData}
        handlePay={handlePay}
      />
      <InfoCard
        name={charityData.name}
        imgPath={`/images/${charityData.image}`}
        setIsClick={setIsClick}
      />
    </div>
  );
};

export default DonationCard;
