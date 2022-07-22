const formatDate = (date: string) => {
  const arr = date.split(" ");
  const month = arr[1];
  const day = arr[2];
  const year = arr[3];
  const time = arr[4];
  const timeArr = time.split(":");
  const hour = timeArr[0];
  const minut = timeArr[1];
  const displayTime = `${day}/${month}/${year} a ${hour}:${minut}`;
  return displayTime;
};

export default formatDate;
