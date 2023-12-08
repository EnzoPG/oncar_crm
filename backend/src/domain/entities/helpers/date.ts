import { formatInTimeZone } from "date-fns-tz";
import ptBr from "date-fns/locale/pt-BR";

export const formatDateTime = (date: Date): string => {
  return formatInTimeZone(date, "America/Sao_Paulo", "dd-MM-yyyy HH:mm:ssXXX", {
    locale: ptBr,
  });
};
