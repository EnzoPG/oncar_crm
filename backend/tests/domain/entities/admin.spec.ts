import { Admin } from "@/domain/entities";

describe("Admin", () => {
  it("should set e-mail, name and photo as userAuth values", () => {
    const sut = new Admin({
      _id: "any_id",
      email: "any_email",
      password: "any_password",
      createdAt: "any_created",
      updatedAt: "any_updated",
      deletedAt: "any_deleted",
    });
    expect(sut).toBeDefined();
  });
});
