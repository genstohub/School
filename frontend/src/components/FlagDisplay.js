// components/FlagDisplay.tsx
import React from "react";
import { getFlagEmoji } from "../utils/getFlagEmoji";

const FlagDisplay = ({ countryCode, label }) => {
  const flag = getFlagEmoji(countryCode);

  return (
    <span role="img" aria-label={label}>
      {flag}
    </span>
  );
};

export default FlagDisplay;
