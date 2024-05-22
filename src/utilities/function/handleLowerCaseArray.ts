export function handleLowerCaseArray(data: string[]) {
  let response = [] as string[];
  data?.map((key, index) => {
    response.push(key.toLowerCase());
  });
  response = Array.from(new Set(response));
  return response;
}
