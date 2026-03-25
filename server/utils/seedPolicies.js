const Policy = require("../models/Policy");

const DEFAULT_POLICIES = [
  {
    title: "Basic Shield",
    description: "Covers extreme weather events for part-time delivery workers.",
    price: 90,
    duration: 7,
    coverageAmount: 3000,
    planType: "basic",
    triggerTypes: ["rain", "heat"],
  },
  {
    title: "Standard Shield",
    description: "Balanced protection for daily riders with broader disruption coverage.",
    price: 150,
    duration: 7,
    coverageAmount: 5000,
    planType: "standard",
    triggerTypes: ["rain", "aqi", "heat", "flood"],
  },
  {
    title: "Pro Shield",
    description: "Maximum weekly protection for full-time gig workers and severe disruptions.",
    price: 240,
    duration: 7,
    coverageAmount: 8000,
    planType: "pro",
    triggerTypes: ["rain", "aqi", "heat", "curfew", "flood"],
  },
];

const seedDefaultPolicies = async () => {
  const existingPolicies = await Policy.find({
    planType: { $in: DEFAULT_POLICIES.map((policy) => policy.planType) },
  }).select("planType");

  const existingPlanTypes = new Set(
    existingPolicies.map((policy) => policy.planType)
  );

  const missingPolicies = DEFAULT_POLICIES.filter(
    (policy) => !existingPlanTypes.has(policy.planType)
  );

  if (!missingPolicies.length) {
    return;
  }

  await Policy.insertMany(missingPolicies);
  console.log(`Seeded ${missingPolicies.length} default policy plans`);
};

module.exports = seedDefaultPolicies;
