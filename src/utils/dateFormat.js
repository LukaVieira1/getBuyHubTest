import moment from "moment/moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

export const formatLongDate = (date) => {
  const formatedDate = moment(date).format("ll");
  return formatedDate;
};
