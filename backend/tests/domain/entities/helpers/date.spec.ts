import { formatDateTime } from "@/domain/entities";
import { parse } from "date-fns";

describe("DateHelper", () => {
  let date: Date;
  beforeAll(() => {
    date = new Date(2022, 2, 9, 0, 0);
  });

  it("convertToDate convert date", () => {
    expect(formatDateTime(date)).toBe("09-03-2022 00:00:00-03:00");
  });
});
