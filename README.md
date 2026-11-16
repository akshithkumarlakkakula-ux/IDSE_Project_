# Interactive Data Science Learning Experience | IDSE Project

An educational project combining practical machine learning with interactive game-based learning. This repository explores two important areas of Data Science through a house price prediction pipeline and a fantasy-based classification game.

The idea is simple: learn Data Science not just by studying algorithms, but also by building models and experiencing how they work.

---

# Project Overview

This project consists of two independent components:

| | Part A | Part B |
|---|---|---|
| Project | House Price Prediction | Elemental: The Last Classifier |
| Domain | Machine Learning | Interactive 2D Game |
| Core Concept | Regression | Classification |
| Objective | Estimate residential property prices | Understand classification through gameplay |
| Technologies | Python, Pandas, Scikit-learn | HTML, CSS, JavaScript |

---

# Part A – House Price Prediction

## Overview

A machine learning project that explores how different residential property characteristics influence house prices.

The objective is to develop a regression model capable of estimating property prices using features such as location, built-up area, number of bedrooms, bathrooms, property age, furnishing status and other housing attributes.

## Data Science Pipeline

The project follows an end-to-end machine learning workflow:

1. **Data Collection:** Loading and understanding the housing dataset.
2. **Data Cleaning:** Handling missing values, identifying duplicates and preparing the dataset.
3. **Exploratory Data Analysis:** Studying distributions, correlations and relationships between housing attributes and prices.
4. **Data Preprocessing:** Handling numerical and categorical variables.
5. **Feature Engineering:** Preparing relevant features for model development.
6. **Model Building:** Training and comparing multiple regression algorithms.
7. **Model Evaluation:** Evaluating predictions using MAE, RMSE and R².
8. **Prediction Application:** Building an interactive interface for estimating house prices.

## Technologies Used

- Python
- Pandas and NumPy
- Matplotlib and Seaborn
- Scikit-learn
- Streamlit
- Jupyter Notebook

### Explore Part A

[View House Price Prediction – Source Code, Dataset, Notebooks and Results](./House_Price_Prediction/)

---

# Part B – Elemental: The Last Classifier

## Overview

**Four elements. One broken world. The power to classify.**

Elemental: The Last Classifier is an interactive 2D fantasy adventure designed to introduce the fundamentals of classification in Data Science through exploration, challenges and gameplay.

The player enters a fantasy world divided into four elemental classes: Fire, Water, Ice and Earth. By exploring different realms, studying mysterious creatures and understanding their characteristics, players discover how a machine learning classifier identifies and categorizes unknown data.

Instead of simply reading about classification, players learn through interaction, experimentation and decision-making.

## The Four Guardians

The game features four playable elemental guardians:

- **Kael – Fire:** The Ember Vanguard.
- **Mira – Water:** The Tide Weaver.
- **Eira – Ice:** The Frost Sentinel.
- **Thorne – Earth:** The Root Guardian.

Each guardian has a unique elemental ability that can be used throughout the adventure.

## The Five Realms

The adventure is divided into five chapters, each introducing a different classification concept.

| Chapter | Realm | Learning Concept |
|---|---|---|
| 1 | The Awakening | Features and Labels |
| 2 | Kingdom of Tides | Training Data and Label Quality |
| 3 | The Frozen Expanse | Train-Test Split and Accuracy |
| 4 | The Verdant Realm | Decision Boundaries and K |
| 5 | The Corrupted Core | Noisy Data and Classification |

## Understanding the Machine Learning Behind the Game

The game implements the **K-Nearest Neighbours (KNN)** algorithm directly in JavaScript.

Each creature is represented using four numerical features:

- Temperature
- Moisture
- Density
- Energy

Each feature is assigned a value between 0 and 100.

The classifier uses Euclidean distance to calculate the similarity between an unknown creature and labelled training examples.

It then identifies the K nearest neighbours and uses majority voting to predict the creature's elemental class. In case of a tie, the nearest neighbour helps determine the result.

The game includes 20 labelled creatures:

- 16 training samples.
- 4 unseen test samples.

Through this system, players explore how a classification model learns from labelled examples and predicts categories for previously unseen data.

## Key Game Features

**1. Interactive 2D Gameplay**
- Side-scrolling game environments.
- Keyboard-based character movement.
- Interactive objects, creatures and challenges.
- On-screen controls for touch devices.

**2. Elemental Abilities**
- Fireball – attacks enemies.
- Water Shield – provides protection.
- Freeze – temporarily freezes enemies.
- Stone Barrier – creates a defensive wall.

**3. Interactive Classifier Lab**

Players can experiment with the classification model by:
- Visualizing classification regions.
- Adjusting the value of K.
- Changing feature axes.
- Modifying the characteristics of an unknown creature.
- Observing predicted elemental classes.
- Testing predictions against unseen samples.

**4. Ancient Codex**

An in-game knowledge book introducing elemental guardians, abilities and classification concepts.

**5. Player Progression**
- Multiple player profiles.
- XP and collectible relics.
- Unlockable abilities.
- Chapter progression.
- Saved game progress.

## Game Controls

| Key | Action |
|---|---|
| Left / Right or A / D | Move character |
| E | Interact |
| Space | Use elemental ability |
| 1–4 or Q | Switch unlocked abilities |

Touch-screen players can use the on-screen controls.

## Technologies Used

- **HTML5:** Game structure and interface.
- **CSS3:** Visual design, animations and responsive layouts.
- **JavaScript:** Game mechanics, character movement, interactions and KNN implementation.
- **HTML Canvas:** Rendering the 2D environment and classifier visualizations.
- **LocalStorage:** Saving player profiles and game progress.

The game runs directly in the browser without requiring an external machine learning API or backend server.



### Elemental: The Last Classifier



Experience the five realms, choose your elemental guardian and explore the world of classification.

[View Game Source Code and Assets](./Elemental_The_Classifier_Game/)

---


## 🎮 Part 2: Elemental, The Last Classifier (playable game)

A fantasy game that teaches classification, powered by a KNN model written in JavaScript.

### ▶️ [Play the game in your browser](https://akshithkumarlakkakula-ux.github.io/IDSE_Project_/elemental-last-classifier/)

No installation needed. Works on desktop (best with a keyboard).
Code and details: [`elemental-last-classifier/`](./elemental-last-classifier)

# Repository Structure

```text
IDSE_Project/
│
├── README.md
│
├── House_Price_Prediction/
│   ├── README.md
│   ├── data/
│   ├── notebooks/
│   ├── src/
│   ├── models/
│   ├── outputs/
│   ├── report/
│   ├── app.py
│   └── requirements.txt
│
└── Elemental_The_Classifier_Game/
    ├── index.html
    ├── styles.css
    ├── game.js
    ├── assets/
    ├── README.md
    └── LICENSE
```

---

# Running the Projects

## Part A – House Price Prediction

Navigate to the project directory:

```bash
cd House_Price_Prediction
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Launch the interactive application:

```bash
streamlit run app.py
```

## Part B – Elemental: The Last Classifier

1. Navigate to the `Elemental_The_Classifier_Game` directory.
2. Open `index.html` in a modern web browser.
3. Choose your guardian and begin the adventure.

Keep the assets folder alongside the HTML, CSS and JavaScript files.

The game is also hosted online using GitHub Pages.

---

# Project Objective

The central objective of this project is to explore Data Science through both implementation and interaction.

Part A demonstrates the application of machine learning techniques to a practical prediction problem using structured data and regression algorithms.

Part B takes a creative approach by transforming classification concepts into an interactive learning experience where players understand algorithms through exploration and experimentation.

Together, these two components demonstrate the practical and creative possibilities of Data Science.

---

**Academic Project | Introduction to Data Science and Engineering (IDSE)**
