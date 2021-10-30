export const fetchCalendarInfo = async (days) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      email: "kurita.qwerty@gmail.com",
      days: days,
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/getevent";
  const data = await (await fetch(endpoint, requestOptions)).json();
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
  return output.body;
};

export const applyOutput = async (output) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "kurita.qwerty@gmail.com",
      body: output,
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/applygooglecal";
  const finishStatus = await (await fetch(endpoint, requestOptions)).json();
  return finishStatus;
};
