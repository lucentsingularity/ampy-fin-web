const fetcher = async (url, options) => {
  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
}

export default fetcher