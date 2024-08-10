const request = require("supertest");
const app = require("../../app");
const { Star, Order, OrderStar } = require("../../src/models");

// Importation de Jest
const { expect, it, describe, beforeEach } = require("@jest/globals");

describe("API Tests", () => {
  let starId;

  beforeEach(async () => {
    // Créer une étoile de test
    const star = await Star.create({
      name: "Test Star",
      description: "A test star",
      constellation: "Test Constellation",
      distanceFromEarth: 100.5,
      luminosity: 1.5,
      mass: 2.0,
      magnitude: 4.5,
      price: 1000.0,
    });
    starId = star.id;
  });

  describe("User Routes", () => {
    it("should register a new user", async () => {
      const userData = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        password: "password123",
      };
      const res = await request(app).post("/api/users/register").send(userData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("userId");
    });

    it("should not register a user with existing email", async () => {
      const userData = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: "password123",
      };
      const res = await request(app).post("/api/users/register").send(userData);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Email already in use");
    });

    it("should login a user", async () => {
      const loginData = {
        email: "test@example.com",
        password: "testpassword",
      };
      const res = await request(app).post("/api/users/login").send(loginData);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("role");
    });

    it("should not login with incorrect credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };
      const res = await request(app).post("/api/users/login").send(loginData);
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });

    it("should get the user profile", async () => {
      const res = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${global.token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", global.userId);
      expect(res.body).toHaveProperty("email", "test@example.com");
      expect(res.body).not.toHaveProperty("password");
    });

    it("should not get profile without token", async () => {
      const res = await request(app).get("/api/users/profile");
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "No authorization header");
    });
  });

  describe("Star Routes", () => {
    beforeEach(async () => {
      await Star.bulkCreate([
        {
          name: "Star1",
          constellation: "Test Constellation",
          price: 100,
          magnitude: 1,
          description: "Test description",
          distanceFromEarth: 100,
          luminosity: 1,
          mass: 1,
        },
        {
          name: "Star2",
          constellation: "Other Constellation",
          price: 200,
          magnitude: 2,
          description: "Test description",
          distanceFromEarth: 200,
          luminosity: 2,
          mass: 2,
        },
      ]);
    });

    it("should get all stars", async () => {
      const res = await request(app).get("/api/stars");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(3); // 2 from bulkCreate + 1 from beforeEach
    });

    it("should get a star by id", async () => {
      const res = await request(app).get(`/api/stars/${starId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Test Star");
    });

    it("should return 404 for non-existent star", async () => {
      const res = await request(app).get("/api/stars/9999");
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Star not found");
    });

    it("should filter stars", async () => {
      const res = await request(app).get("/api/stars/filter").query({
        constellation: "Test Constellation",
        minPrice: 50,
        maxPrice: 150,
      });
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty("name", "Star1");
    });

    it("should return empty array for no matching stars", async () => {
      const res = await request(app)
        .get("/api/stars/filter")
        .query({ constellation: "Non-existent Constellation" });
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(0);
    });
  });

  describe("Order Routes", () => {
    it("should create a new order", async () => {
      const orderData = {
        items: [{ starId, quantity: 1 }],
      };
      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${global.token}`)
        .send(orderData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Order created successfully");
    });

    it("should get user orders", async () => {
      // Créer un ordre pour l'utilisateur
      await Order.create({
        UserId: global.userId,
        totalAmount: 1000,
        status: "pending",
      });

      const res = await request(app)
        .get("/api/orders")
        .set("Authorization", `Bearer ${global.token}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
    });

    it("should not create order without authentication", async () => {
      const orderData = {
        items: [{ starId, quantity: 1 }],
      };
      const res = await request(app).post("/api/orders").send(orderData);
      expect(res.statusCode).toBe(401);
    });
  });

  describe("Review Routes", () => {
    beforeEach(async () => {
      const order = await Order.create({
        UserId: global.userId,
        totalAmount: 1000,
        status: "paid",
      });
      await OrderStar.create({
        OrderId: order.id,
        StarId: starId,
        quantity: 1,
      });
    });

    it("should add a review", async () => {
      const reviewData = {
        starId,
        rating: 5,
        comment: "Great star!",
      };
      const res = await request(app)
        .post("/api/reviews/add")
        .set("Authorization", `Bearer ${global.token}`)
        .send(reviewData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Review added successfully");
    });

    it("should not add review without authentication", async () => {
      const reviewData = {
        starId,
        rating: 5,
        comment: "Great star!",
      };
      const res = await request(app).post("/api/reviews/add").send(reviewData);
      expect(res.statusCode).toBe(401);
    });

    it("should not add review for unowned star", async () => {
      const unownedStar = await Star.create({
        name: "Unowned Star",
        description: "An unowned star",
        constellation: "Test Constellation",
        distanceFromEarth: 100.5,
        luminosity: 1.5,
        mass: 2.0,
        magnitude: 4.5,
        price: 1000.0,
      });

      const reviewData = {
        starId: unownedStar.id,
        rating: 5,
        comment: "Great star!",
      };
      const res = await request(app)
        .post("/api/reviews/add")
        .set("Authorization", `Bearer ${global.token}`)
        .send(reviewData);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "You can only review stars you have purchased"
      );
    });
  });

  describe("Wishlist Routes", () => {
    it("should add to wishlist", async () => {
      const res = await request(app)
        .post("/api/wishlist/add")
        .set("Authorization", `Bearer ${global.token}`)
        .send({ starId });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Star added to wishlist");
    });

    it("should get user wishlist", async () => {
      // Ajouter une étoile à la liste de souhaits
      await request(app)
        .post("/api/wishlist/add")
        .set("Authorization", `Bearer ${global.token}`)
        .send({ starId });

      const res = await request(app)
        .get("/api/wishlist")
        .set("Authorization", `Bearer ${global.token}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty("id", starId);
    });

    it("should not add to wishlist without authentication", async () => {
      const res = await request(app).post("/api/wishlist/add").send({ starId });
      expect(res.statusCode).toBe(401);
    });

    it("should remove from wishlist", async () => {
      // Ajouter d'abord à la liste de souhaits
      await request(app)
        .post("/api/wishlist/add")
        .set("Authorization", `Bearer ${global.token}`)
        .send({ starId });

      const res = await request(app)
        .delete(`/api/wishlist/remove/${starId}`)
        .set("Authorization", `Bearer ${global.token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Star removed from wishlist");

      // Vérifier que la liste de souhaits est vide
      const wishlistRes = await request(app)
        .get("/api/wishlist")
        .set("Authorization", `Bearer ${global.token}`);
      expect(wishlistRes.body.length).toBe(0);
    });
  });
});
