export const fetchCalendarInfo = async (duration) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "wiwijohnson@gmail.com",
      duration: duration,
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/getevent";
  const data = await (await fetch(endpoint, requestOptions)).json();
  return data;
};
