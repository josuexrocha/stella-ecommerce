// tests/unit/models/star.test.js

const { describe, it, expect } = require("@jest/globals");
const { Star } = require("../../../src/models");

describe("Star Model", () => {
  it("should create a star", async () => {
    const starData = {
      name: "Test Star",
      description: "A test star",
      constellation: "Test Constellation",
      distanceFromEarth: 100.5,
      luminosity: 1.5,
      mass: 2.0,
      magnitude: 4.5,
      price: 1000.0,
    };

    try {
      const star = await Star.create(starData);

      expect(star.name).toBe(starData.name);
      expect(star.description).toBe(starData.description);
      expect(star.constellation).toBe(starData.constellation);
      expect(star.distanceFromEarth).toBe(starData.distanceFromEarth);
      expect(star.luminosity).toBe(starData.luminosity);
      expect(star.mass).toBe(starData.mass);
      expect(star.magnitude).toBe(starData.magnitude);
      expect(parseFloat(star.price)).toBe(starData.price);
    } catch (error) {
      console.error("Error creating star:", error);
      throw error;
    }
  });
});
