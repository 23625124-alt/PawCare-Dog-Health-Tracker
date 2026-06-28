export const targetBreeds = [
  {
    name: 'Labrador Retriever',
    type: 'foreign',
    origin: 'United Kingdom',
    overview: 'Friendly, active, and highly adaptable family breed. Needs consistent exercise and weight management.',
    diet: [
      'Balanced protein-rich meals twice a day',
      'Controlled portions to prevent obesity',
      'Fresh water available at all times'
    ],
    vaccination: ['Rabies', 'DHPPiL', 'Leptospirosis', 'Bordetella'],
    grooming: ['Brush 2 to 3 times a week', 'Check ears weekly', 'Bath every 4 to 6 weeks'],
    risks: ['Obesity', 'Hip dysplasia', 'Ear infections']
  },
  {
    name: 'German Shepherd',
    type: 'foreign',
    origin: 'Germany',
    overview: 'Intelligent working breed that benefits from exercise, joint support, and structured routines.',
    diet: [
      'High-quality meals with joint-support nutrients',
      'Split meals to support digestion',
      'Avoid overfeeding during low-activity periods'
    ],
    vaccination: ['Rabies', 'DHPPiL', 'Leptospirosis', 'Bordetella'],
    grooming: ['Brush 3 times a week', 'Monitor shedding seasons closely', 'Inspect hips, elbows, and paws regularly'],
    risks: ['Hip dysplasia', 'Skin allergies', 'Digestive sensitivity']
  },
  {
    name: 'Pomeranian',
    type: 'foreign',
    origin: 'Germany / Poland',
    overview: 'Small companion breed with a thick coat that needs regular brushing and careful calorie control.',
    diet: [
      'Small, nutrient-dense meals',
      'Limit treats to avoid excess weight',
      'Use breed-appropriate feeding schedules'
    ],
    vaccination: ['Rabies', 'DHPPiL', 'Bordetella', 'Leptospirosis'],
    grooming: ['Daily brushing to prevent matting', 'Trim coat regularly', 'Check teeth and ears each week'],
    risks: ['Dental issues', 'Luxating patella', 'Overheating']
  },
  {
    name: 'Rajapalayam',
    type: 'native',
    origin: 'Tamil Nadu, India',
    overview: 'Majestic native breed known for loyalty and stamina. Needs skin care, tick control, and active routines.',
    diet: [
      'Balanced protein-led diet with local ingredients where appropriate',
      'Meal timing matched with exercise schedule',
      'Clean, fresh water throughout the day'
    ],
    vaccination: ['Rabies', 'DHPPiL', 'Leptospirosis', 'Bordetella', 'Corona (optional)'],
    grooming: ['Weekly brushing with a soft brush', 'Monthly bath with mild shampoo', 'Check skin and ears for ticks'],
    risks: ['Mange', 'Tick infestation', 'Parvovirus']
  },
  {
    name: 'Chippiparai',
    type: 'native',
    origin: 'Tamil Nadu, India',
    overview: 'Lean, fast, and resilient native sighthound that thrives on exercise and skin-friendly care.',
    diet: [
      'Lean protein with moderate carbohydrates',
      'Use breed-specific portions for active dogs',
      'Track weight and energy levels regularly'
    ],
    vaccination: ['Rabies', 'DHPPiL', 'Bordetella', 'Leptospirosis'],
    grooming: ['Brush twice a week', 'Bath every 4 weeks', 'Check paws after outdoor runs'],
    risks: ['Skin irritation', 'Tick exposure', 'Digestive sensitivity']
  }
];

export const diseaseRules = [
  {
    keywords: ['itch', 'itching', 'scratches', 'hair loss', 'scab', 'scabs', 'rash'],
    label: 'Skin allergy or mange',
    advice: 'Clean the coat, inspect for ticks, and consult a veterinarian for skin treatment.'
  },
  {
    keywords: ['vomit', 'vomiting', 'diarrhea', 'bloody stool', 'loss of appetite'],
    label: 'Digestive disorder or infection',
    advice: 'Observe hydration and seek veterinary advice quickly, especially if symptoms persist.'
  },
  {
    keywords: ['fever', 'lethargic', 'weak', 'sleepy', 'low energy'],
    label: 'Infection or systemic illness',
    advice: 'Monitor temperature and behavior closely and book a vet review.'
  },
  {
    keywords: ['cough', 'sneeze', 'breath', 'respiratory'],
    label: 'Respiratory issue',
    advice: 'Reduce exposure, keep the dog calm, and consult a veterinarian.'
  },
  {
    keywords: ['limp', 'joint', 'hip', 'difficulty rising', 'stiff'],
    label: 'Joint or mobility issue',
    advice: 'Limit intense exercise and ask a vet to assess joint health.'
  }
];

export const moduleLabels = {
  overview: 'Health Overview',
  diet: 'Growth & Diet',
  disease: 'Disease Prediction',
  grooming: 'Grooming Reminders',
  vaccines: 'Vaccination Tracking',
  breed: 'Breed-Specific Care'
};

export function normalizeBreedName(input) {
  return (input || '').trim().toLowerCase();
}

export function findBreedByName(name) {
  const normalized = normalizeBreedName(name);
  return targetBreeds.find((breed) => breed.name.toLowerCase() === normalized) || null;
}

export function predictDisease(symptoms) {
  const normalized = normalizeBreedName(symptoms);

  if (!normalized) {
    return [];
  }

  const matches = diseaseRules.filter((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword))
  );

  return matches.length > 0
    ? matches
    : [{ label: 'No direct match found', advice: 'Use the symptoms as a warning sign and consult a veterinarian for a proper diagnosis.' }];
}
