# Interactive Data Science Learning Experience | IDSE Project

An educational project that combines practical machine learning with interactive learning through games. The project explores two different ways of understanding Data Science: building predictive models from structured data and learning classification concepts through an interactive game.

## Project Overview

This repository consists of two independent components:

| Component | Part A | Part B |
|---|---|---|
| Project | House Price Prediction | Elements Classification Game |
| Type | Machine Learning Pipeline | Interactive 2D Game |
| Main concept | Regression | Classification |
| Objective | Estimate residential property prices | Understand classification through gameplay |
| Technologies | Python, Pandas, Scikit-learn | HTML, CSS, JavaScript |
| Output | Predictions, model evaluation and visualizations | Interactive levels, challenges and learning experience |

---

# Part A: House Price Prediction

### Overview

A machine learning project that explores how different property characteristics influence residential house prices.

The objective is to develop a regression model that estimates property prices using features such as location, built-up area, number of bedrooms, property age, furnishing status and other housing attributes.

### Data Science Pipeline

The project follows a complete machine learning workflow:

1. **Data Collection:** Prepare a structured housing dataset containing property characteristics and corresponding prices.
2. **Data Cleaning:** Handle missing values, identify duplicates and prepare the dataset.
3. **Exploratory Data Analysis:** Study distributions, correlations, price patterns and relationships between features.
4. **Feature Engineering:** Encode categorical variables, scale numerical features and prepare inputs.
5. **Model Development:** Train and compare Linear Regression, Ridge Regression, Random Forest and Extra Trees.
6. **Hyperparameter Tuning:** Improve model performance using cross-validation.
7. **Model Evaluation:** Compare models using MAE, RMSE and R² scores.
8. **Prediction Interface:** Use the trained model to estimate house prices through an interactive application.

### Technologies Used

Python | Pandas | NumPy | Matplotlib | Seaborn | Scikit-learn | Streamlit

### Project Files

Explore the complete implementation, Jupyter notebooks, datasets, trained models and analysis:

[Open Part A – House Price Prediction](./Part_A_House_Price_Prediction/)

### Running the Project

```bash
cd Part_A_House_Price_Prediction
pip install -r requirements.txt
streamlit run app.py
```

*Note: The bundled dataset is synthetically generated for academic demonstration and is not actual property transaction data.*

---

# Part B: Elements Classification Game

### Overview

An interactive 2D fantasy adventure game designed to make the concepts of Data Science and classification more engaging.

The game introduces elemental characters and challenges built around different elements such as Fire, Water, Ice and Earth. Players progress through different chapters, interact with elements and encounter classification-based challenges.

Rather than simply reading about classification, players learn through interaction, experimentation and gameplay.

### Key Features

- Interactive 2D gameplay with movable characters.
- Multiple chapters and progressively challenging levels.
- Element-based classification challenges.
- Interactive objects, abilities and power-ups.
- Keyboard-based movement and interaction.
- A fantasy-inspired learning environment.

### Learning Objective

The game aims to introduce classification as a decision-making process, helping players understand how different inputs and characteristics can be used to assign objects to categories.

### Play the Game

[Play the Elements Classification Game](https://akshithkumarlakkakula-ux.github.io/IDSE_Project/)

### Technologies Used

HTML | CSS | JavaScript

---

# Repository Structure

```text
IDSE_Project/
│
├── README.md
│
├── Part_A_House_Price_Prediction/
│   ├── README.md
│   ├── app.py
│   ├── requirements.txt
│   ├── data/
│   ├── notebooks/
│   ├── src/
│   ├── models/
│   ├── outputs/
│   └── report/
│
├── Part_B_Elements_Classification_Game/
│   ├── index.html
│   └── assets/
│
└── .github/
    └── workflows/
        └── deploy-game.yml
```

---

## Project Objective

The overall objective is to explore Data Science through both implementation and interaction. Part A focuses on applying machine learning techniques to a real-world style prediction problem, while Part B transforms classification concepts into an interactive learning experience.

Together, these projects demonstrate how data-driven models and interactive applications can make technical concepts easier to understand and apply.

---

**Academic Project | Introduction to Data Science and Engineering (IDSE)**
