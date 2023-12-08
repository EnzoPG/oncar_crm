import { Lead } from "@/domain/entities";

describe("Lead", () => {
  it("should set e-mail, name and photo as userAuth values", () => {
    const sut = new Lead({
      _id: "any_id",
      idCar: "any_idCar",
      name: "any_name",
      email: "any_email",
      contact: "any_contact",
      createdAt: "any_created",
      updatedAt: "any_updated",
      deletedAt: "any_deleted",
    });
    expect(sut).toBeDefined();
  });
});
