function jadenCase(string) {
  const wordsArray = string.toLowerCase().split(" ");
  const capitalise = (word) => word[0].toUpperCase() + word.slice(1);
  const capitalisedArray = wordsArray.filter(Boolean).map(capitalise);
  return capitalisedArray.join(" ");
}

export default jadenCase;
