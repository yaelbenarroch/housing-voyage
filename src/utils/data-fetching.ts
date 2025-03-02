
export const fetchHousingData = async () => {
  const response = await fetch('https://raw.githubusercontent.com/CodingJake/DataVoyage/main/data/AmesHousing.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
