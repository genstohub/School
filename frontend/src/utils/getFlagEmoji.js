// utils/getFlagEmoji.js
export const getFlagEmoji = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) {
    return "🏳️"; // Default to white flag or another placeholder
  }
  const code = countryCode.toUpperCase();
  // The base Unicode offset for regional indicator symbols is U+1F1E6
  const flagOffset = 0x1f1e6;
  const asciiOffset = 0x41; // 'A' in ASCII

  const firstChar = String.fromCodePoint(
    code.charCodeAt(0) - asciiOffset + flagOffset
  );
  const secondChar = String.fromCodePoint(
    code.charCodeAt(1) - asciiOffset + flagOffset
  );

  return `${firstChar}${secondChar}`;
};
