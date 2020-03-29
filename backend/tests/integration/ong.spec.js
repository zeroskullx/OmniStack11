const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  let ong_id = "";
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "APAD 2",
        email: "contato@ct.com",
        whatsapp: "4799999999",
        city: "São Paulo",
        uf: "SP"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);

    ong_id = response.body.id;
  });

  it("should be able to create a new INCIDENTS", async () => {
    const respIncidents = await request(app)
      .post("/incidents")
      .set("Authorization", ong_id)
      .send({
        title: `Caso 1 ${ong_id}`,
        description: "Detalhes do caso",
        value: 100
      });
  });
});
