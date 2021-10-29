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
    const data = await (await fetch(endpoint, requestOptions)).json();
  return data.body;
};

export const fetchLastCalendar = async ({ result }) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          email: "kurita.qwerty@gmail.com",
            result: { result },
        }),
      };
     const endpoint =
       "https://bp9tcorci4.execute-api.ap-northeast-1.amazonaws.com/production/getevent";
     const output = await (await fetch(endpoint, requestOptions)).json();
     return output.body;
}
