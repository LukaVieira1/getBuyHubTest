import moment from "moment/moment";
moment.locale("pt-br");

export const formatLongDate = (date) => {
  const formatedDate = moment(date).format("ll");
  return formatedDate;
};
