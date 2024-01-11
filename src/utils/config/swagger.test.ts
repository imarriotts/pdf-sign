import swaggerSpec from "./swagger";

describe("Swagger Spec", () => {
  it("debería existir", () => {
    expect(swaggerSpec).toBeDefined();
  });

  it("debería tener la estructura correcta", () => {
    expect(swaggerSpec).toEqual(expect.objectContaining({
      info: expect.objectContaining({
        title: expect.any(String),
        version: expect.any(String),
        description: expect.any(String),
        contact: expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
        }),
      }),
      components: expect.any(Object),
    }));
  });
});