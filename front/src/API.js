export const fetchCalendarInfo = async (days, email) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      email: email,
      days: days,
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/getevent";
    const data = await (await fetch(endpoint, requestOptions)).json();
    console.log(data);
  return data.body;
};

export const fetchLastCalendar = async (result) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      body: result,
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/postevent";
    const output = await (await fetch(endpoint, requestOptions)).json();
    console.log(output);
  return output.body;
};

export const applyOutput = async (output, address) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: address,
      body: output,
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/applygooglecal";
  const finishStatus = await (await fetch(endpoint, requestOptions)).json();
  return finishStatus;
};
