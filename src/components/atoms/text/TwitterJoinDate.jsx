const TwitterJoinDate = ({ createdAt }) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  return `${year}年${month}月からTwitterを利用しています`;
};

export default TwitterJoinDate;
