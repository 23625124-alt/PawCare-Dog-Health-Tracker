import React, { useState } from 'react';
import './App.css';

// Example plan for Beagle. Extend to more breeds as needed.
const weeklyDietPlans = {
  "Beagle": [
    { day: 'Monday',
      meals: {
        morning: { food: "Cooked meat & rice", quantity: "100g rice + 70g meat", calories: 280, protein: "18g", fat: "6g" },
        afternoon: { food: "Boiled veggies & dal", quantity: "80g dal + 50g mixed veggies", calories: 135, protein: "9g", fat: "2g" },
        night: { food: "Curd rice", quantity: "120g rice + 40g curd", calories: 200, protein: "7g", fat: "3g" }
      }
    },
    { day: 'Tuesday',
      meals: {
        morning: { food: "Oats porridge & egg", quantity: "60g oats + 1 boiled egg", calories: 180, protein: "9g", fat: "4g" },
        afternoon: { food: "Fish stew with pumpkin", quantity: "40g fish + 50g pumpkin", calories: 140, protein: "10g", fat: "2.5g" },
        night: { food: "Ragi porridge", quantity: "80g ragi + 20g curd", calories: 125, protein: "5g", fat: "1g" }
      }
    },
    { day: 'Wednesday',
      meals: {
        morning: { food: "Carrot Rice with Chicken", quantity: "80g rice + 40g chicken + 30g carrot", calories: 190, protein: "12g", fat: "3g" },
        afternoon: { food: "Sweet Potato & Boiled Egg", quantity: "80g sweet potato + 1 egg", calories: 160, protein: "7g", fat: "5g" },
        night: { food: "Curd rice with spinach", quantity: "120g rice + 40g curd + 20g spinach", calories: 185, protein: "9g", fat: "4g" }
      }
    },
    { day: 'Thursday',
      meals: {
        morning: { food: "Rice and Fish Broth", quantity: "60g rice + 40g fish", calories: 160, protein: "11g", fat: "2g" },
        afternoon: { food: "Chicken and Peas", quantity: "80g chicken + 20g peas", calories: 185, protein: "16g", fat: "5g" },
        night: { food: "Pumpkin & apple salad", quantity: "60g pumpkin + 40g apple", calories: 95, protein: "2g", fat: "1g" }
      }
    },
    { day: 'Friday',
      meals: {
        morning: { food: "Oats & banana bowl", quantity: "60g oats + 1 banana", calories: 175, protein: "6g", fat: "2g" },
        afternoon: { food: "Dal rice and carrot", quantity: "80g rice + 40g dal + 20g carrot", calories: 132, protein: "8g", fat: "2g" },
        night: { food: "Boiled sweet potato", quantity: "80g sweet potato", calories: 70, protein: "1g", fat: "0g" }
      }
    },
    { day: 'Saturday',
      meals: {
        morning: { food: "Pumpkin & Chicken bowl", quantity: "90g chicken + 40g pumpkin", calories: 200, protein: "18g", fat: "4g" },
        afternoon: { food: "Tur Dal Khichdi", quantity: "45g dal + 100g rice", calories: 180, protein: "7g", fat: "2g" },
        night: { food: "Curd rice", quantity: "120g rice + 40g curd", calories: 200, protein: "7g", fat: "3g" }
      }
    },
    { day: 'Sunday',
      meals: {
        morning: { food: "Boiled Egg & Ragi", quantity: "1 egg + 70g ragi", calories: 160, protein: "12g", fat: "4g" },
        afternoon: { food: "Veggies and Chicken stew", quantity: "60g chicken + 40g vegetables", calories: 130, protein: "10g", fat: "4g" },
        night: { food: "Rice & Dal", quantity: "80g rice + 40g dal", calories: 110, protein: "5g", fat: "1g" }
      }
    }
  ]
};

function getFeedAmount(breed, meal) {
  if (breed === 'Beagle') return "Feed as per vet recommendation";
  return "Feed as per vet recommendation";
}

export default function DietPlan({ breed }) {
  const week = weeklyDietPlans[breed] || weeklyDietPlans["Beagle"];
  const days = week.map((entry) => entry.day);
  const [selectedDay, setSelectedDay] = useState(null);
  const selectedMeals = week.find(w => w.day === selectedDay)?.meals || {};

  return (
    <div className="card animate__animated animate__zoomIn" style={{
      background: '#fff9f0', marginBottom: 25, maxWidth: 600
    }}>
      <h2 className="title" style={{
        color:'#fb8500',
        margin: '2rem 0 0.4rem 0',
        fontSize: "2.3rem",
        textAlign: "center",
        fontWeight: 900
      }}>Nutritive Weekly Diet Plan for {breed}</h2>
      {/* Day selection */}
      {selectedDay == null ? (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: "18px", margin: '38px 0 22px 0' }}>
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                minWidth: 100,
                margin: '0 7px 18px',
                padding: '18px 0',
                borderRadius: 23,
                border: '2.5px solid #fb8500',
                background: '#fffbe0',
                color: '#fb8500',
                fontWeight: 700,
                fontSize: "1.19rem",
                letterSpacing: 1,
                cursor: 'pointer',
                boxShadow: '0 4px 14px #ffc97150',
                outline: "none",
                transition: "all 0.18s"
              }}>
              {day}
            </button>
          ))}
        </div>
      ) : (
        <>
          {/* Selected day's plan */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 30px 0' }}>
            <button
              style={{
                minWidth: 130,
                padding: '10px 36px',
                borderRadius: 18,
                border: '2.5px solid #fb8500',
                background: '#ffb703',
                color: '#fff',
                fontWeight: 900,
                fontSize: "1.17rem",
                letterSpacing: 1,
                cursor: 'default',
                boxShadow: '0 3px 7px #ffc97140',
                outline: "none"
              }}
              disabled
            >
              {selectedDay}
            </button>
          </div>
          <div style={{
            color: '#333', fontSize: 17,
            display:'flex', flexDirection:'column', gap:20
          }}>
            {["morning", "afternoon", "night"].map(time => (
              <div key={time} style={{
                marginBottom: 6,
                background: time === 'morning' ? '#fff0db' : time === 'afternoon' ? '#ffedd5' : '#ffe8cc',
                padding: 15, borderRadius: 13,
                boxShadow: '0 3px 10px #fce6c5'
              }}>
                <div style={{
                  fontWeight:"bold",
                  fontSize:19,
                  color:"#fb8500",
                  marginBottom: 2
                }}>
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </div>
                <div>
                  <span style={{fontWeight:600, color:'#ff7b00'}}>Food:</span> {selectedMeals[time]?.food || "N/A"}
                </div>
                <div>
                  <span style={{fontWeight:600, color:'#ff7b00'}}>Portion:</span> {selectedMeals[time]?.quantity || "N/A"}<br />
                  <span style={{fontWeight:600, color:'#ff7b00'}}>Calories:</span> {selectedMeals[time]?.calories || "N/A"} kcal<br />
                  <span style={{fontWeight:600, color:'#ff7b00'}}>Protein:</span> {selectedMeals[time]?.protein || "N/A"}<br />
                  <span style={{fontWeight:600, color:'#ff7b00'}}>Fat:</span> {selectedMeals[time]?.fat || "N/A"}
                </div>
                <div style={{marginTop: 7, color:'#e6780e', fontWeight:'bold'}}>
                  {getFeedAmount(breed, time)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <button
              onClick={() => setSelectedDay(null)}
              style={{
                marginTop: 10,
                background: '#fff',
                border: '2.5px solid #fb8500',
                color: '#fb8500',
                borderRadius: 16,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                padding: '7px 32px',
                boxShadow: '0 3px 15px #ffc97144',
                cursor: 'pointer',
                outline: 'none'
              }}>
              ← Back to Days
            </button>
          </div>
        </>
      )}
    </div>
  );
}
