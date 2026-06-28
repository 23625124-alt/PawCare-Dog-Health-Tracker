import React, { useEffect, useMemo, useState } from 'react';
import Login from './components/Auth/Login';
import SimpleUserManual from './components/SimpleUserManual';
import {
  findBreedByName,
  moduleLabels,
  predictDisease,
  targetBreeds
} from './data/pawcareData';

const STORAGE_KEYS = {
  auth: 'pawcare.auth',
  pet: 'pawcare.pet',
  vaccine: 'pawcare.vaccine',
  grooming: 'pawcare.grooming',
  health: 'pawcare.health'
};

const modules = ['overview', 'vaccines', 'diet', 'disease', 'grooming', 'breed'];

const colors = {
  background: '#08111f',
  panel: 'rgba(15, 23, 42, 0.9)',
  panelSoft: 'rgba(255,255,255,0.05)',
  line: 'rgba(255,255,255,0.12)',
  text: '#eef5ff',
  muted: '#9fb0c9',
  accent: '#f4b860',
  accent2: '#68d391',
  danger: '#ff7b72'
};

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatDate(value) {
  if (!value) return 'Not set';
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function Container({ children, style }) {
  return (
    <div
      style={{
        background: colors.panel,
        border: `1px solid ${colors.line}`,
        borderRadius: 24,
        padding: 24,
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
        ...style
      }}
    >
      {children}
    </div>
  );
}

function TitleBlock({ eyebrow, title, description }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ color: colors.accent, textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>
        {eyebrow}
      </div>
      <h2 style={{ margin: 0, color: colors.text, fontSize: 28 }}>{title}</h2>
      {description ? <p style={{ margin: '8px 0 0', color: colors.muted, lineHeight: 1.7 }}>{description}</p> : null}
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div style={{ padding: 18, borderRadius: 18, border: `1px dashed ${colors.line}`, background: 'rgba(255,255,255,0.03)', color: colors.muted, lineHeight: 1.7 }}>
      <div style={{ color: '#fff', fontWeight: 800, marginBottom: 4 }}>{title}</div>
      {description}
    </div>
  );
}

function App() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [phase, setPhase] = useState('login');
  const [activeModule, setActiveModule] = useState('overview');
  const [pet, setPet] = useState(null);
  const [vaccineReminders, setVaccineReminders] = useState([]);
  const [groomingReminders, setGroomingReminders] = useState([]);
  const [healthNotes, setHealthNotes] = useState([]);
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const [vaccineForm, setVaccineForm] = useState({ name: '', dueDate: '', notes: '' });
  const [groomForm, setGroomForm] = useState({ task: '', dueDate: '', notes: '' });
  const [healthForm, setHealthForm] = useState({ title: '', note: '' });

  useEffect(() => {
    const savedAuth = readJson(STORAGE_KEYS.auth, false);
    const savedPet = readJson(STORAGE_KEYS.pet, null);
    setAuthenticated(Boolean(savedAuth));
    setPet(savedPet);
    setVaccineReminders(readJson(STORAGE_KEYS.vaccine, []));
    setGroomingReminders(readJson(STORAGE_KEYS.grooming, []));
    setHealthNotes(readJson(STORAGE_KEYS.health, []));
    setPhase(savedAuth ? (savedPet ? 'app' : 'setup') : 'login');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeJson(STORAGE_KEYS.auth, authenticated);
  }, [authenticated, ready]);

  useEffect(() => {
    if (!ready) return;
    writeJson(STORAGE_KEYS.pet, pet);
  }, [pet, ready]);

  useEffect(() => {
    if (!ready) return;
    writeJson(STORAGE_KEYS.vaccine, vaccineReminders);
  }, [vaccineReminders, ready]);

  useEffect(() => {
    if (!ready) return;
    writeJson(STORAGE_KEYS.grooming, groomingReminders);
  }, [groomingReminders, ready]);

  useEffect(() => {
    if (!ready) return;
    writeJson(STORAGE_KEYS.health, healthNotes);
  }, [healthNotes, ready]);

  const breed = useMemo(() => findBreedByName(pet?.breed) || targetBreeds[0], [pet]);

  const weeklyDiet = useMemo(() => {
    const planBySize = {
      small: [
        ['Small-breed kibble with egg', 'Pumpkin and curd', 'Chicken mince and rice'],
        ['Oats with banana mash', 'Boiled carrot and paneer', 'Light chicken stew'],
        ['Curd rice with fish', 'Steamed sweet potato', 'Balanced small-breed kibble'],
        ['Egg and rice bowl', 'Cucumber-curd mix', 'Chicken and pumpkin mash'],
        ['Millet porridge with egg', 'Soft veggie mix', 'Lean meat with rice'],
        ['Small-breed kibble', 'Apple slices in moderation', 'Chicken broth with rice'],
        ['Rice flakes and egg', 'Pumpkin mash', 'Light meat and vegetable bowl']
      ],
      medium: [
        ['Chicken rice with vegetables', 'Pumpkin and curd bowl', 'Fish and rice mix'],
        ['Oats, egg, and spinach', 'Sweet potato mash', 'Chicken stew with rice'],
        ['Millet porridge with lean meat', 'Carrot and curd mix', 'Fish broth and rice'],
        ['Rice with scrambled egg', 'Pumpkin and lentil mash', 'Chicken and vegetable bowl'],
        ['Oats with chicken', 'Curd rice', 'Steamed vegetables with fish'],
        ['Ragi porridge with egg', 'Sweet potato and pumpkin', 'Lean meat and rice'],
        ['Rice, egg, and carrots', 'Curd and cucumber', 'Chicken broth with millet']
      ],
      large: [
        ['High-protein chicken rice', 'Pumpkin and lentil mash', 'Fish stew with rice'],
        ['Oats with egg and chicken', 'Vegetable rice bowl', 'Lean meat with curd rice'],
        ['Millet and meat porridge', 'Sweet potato and carrot mix', 'Chicken broth with rice'],
        ['Rice with boiled egg', 'Pumpkin and chicken mash', 'Fish with vegetables'],
        ['Ragi porridge with curd', 'Lean meat and rice', 'Steamed veggies and chicken'],
        ['Chicken and rice bowl', 'Curd and carrot mix', 'Fish broth with millet'],
        ['Egg, rice, and spinach', 'Pumpkin mash', 'Lean meat and rice']
      ]
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const template = planBySize[breed?.name === 'Pomeranian' ? 'small' : breed?.type === 'native' ? 'medium' : breed?.name === 'German Shepherd' || breed?.name === 'Labrador Retriever' ? 'large' : 'medium'];

    return days.map((day, index) => ({
      day,
      breakfast: template[index][0],
      lunch: template[index][1],
      dinner: template[index][2]
    }));
  }, [breed]);

  function handleLogin() {
    setAuthenticated(true);
    setPhase('setup');
  }

  function handleSetupCompleted(petData) {
    const matchedBreed = findBreedByName(petData.breed) || targetBreeds[0];
    setPet({
      ...petData,
      breed: matchedBreed.name,
      breedType: matchedBreed.type,
      createdAt: new Date().toISOString()
    });
    setPhase('app');
    setActiveModule('overview');
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.auth);
    localStorage.removeItem(STORAGE_KEYS.pet);
    localStorage.removeItem(STORAGE_KEYS.vaccine);
    localStorage.removeItem(STORAGE_KEYS.grooming);
    localStorage.removeItem(STORAGE_KEYS.health);
    setAuthenticated(false);
    setPhase('login');
    setPet(null);
    setVaccineReminders([]);
    setGroomingReminders([]);
    setHealthNotes([]);
    setSymptoms('');
    setPrediction(null);
    setActiveModule('overview');
  }

  function addVaccinationReminder(event) {
    event.preventDefault();
    if (!vaccineForm.name || !vaccineForm.dueDate) return;
    setVaccineReminders((current) => [{ id: Date.now(), ...vaccineForm }, ...current]);
    setVaccineForm({ name: '', dueDate: '', notes: '' });
  }

  function addGroomingReminder(event) {
    event.preventDefault();
    if (!groomForm.task || !groomForm.dueDate) return;
    setGroomingReminders((current) => [{ id: Date.now(), ...groomForm }, ...current]);
    setGroomForm({ task: '', dueDate: '', notes: '' });
  }

  function addHealthNote(event) {
    event.preventDefault();
    if (!healthForm.title && !healthForm.note) return;
    setHealthNotes((current) => [{ id: Date.now(), ...healthForm, title: healthForm.title || 'Health note' }, ...current]);
    setHealthForm({ title: '', note: '' });
  }

  function runPrediction() {
    setPrediction(predictDisease(symptoms));
  }

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: colors.background, color: colors.text }}>
        Loading PawCare...
      </div>
    );
  }

  if (phase === 'login') {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: `radial-gradient(circle at top, rgba(244,184,96,0.16), transparent 30%), ${colors.background}`, padding: 24 }}>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  if (phase === 'setup' || !pet) {
    return (
      <div style={{ minHeight: '100vh', background: `radial-gradient(circle at top, rgba(104,211,145,0.12), transparent 28%), ${colors.background}`, padding: 24, color: colors.text }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: colors.accent, textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>PawCare setup</div>
            <h1 style={{ margin: 0, fontSize: 44 }}>Set up your dog profile</h1>
            <p style={{ color: colors.muted, lineHeight: 1.7, maxWidth: 720 }}>
              The paper describes a MERN app for vaccination tracking, growth and diet monitoring, disease prediction, grooming reminders, and breed-specific recommendations.
            </p>
          </div>
          <SimpleUserManual onComplete={handleSetupCompleted} />
        </div>
      </div>
    );
  }

  const vaccineSummary = vaccineReminders[0]?.dueDate || 'Add reminder';
  const groomingSummary = groomingReminders[0]?.dueDate || 'Add reminder';

  const navButtonStyle = (active) => ({
    border: `1px solid ${active ? colors.accent : colors.line}`,
    background: active ? 'rgba(244,184,96,0.14)' : 'rgba(255,255,255,0.04)',
    color: active ? '#fff' : colors.muted,
    borderRadius: 999,
    padding: '10px 14px',
    cursor: 'pointer',
    fontWeight: 700
  });

  return (
    <div style={{ minHeight: '100vh', background: `radial-gradient(circle at top, rgba(244,184,96,0.12), transparent 30%), linear-gradient(180deg, #08111f 0%, #0d1728 100%)`, padding: 24, color: colors.text }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Container style={{ marginBottom: 20, background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ maxWidth: 760 }}>
              <div style={{ color: colors.accent, textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 10 }}>PawCare</div>
              <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.05 }}>Dog health, diet, grooming, and vaccination in one place.</h1>
              <p style={{ color: colors.muted, lineHeight: 1.75, fontSize: 16, marginTop: 16 }}>
                {pet.petName} is set up as a {breed.type} breed profile for {breed.name}. This dashboard keeps the core paper features in one workflow.
              </p>
            </div>
            <div style={{ minWidth: 260, flex: '0 0 260px' }}>
              <Container style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ color: colors.muted, fontSize: 13 }}>Current pet</div>
                <div style={{ fontSize: 24, fontWeight: 900, marginTop: 6 }}>{pet.petName}</div>
                <div style={{ marginTop: 8 }}>{breed.name}</div>
                <div style={{ color: colors.muted, lineHeight: 1.6, marginTop: 10 }}>
                  Age: {pet.age || 'N/A'} years
                  <br />
                  Weight: {pet.weight || 'N/A'} kg
                </div>
                <button onClick={handleLogout} style={{ marginTop: 16, width: '100%', borderRadius: 14, border: `1px solid ${colors.line}`, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', color: '#fff', cursor: 'pointer', fontWeight: 800 }}>
                  Reset session
                </button>
              </Container>
            </div>
          </div>
        </Container>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {modules.map((module) => (
            <button key={module} onClick={() => setActiveModule(module)} style={navButtonStyle(activeModule === module)}>
              {moduleLabels[module]}
            </button>
          ))}
        </div>

        {activeModule === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Container><div style={{ color: colors.muted }}>Breed type</div><div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{breed.type === 'native' ? 'Native breed' : 'Foreign breed'}</div><div style={{ color: colors.muted, marginTop: 10 }}>{breed.origin}</div></Container>
            <Container><div style={{ color: colors.muted }}>Vaccination</div><div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{vaccineSummary}</div><div style={{ color: colors.muted, marginTop: 10 }}>Keep protection current with reminders.</div></Container>
            <Container><div style={{ color: colors.muted }}>Grooming</div><div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{groomingSummary}</div><div style={{ color: colors.muted, marginTop: 10 }}>Preventive hygiene matters.</div></Container>
            <Container><div style={{ color: colors.muted }}>Diet focus</div><div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{breed.diet[0]}</div><div style={{ color: colors.muted, marginTop: 10 }}>Breed-specific growth and diet guidance.</div></Container>

            <Container style={{ gridColumn: '1 / -1' }}>
              <TitleBlock eyebrow="Paper summary" title="Five core features" description="This dashboard mirrors the paper's scope with a simple, practical workflow." />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                <FeatureCard title="Vaccination Tracking" text="Track vaccine schedules and add reminders." icon="💉" />
                <FeatureCard title="Growth and Diet Monitoring" text="Choose a day and review a breed-matched meal plan." icon="🥗" />
                <FeatureCard title="Disease Prediction" text="Enter symptoms to get a rule-based early warning." icon="🩺" />
                <FeatureCard title="Grooming and Hygiene" text="Log baths, brushing, nail care, and other reminders." icon="✂️" />
                <FeatureCard title="Breed-Specific Recommendations" text="Review care guidance for the paper's target breeds." icon="🐾" />
              </div>
            </Container>

            <Container style={{ gridColumn: '1 / -1' }}>
              <TitleBlock eyebrow="Pet record" title="Health notes" description="Store simple records that you would otherwise keep on paper." />
              <form onSubmit={addHealthNote} style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
                <input value={healthForm.title} onChange={(event) => setHealthForm((current) => ({ ...current, title: event.target.value }))} placeholder="Record title" style={inputStyle()} />
                <textarea value={healthForm.note} onChange={(event) => setHealthForm((current) => ({ ...current, note: event.target.value }))} rows={4} placeholder="Write a health note" style={inputStyle(true)} />
                <button type="submit" style={primaryButtonStyle(colors.accent2)}>Save health note</button>
              </form>
              {healthNotes.length === 0 ? <EmptyState title="No health notes yet" description="Add the first record to keep the dog care history organized." /> : <RecordList items={healthNotes} emptyLabel="No health notes" renderItem={(item) => <><div style={{ color: '#fff', fontWeight: 800 }}>{item.title}</div><div style={{ color: colors.muted, marginTop: 6 }}>{item.note}</div><div style={{ color: colors.accent, marginTop: 8, fontSize: 13 }}>{formatDate(item.createdAt)}</div></>} />}
            </Container>
          </div>
        )}

        {activeModule === 'vaccines' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 }}>
            <Container>
              <TitleBlock eyebrow="Vaccination tracking" title="Recommended vaccines" description="The paper emphasizes scheduled vaccination reminders for better preventive care." />
              <RecordList
                items={breed.vaccination.map((item) => ({ id: item, title: item, note: 'Recommended for this breed' }))}
                emptyLabel="No vaccines"
                renderItem={(item) => <><div style={{ color: '#fff', fontWeight: 800 }}>{item.title}</div><div style={{ color: colors.muted, marginTop: 6 }}>{item.note}</div></>}
              />
            </Container>
            <Container>
              <TitleBlock eyebrow="Reminder manager" title="Add vaccination reminder" description="Store upcoming vaccine dates directly in the browser." />
              <form onSubmit={addVaccinationReminder} style={{ display: 'grid', gap: 12 }}>
                <input value={vaccineForm.name} onChange={(event) => setVaccineForm((current) => ({ ...current, name: event.target.value }))} placeholder="Vaccine name" style={inputStyle()} />
                <input type="date" value={vaccineForm.dueDate} onChange={(event) => setVaccineForm((current) => ({ ...current, dueDate: event.target.value }))} style={inputStyle()} />
                <textarea value={vaccineForm.notes} onChange={(event) => setVaccineForm((current) => ({ ...current, notes: event.target.value }))} placeholder="Notes" rows={3} style={inputStyle(true)} />
                <button type="submit" style={primaryButtonStyle(colors.accent2)}>Save reminder</button>
              </form>
              <div style={{ marginTop: 18 }}>{vaccineReminders.length === 0 ? <EmptyState title="No reminders" description="Create the first vaccination reminder." /> : <RecordList items={vaccineReminders} emptyLabel="No reminders" renderItem={(item) => <><div style={{ color: '#fff', fontWeight: 800 }}>{item.name}</div><div style={{ color: colors.muted, marginTop: 6 }}>{item.notes || 'No notes'}</div><div style={{ color: colors.accent, marginTop: 8 }}>{formatDate(item.dueDate)}</div></>} />}</div>
            </Container>
          </div>
        )}

        {activeModule === 'diet' && (
          <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 20 }}>
            <Container>
              <TitleBlock eyebrow="Growth monitoring" title="Breed nutrition profile" description="The paper says users should select a breed and get a recommended diet plan."
              />
              <div style={{ display: 'grid', gap: 12 }}>
                <InfoBox label="Daily energy target" value={breed.name === 'Pomeranian' ? '300 - 500 kcal' : breed.type === 'native' ? '650 - 850 kcal' : '900 - 1,200 kcal'} />
                <InfoBox label="Meal cadence" value={breed.name === 'Pomeranian' ? '3 small meals per day' : '2 structured meals per day'} />
                <InfoBox label="Protein focus" value={breed.name === 'German Shepherd' ? 'High protein with joint support' : 'Balanced protein with controlled fat'} />
              </div>
            </Container>
            <Container>
              <TitleBlock eyebrow="Weekly plan" title="Meal rotation" description="Choose a day to inspect the recommended feed plan." />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                {weeklyDiet.map((entry) => (
                  <button key={entry.day} onClick={() => setSelectedDay(entry.day)} style={navButtonStyle(selectedDay === entry.day)}>
                    {entry.day}
                  </button>
                ))}
              </div>
              {weeklyDiet.filter((entry) => entry.day === selectedDay).map((entry) => (
                <div key={entry.day} style={{ display: 'grid', gap: 12 }}>
                  <InfoBox label={entry.day} value={`Breakfast: ${entry.breakfast}`} />
                  <InfoBox label="Lunch" value={entry.lunch} />
                  <InfoBox label="Dinner" value={entry.dinner} />
                </div>
              ))}
            </Container>
          </div>
        )}

        {activeModule === 'disease' && (
          <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 20 }}>
            <Container>
              <TitleBlock eyebrow="Disease prediction" title="Rule-based symptom check" description="The paper's disease prediction feature is represented here as a simple keyword-based early warning tool." />
              <textarea value={symptoms} onChange={(event) => setSymptoms(event.target.value)} rows={8} placeholder="Examples: vomiting, itching, fever, limp, coughing, appetite loss" style={inputStyle(true)} />
              <button onClick={runPrediction} style={{ ...primaryButtonStyle(colors.accent), marginTop: 14 }}>Predict risk</button>
              <div style={{ marginTop: 16, color: colors.muted, lineHeight: 1.7 }}>{breed.overview}</div>
            </Container>
            <Container>
              <TitleBlock eyebrow="Results" title="Prediction output" description="Use this as a warning sign, not a diagnosis." />
              {!prediction ? (
                <EmptyState title="No prediction yet" description="Enter symptoms and press Predict risk to see a result." />
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {prediction.map((item) => (
                    <InfoBox key={item.label} label={item.label} value={item.advice} valueStyle={{ color: item.label === 'No direct match found' ? colors.muted : '#fff', lineHeight: 1.7 }} />
                  ))}
                </div>
              )}
            </Container>
          </div>
        )}

        {activeModule === 'grooming' && (
          <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 20 }}>
            <Container>
              <TitleBlock eyebrow="Grooming and hygiene" title="Breed care routine" description="Preventive grooming is one of the paper's core wellness pillars." />
              <div style={{ display: 'grid', gap: 12 }}>
                {breed.grooming.map((item) => <InfoBox key={item} label="Routine" value={item} />)}
              </div>
            </Container>
            <Container>
              <TitleBlock eyebrow="Reminder manager" title="Add grooming reminder" description="Track baths, brushing, nail trims, and dental care." />
              <form onSubmit={addGroomingReminder} style={{ display: 'grid', gap: 12 }}>
                <input value={groomForm.task} onChange={(event) => setGroomForm((current) => ({ ...current, task: event.target.value }))} placeholder="Grooming task" style={inputStyle()} />
                <input type="date" value={groomForm.dueDate} onChange={(event) => setGroomForm((current) => ({ ...current, dueDate: event.target.value }))} style={inputStyle()} />
                <textarea value={groomForm.notes} onChange={(event) => setGroomForm((current) => ({ ...current, notes: event.target.value }))} placeholder="Notes" rows={3} style={inputStyle(true)} />
                <button type="submit" style={primaryButtonStyle(colors.accent2)}>Save reminder</button>
              </form>
              <div style={{ marginTop: 18 }}>{groomingReminders.length === 0 ? <EmptyState title="No grooming reminders" description="Add the first grooming reminder." /> : <RecordList items={groomingReminders} emptyLabel="No grooming reminders" renderItem={(item) => <><div style={{ color: '#fff', fontWeight: 800 }}>{item.task}</div><div style={{ color: colors.muted, marginTop: 6 }}>{item.notes || 'No notes'}</div><div style={{ color: colors.accent, marginTop: 8 }}>{formatDate(item.dueDate)}</div></>} />}</div>
            </Container>
          </div>
        )}

        {activeModule === 'breed' && (
          <Container>
            <TitleBlock eyebrow="Breed-specific recommendations" title={breed.name} description="The paper highlights native Tamil Nadu breeds alongside the selected foreign breeds." />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 18 }}>
              <InfoBox label="Origin" value={breed.origin} />
              <InfoBox label="Type" value={breed.type === 'native' ? 'Native breed' : 'Foreign breed'} />
              <InfoBox label="Overview" value={breed.overview} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <ListCard title="Diet focus" items={breed.diet} />
              <ListCard title="Vaccination focus" items={breed.vaccination} />
              <ListCard title="Common risks" items={breed.risks} />
            </div>
          </Container>
        )}
      </div>
    </div>
  );
}

function FeatureCard({ title, text, icon }) {
  return (
    <div style={{ padding: 18, borderRadius: 18, border: `1px solid ${colors.line}`, background: 'rgba(255,255,255,0.04)' }}>
      <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
      <div style={{ color: '#fff', fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ color: colors.muted, lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

function InfoBox({ label, value, valueStyle }) {
  return (
    <div style={{ padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.line}` }}>
      <div style={{ color: colors.accent, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ color: '#fff', fontWeight: 700, marginTop: 8, lineHeight: 1.7, ...(valueStyle || {}) }}>{value}</div>
    </div>
  );
}

function ListCard({ title, items }) {
  return (
    <div style={{ padding: 18, borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.line}` }}>
      <div style={{ color: '#fff', fontWeight: 800, marginBottom: 10 }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 18, color: colors.muted, lineHeight: 1.8 }}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function RecordList({ items, renderItem, emptyLabel }) {
  if (!items.length) {
    return <EmptyState title={emptyLabel} description="Nothing has been saved yet." />;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map((item) => (
        <div key={item.id} style={{ padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.line}` }}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

function inputStyle(multiline = false) {
  return {
    width: '100%',
    borderRadius: 14,
    border: `1px solid ${colors.line}`,
    background: 'rgba(255,255,255,0.03)',
    color: '#fff',
    padding: '12px 14px',
    resize: multiline ? 'vertical' : 'none'
  };
}

function primaryButtonStyle(background) {
  return {
    border: 'none',
    borderRadius: 14,
    padding: '12px 14px',
    background,
    color: '#172033',
    fontWeight: 800,
    cursor: 'pointer'
  };
}

export default App;