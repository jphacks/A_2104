export const fetchCalendarInfo = async (days) => {
  const requestOptions = {
    method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8"},
    body: JSON.stringify({
      email: "kurita.qwerty@gmail.com",
      days: 10,
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/getevent";
    const data = await fetch(endpoint, requestOptions);
    console.log((data));
  return data;
};
