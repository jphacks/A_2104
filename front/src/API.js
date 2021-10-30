export const fetchCalendarInfo = async (days) => {
    console.log(days);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      email: "kurita.qwerty@gmail.com",
      days: days,
    }),
  };
    console.log(requestOptions);
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/getevent";
    const data = await (await fetch(endpoint, requestOptions)).json();
    console.log(data);
  return data.body;
};

export const fetchLastCalendar = async (result) => {
  console.log(result);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      body: result,
    }),
  };
  console.log(requestOptions);
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/postevent";
    const output = await (await fetch(endpoint, requestOptions)).json();
    console.log(output);
  return output.body;
};

export const applyOutput = async ({ output }) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      email: "kurita.qwerty@gmail.com",
      result: { output },
    }),
  };
  const endpoint =
    "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/getevent";
  const finishStatus = await (await fetch(endpoint, requestOptions)).json();
  return finishStatus;
};
