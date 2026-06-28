const mongoose = require('mongoose');
require('dotenv').config();

const Breed = require('../models/Breed');
const DiseaseSymptom = require('../models/DiseaseSymptom');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const breeds = [
  {
    name: "Rajapalayam",
    origin: "Tamil Nadu",
    size: "Large",
    lifespan: "10-12 years",
    description: "The Rajapalayam is a royal sighthound from Tamil Nadu, traditionally used for hunting wild boar and as a guard dog. Known for their pure white coat and pink nose.",
    temperament: ["Loyal", "Protective", "Independent", "Courageous"],
    healthConcerns: ["Hip Dysplasia", "Deafness (in blue-eyed dogs)", "Skin allergies"],
    dietRecommendations: {
      puppy: "High protein (28-30%) with rice, chicken, and traditional foods like ragi",
      adult: "Balanced diet with 22-25% protein, local ingredients preferred",
      senior: "Lower protein (18-20%) with joint supplements and easily digestible foods"
    },
    exerciseNeeds: "High - needs 1-2 hours daily exercise, running preferred",
    groomingNeeds: "Low",
    vaccinationSchedule: [
      { vaccineName: "DHPP", ageWeeks: 6, description: "Distemper, Hepatitis, Parvovirus, Parainfluenza" },
      { vaccineName: "DHPP Booster", ageWeeks: 9, description: "Second dose" },
      { vaccineName: "DHPP Final", ageWeeks: 12, description: "Third dose" },
      { vaccineName: "Rabies", ageWeeks: 16, description: "Rabies vaccination" },
      { vaccineName: "Annual DHPP", ageWeeks: 52, description: "Yearly booster" }
    ],
    climateAdaptation: 9,
    maintenanceCost: "Low",
    specialCare: ["Protect from extreme cold", "Regular exercise essential", "Monitor for skin issues in hot weather"]
  },
  {
    name: "Kanni",
    origin: "Tamil Nadu",
    size: "Medium",
    lifespan: "12-14 years",
    description: "The Kanni (meaning 'pure' in Tamil) is a rare sighthound from Tamil Nadu. They are known for their loyalty and speed, capable of running up to 60 km/hr.",
    temperament: ["Gentle", "Loyal", "Alert", "Reserved"],
    healthConcerns: ["Joint problems", "Eye issues", "Heart conditions"],
    dietRecommendations: {
      puppy: "High quality protein with traditional foods like mutton and rice",
      adult: "Balanced diet with meat, rice, and vegetables",
      senior: "Joint-friendly diet with supplements"
    },
    exerciseNeeds: "High - needs regular running and exercise",
    groomingNeeds: "Low",
    vaccinationSchedule: [
      { vaccineName: "DHPP", ageWeeks: 6, description: "Distemper, Hepatitis, Parvovirus, Parainfluenza" },
      { vaccineName: "DHPP Booster", ageWeeks: 9, description: "Second dose" },
      { vaccineName: "DHPP Final", ageWeeks: 12, description: "Third dose" },
      { vaccineName: "Rabies", ageWeeks: 16, description: "Rabies vaccination" }
    ],
    climateAdaptation: 9,
    maintenanceCost: "Low",
    specialCare: ["Endangered breed - breeding should be careful", "Needs secure fencing due to speed", "Sensitive to harsh treatment"]
  },
  {
    name: "Kombai",
    origin: "Tamil Nadu",
    size: "Medium",
    lifespan: "12-15 years",
    description: "The Kombai is a bear hound from Tamil Nadu, known for their courage and strength. They were traditionally used for hunting and guarding.",
    temperament: ["Brave", "Loyal", "Aggressive towards strangers", "Protective"],
    healthConcerns: ["Hip Dysplasia", "Obesity", "Skin problems"],
    dietRecommendations: {
      puppy: "High protein diet with traditional foods",
      adult: "Protein-rich diet to maintain muscle mass",
      senior: "Controlled diet to prevent obesity"
    },
    exerciseNeeds: "Moderate to High - regular exercise needed",
    groomingNeeds: "Medium",
    vaccinationSchedule: [
      { vaccineName: "DHPP", ageWeeks: 6, description: "Distemper, Hepatitis, Parvovirus, Parainfluenza" },
      { vaccineName: "DHPP Booster", ageWeeks: 9, description: "Second dose" },
      { vaccineName: "DHPP Final", ageWeeks: 12, description: "Third dose" },
      { vaccineName: "Rabies", ageWeeks: 16, description: "Rabies vaccination" }
    ],
    climateAdaptation: 8,
    maintenanceCost: "Low",
    specialCare: ["Needs early socialization", "Strong personality - experienced owners preferred", "Regular weight monitoring"]
  },
  {
    name: "Labrador Retriever",
    origin: "Foreign",
    size: "Large",
    lifespan: "10-12 years",
    description: "Friendly, outgoing, and active companions who are excellent family dogs. Originally from Newfoundland, they are one of the most popular dog breeds worldwide.",
    temperament: ["Friendly", "Active", "Outgoing", "Loyal"],
    healthConcerns: ["Hip Dysplasia", "Elbow Dysplasia", "Obesity", "Eye problems"],
    dietRecommendations: {
      puppy: "High-quality commercial puppy food with controlled portions",
      adult: "Balanced diet with portion control to prevent obesity",
      senior: "Senior formula with joint support"
    },
    exerciseNeeds: "High - needs 1-2 hours daily exercise",
    groomingNeeds: "Medium",
    vaccinationSchedule: [
      { vaccineName: "DHPP", ageWeeks: 6, description: "Distemper, Hepatitis, Parvovirus, Parainfluenza" },
      { vaccineName: "DHPP Booster", ageWeeks: 9, description: "Second dose" },
      { vaccineName: "DHPP Final", ageWeeks: 12, description: "Third dose" },
      { vaccineName: "Rabies", ageWeeks: 16, description: "Rabies vaccination" }
    ],
    climateAdaptation: 5,
    maintenanceCost: "High",
    specialCare: ["Requires AC in Indian climate", "Expensive imported food preferred", "Regular vet checkups needed"]
  },
  {
    name: "Golden Retriever",
    origin: "Foreign",
    size: "Large",
    lifespan: "10-12 years",
    description: "Friendly, intelligent, and devoted family dogs. They have a beautiful golden coat and are known for their patience and gentleness.",
    temperament: ["Friendly", "Intelligent", "Devoted", "Patient"],
    healthConcerns: ["Hip Dysplasia", "Cancer", "Heart problems", "Eye conditions"],
    dietRecommendations: {
      puppy: "Premium puppy food with DHA for brain development",
      adult: "High-quality food with omega fatty acids for coat health",
      senior: "Senior formula with antioxidants"
    },
    exerciseNeeds: "High - needs regular exercise and mental stimulation",
    groomingNeeds: "High",
    vaccinationSchedule: [
      { vaccineName: "DHPP", ageWeeks: 6, description: "Distemper, Hepatitis, Parvovirus, Parainfluenza" },
      { vaccineName: "DHPP Booster", ageWeeks: 9, description: "Second dose" },
      { vaccineName: "DHPP Final", ageWeeks: 12, description: "Third dose" },
      { vaccineName: "Rabies", ageWeeks: 16, description: "Rabies vaccination" }
    ],
    climateAdaptation: 4,
    maintenanceCost: "High",
    specialCare: ["Daily brushing required", "Professional grooming needed", "Climate control essential in India"]
  }
];

const diseases = [
  {
    diseaseName: "Parvovirus",
    symptoms: ["Vomiting", "Diarrhea", "Loss of appetite", "Lethargy", "Dehydration"],
    severity: "Severe",
    commonBreeds: ["All breeds"],
    description: "Highly contagious viral disease affecting the digestive system",
    recommendedAction: "Immediate veterinary care required - this is an emergency",
    urgencyLevel: 5
  },
  {
    diseaseName: "Hip Dysplasia",
    symptoms: ["Limping", "Difficulty standing", "Reluctance to exercise", "Pain in hip area"],
    severity: "Moderate",
    commonBreeds: ["Labrador Retriever", "Golden Retriever", "German Shepherd", "Rajapalayam"],
    description: "Genetic condition affecting hip joints",
    recommendedAction: "X-ray diagnosis and orthopedic consultation recommended",
    urgencyLevel: 2
  },
  {
    diseaseName: "Skin Allergies",
    symptoms: ["Itching", "Red skin", "Hair loss", "Hot spots", "Scratching"],
    severity: "Mild",
    commonBreeds: ["Rajapalayam", "Golden Retriever"],
    description: "Allergic reactions causing skin irritation",
    recommendedAction: "Identify allergens, medicated baths, vet consultation",
    urgencyLevel: 2
  },
  {
    diseaseName: "Kennel Cough",
    symptoms: ["Dry cough", "Gagging", "Retching", "Mild fever"],
    severity: "Mild",
    commonBreeds: ["All breeds"],
    description: "Contagious respiratory infection",
    recommendedAction: "Rest, isolation from other dogs, vet consultation",
    urgencyLevel: 2
  },
  {
    diseaseName: "Bloat (GDV)",
    symptoms: ["Swollen abdomen", "Restlessness", "Drooling", "Unsuccessful vomiting attempts"],
    severity: "Severe",
    commonBreeds: ["Large breeds"],
    description: "Life-threatening stomach condition",
    recommendedAction: "EMERGENCY - immediate surgery required",
    urgencyLevel: 5
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Breed.deleteMany({});
    await DiseaseSymptom.deleteMany({});

    // Insert breeds
    await Breed.insertMany(breeds);
    console.log('Breeds inserted successfully');

    // Insert disease symptoms
    await DiseaseSymptom.insertMany(diseases);
    console.log('Disease symptoms inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
