const fortuneCookies = [
  "You will find great fortune in unexpected places.",
  "A thrilling time is in your immediate future.",
  "Your talents will be recognized and suitably rewarded.",
  "You will meet a dark horse who will become a valuable ally.",
  "A pleasant surprise is waiting for you."
];

const getFortune = () => {
  const randomIndex = Math.floor(Math.random() * fortuneCookies.length);

  return fortuneCookies[randomIndex];
};

module.exports = { getFortune };
