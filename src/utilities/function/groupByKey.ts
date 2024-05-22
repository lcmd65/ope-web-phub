export const groupByKey = (initialArray: any[], key: string) => {
  const arraySorted = initialArray.reduce((acc, cur) => {
    acc[cur[key]] = acc[cur[key]] || [];
    acc[cur[key]].push(cur);
    return acc;
  }, []);

  return arraySorted;
};
