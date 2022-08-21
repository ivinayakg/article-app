export default function (token) {
  return {
    headers: {
      authorization: "Bearer " + token,
    },
  };
}
