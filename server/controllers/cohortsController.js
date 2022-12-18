const express = require("express");
const router = express.Router();
const Cohort = require("../models/cohort");
// const seed = require("../seed/seedCohort");

// router.get("/seed", seed);

router.get("/", async (req, res) => {
  //? return [ list of cohortss]
  try {
    const cohorts = await Cohort.find().exec();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCohort = await Cohort.findByIdAndRemove(id);
    res.status(200).send(deletedCohort);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await Cohort.findById(id);
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedCohort);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;