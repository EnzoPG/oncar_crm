import { Car } from "@/domain/entities";

describe("Car", () => {
  it("should set e-mail, name and photo as userAuth values", () => {
    const sut = new Car({
      _id: "any_id",
      brand: "any_brand",
      model: "any_model",
      year: "any_year",
      price: "any-price",
      createdAt: "any_created",
      updatedAt: "any_updated",
      deletedAt: "any_deleted",
    });
    expect(sut).toBeDefined();
  });
});
