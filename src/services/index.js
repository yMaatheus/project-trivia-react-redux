const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export const tokenFetch = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT);
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestions = async (token) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getRank = () => {
  const localStorageRank = localStorage.getItem('ranking');
  return JSON.parse(localStorageRank);
};

export const setRank = (newRank) => {
  const localStorageRank = getRank() || [];
  const currentRank = [...localStorageRank, newRank];
  localStorage.setItem('ranking', JSON.stringify(currentRank));
};
