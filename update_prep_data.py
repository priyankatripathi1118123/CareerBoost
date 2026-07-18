import json
import os

file_path = 'backend/data/prep_data.json'
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update Quantitative Aptitude Notes
percentage_note = {
    "topic": "Percentage",
    "content": """### Definition of Percentage
- **Meaning of Percentage**: "Per Hundred"
- **Percentage Symbol**: (%)

**Examples:**
- 25% = 25 out of 100
- 50% = 50/100 = 1/2
- 100% = Complete value

### Important Formulas
**1. Percentage Formula**
Percentage = (Part / Whole) × 100
*Example: Out of 200 students, 50 passed.*
Percentage = (50 / 200) × 100 = 25%

**2. Percentage Increase**
Percentage Increase = (Increase / Original Value) × 100
*Example: Price increased from ₹500 to ₹600.*
Increase = ₹100
Percentage Increase = (100 / 500) × 100 = 20%

**3. Percentage Decrease**
Percentage Decrease = (Decrease / Original Value) × 100
*Example: Salary decreased from ₹40,000 to ₹36,000.*
Decrease = ₹4,000
Percentage Decrease = (4000 / 40000) × 100 = 10%

**4. Find Value from Percentage**
Value = (Percentage / 100) × Total
*Example: 20% of 300*
= (20 / 100) × 300
= 60

**5. Percentage Change Formula**
(New Value − Old Value) / Old Value × 100

### Short Tricks
- 50% = Half
- 25% = One-fourth
- 20% = One-fifth
- 10% = Divide by 10
- 5% = Half of 10%
- 1% = Divide by 100

### Solved Examples
**Example 1:**
Find 30% of 500.
*Solution:*
30 / 100 × 500 = 150
*Answer:* 150

**Example 2:**
What percent of 80 is 20?
*Solution:*
(20 / 80) × 100 = (1/4) × 100 = 25%
*Answer:* 25%

**Example 3:**
A number is increased by 20% and then decreased by 20%. What is the net change?
*Solution:*
Net change = (x^2 / 100)% decrease = (20^2 / 100)% = 400 / 100 = 4% decrease.
*Answer:* 4% decrease

**Example 4:**
If the price of sugar increases by 25%, by what percent should a family decrease its consumption to keep the expenditure same?
*Solution:*
Formula: (R / (100+R)) * 100 = (25 / 125) * 100 = (1/5) * 100 = 20%
*Answer:* 20%

**Example 5:**
In an election between two candidates, one got 55% of the total valid votes, 20% of the votes were invalid. If the total number of votes was 7500, what was the number of valid votes that the other candidate got?
*Solution:*
Valid votes = 80% of 7500 = 6000
First candidate got = 55% of 6000 = 3300
Other candidate got = 6000 - 3300 = 2700
*Answer:* 2700"""
}

# Insert at the beginning of notes
data["quantitative"]["notes"].insert(0, percentage_note)

# Update MCQs
percentage_mcqs = [
    {
        "id": "pct_q1",
        "question": "What is 25% of 400?",
        "options": ["80", "90", "100", "120"],
        "answer": 2,
        "explanation": "25% = 25/100\n25/100 × 400 = 100\nStep-by-step Solution: Multiply the total value by the fraction equivalent of the percentage."
    },
    {
        "id": "pct_q2",
        "question": "50 is what percent of 200?",
        "options": ["20%", "25%", "30%", "40%"],
        "answer": 1,
        "explanation": "(50/200) × 100 = 25%\nStep-by-step Solution: Divide the part by the whole and multiply by 100."
    },
    {
        "id": "pct_q3",
        "question": "20% of 250 = ?",
        "options": ["40", "45", "50", "55"],
        "answer": 2,
        "explanation": "20/100 × 250 = 50\nStep-by-step Solution: 20% is 1/5th. 250 / 5 = 50."
    },
    {
        "id": "pct_q4",
        "question": "A price increased from ₹500 to ₹600. Percentage increase?",
        "options": ["15%", "18%", "20%", "25%"],
        "answer": 2,
        "explanation": "Increase = 100\n100/500 × 100 = 20%\nStep-by-step Solution: Find the difference, divide by the original price, and multiply by 100."
    },
    {
        "id": "pct_q5",
        "question": "75% of 80 equals",
        "options": ["55", "60", "65", "70"],
        "answer": 1,
        "explanation": "75/100 × 80 = (3/4) × 80 = 3 × 20 = 60\nStep-by-step Solution: 75% is equivalent to 3/4."
    },
    {
        "id": "pct_q6",
        "question": "10% of 900 equals",
        "options": ["80", "85", "90", "100"],
        "answer": 2,
        "explanation": "10/100 × 900 = 90\nStep-by-step Solution: Finding 10% is simply dividing the number by 10."
    },
    {
        "id": "pct_q7",
        "question": "40 is what percent of 160?",
        "options": ["20%", "22%", "25%", "30%"],
        "answer": 2,
        "explanation": "(40/160) × 100 = (1/4) × 100 = 25%\nStep-by-step Solution: Divide the part by the whole and multiply by 100."
    },
    {
        "id": "pct_q8",
        "question": "A student gets 45 marks out of 60. Percentage?",
        "options": ["70%", "72%", "75%", "80%"],
        "answer": 2,
        "explanation": "(45/60) × 100 = (3/4) × 100 = 75%\nStep-by-step Solution: Find the ratio and multiply by 100."
    },
    {
        "id": "pct_q9",
        "question": "15% of 200 equals",
        "options": ["25", "30", "35", "40"],
        "answer": 1,
        "explanation": "15/100 × 200 = 30\nStep-by-step Solution: Multiply the total by the percentage fraction."
    },
    {
        "id": "pct_q10",
        "question": "A number increased by 10% becomes 220. Find the original number.",
        "options": ["180", "190", "200", "210"],
        "answer": 2,
        "explanation": "Original × 1.10 = 220\nOriginal = 220 ÷ 1.10 = 200\nStep-by-step Solution: An increase of 10% means the new number is 110% of the original."
    }
]

data["quantitative"]["mcqs"] = percentage_mcqs

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print("Updated prep_data.json successfully with Percentage notes and MCQs.")
