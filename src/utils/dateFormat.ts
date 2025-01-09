import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

interface DateFormatOptions {
  locale?: string;
  format?: string;
}

export const formatLongDate = (
  date: string | null | undefined,
  options: DateFormatOptions = {}
): string => {
  if (!date) return "Data não informada";

  const { locale = "pt-br", format = "DD [de] MMMM [de] YYYY" } = options;

  return moment(date).locale(locale).format(format);
};

export const formatShortDate = (
  date: string | null | undefined,
  options: DateFormatOptions = {}
): string => {
  if (!date) return "Data não informada";

  const { locale = "pt-br", format = "DD/MM/YYYY" } = options;

  return moment(date).locale(locale).format(format);
};
