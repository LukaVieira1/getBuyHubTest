import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

export const formatLongDate = (date) => {
  if (!date) return "Data não informada";
  return moment(date).format("DD [de] MMMM [de] YYYY");
};

export const formatShortDate = (date) => {
  if (!date) return "Data não informada";
  return moment(date).format("DD/MM/YYYY");
};
