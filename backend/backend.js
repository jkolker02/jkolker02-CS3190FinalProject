var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

const { MongoClient, ObjectId } = require("mongodb");  // Import ObjectId
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

// Get 3 random featured cars
app.get("/listFeatured", async (req, res) => { 
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    // Get 3 random featured cars
    const results = await db
        .collection("cars")
        .aggregate([{ $sample: { size: 3 } }])
        .toArray();

    console.log(results);
    res.status(200).send(results);
});

// Get new vans
app.get("/newVans", async (req, res) => { 
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const results = await db
        .collection("cars")
        .find({ category:"newVan" })
        .toArray();

    console.log(results);
    res.status(200).send(results);
});

// Get new sedans
app.get("/newSedans", async (req, res) => { 
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const results = await db
        .collection("cars")
        .find({ category:"newSedan" })
        .toArray();

    console.log(results);
    res.status(200).send(results);
});

// Get new trucks
app.get("/newTrucks", async (req, res) => { 
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const results = await db
        .collection("cars")
        .find({ category:"newTruck" })
        .toArray();

    console.log(results);
    res.status(200).send(results);
});

// Get used vans
app.get("/usedVans", async (req, res) => { 
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const results = await db
        .collection("cars")
        .find({ category:"usedVan" })
        .toArray();

    console.log(results);
    res.status(200).send(results);
});

// Get used sedans
app.get("/usedSedans", async (req, res) => { 
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const results = await db
        .collection("cars")
        .find({ category:"usedSedan" })
        .toArray();

    console.log(results);
    res.status(200).send(results);
});

// Get used trucks
app.get("/usedTrucks", async (req, res) => { 
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const results = await db
        .collection("cars")
        .find({ category:"usedTruck" })
        .toArray();

    console.log(results);
    res.status(200).send(results);
});


// Post a new review for a car (add/update rating)
app.post("/addReview", async (req, res) => {
    const { carId, rating } = req.body;

    // Validate rating
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).send({ error: "Invalid rating. Rating must be between 1 and 5." });
    }

    if (!carId) {
        return res.status(400).send({ error: "Car ID is required." });
    }

    await client.connect();
    console.log("Node connected successfully to POST MongoDB");

    try {
        // Update the car's reviews or add a new one
        const result = await db.collection("cars").updateOne(
            { id: carId }, // Match the car by its ObjectId
            { $push: { reviews: rating } } // Add new rating to the reviews array
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send({ error: "Car not found" });
        }

        res.status(200).send({ message: "Rating added successfully!" });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).send({ error: "Failed to add rating" });
    }
});


// Post a new car
app.post("/addCar", async (req, res) => {
    const { id, type, category, name, year, miles, color, description, price, pictureUrl } = req.body;

    console.log(req.body);

    

    // Validate required fields (if necessary)
    if (!category || !year || !price || !pictureUrl) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Create the new car object with the updated category and type
    const newCar = {
      id: parseInt(id, 10),
      type,  // Use the updated 'type' based on condition
      category,
      name,
      year,
      miles: parseInt(miles),  // Convert miles to an integer
      color,
      description,
      price: parseFloat(price.replace(/[^0-9.-]+/g, "")), // Convert price to a number
      picture: pictureUrl,
      reviews: [], // Empty reviews array initially
    };

    try {
      await client.connect();
      console.log("Node connected successfully to POST MongoDB");

      // Check if a car with the same ID already exists
      const existingCar = await db.collection("cars").findOne({ id: newCar.id });
      if (existingCar) {
          return res.status(409).send({ error: `A car with ID ${newCar.id} already exists.` });
      }

      const result = await db.collection("cars").insertOne(newCar);

      if (result.insertedId) {
        res.status(201).send({ message: "Car added successfully", carId: result.insertedId });
      } else {
        res.status(500).send({ error: "Failed to add car" });
      }
    } catch (error) {
      console.error("Error adding car:", error);
      res.status(500).send({ error: "Failed to add car to database" });
    }
});


// Delete a car by its ID
app.delete("/deleteCar/:id", async (req, res) => {
    const carId = parseInt(req.params.id, 10);

    if (!carId) {
        return res.status(400).send({ error: "Car ID is required." });
    }

    await client.connect();
    console.log("Node connected successfully to DELETE MongoDB");

    try {
        const result = await db.collection("cars").deleteOne({ id: carId });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: "Car not found." });
        }

        res.status(200).send({ message: "Car deleted successfully." });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).send({ error: "Failed to delete car." });
    }
});
