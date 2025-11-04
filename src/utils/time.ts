export default function getTime() {
  let date = new Date();
  let msg = "";
  let hour = date.getHours();
  if (hour >= 9 && hour < 12) {
    msg = "上午";
  } else if (hour >= 12 && hour < 18) {
    msg = "下午";
  } else if (hour >= 18 && hour <= 24) {
    msg = "晚上";
  } else {
    msg = "早上";
  }
  return msg;
}
