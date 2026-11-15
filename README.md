# Interactive Data Science Learning Experience | IDSE Project

An educational project that brings Data Science to life through two different experiences: a machine learning pipeline that predicts house prices and an interactive 2D fantasy game that teaches classification through gameplay.

Instead of approaching Data Science only through theory, this project explores how machine learning concepts can be implemented, visualized and experienced interactively.

---

## Project Overview

This repository consists of two independent parts, each exploring a different area of Data Science.

| | Part A | Part B |
|---|---|---|
| Project | House Price Prediction | Elemental: The Last Classifier |
| Domain | Machine Learning | Interactive Learning Game |
| ML Concept | Regression | Classification |
| Objective | Predict residential property prices | Learn classification through gameplay |
| Technologies | Python, Pandas, Scikit-learn | HTML, CSS, JavaScript |

---

# Part A – House Price Prediction

### Overview

The first part focuses on developing a machine learning model to estimate residential property prices based on different housing characteristics.

The project explores how factors such as location, property area, number of bedrooms, bathrooms, property age, furnishing status and accessibility influence house prices.

The objective is to build and evaluate regression models that can estimate the price of a property based on its features.

### Data Science Pipeline

The project follows an end-to-end machine learning workflow:

1. **Data Collection:** Loading and understanding the housing dataset.
2. **Data Cleaning:** Identifying missing values, handling duplicates and correcting inconsistencies.
3. **Exploratory Data Analysis:** Studying distributions, correlations and relationships between housing attributes and prices.
4. **Data Preprocessing:** Handling numerical and categorical features.
5. **Feature Engineering:** Preparing relevant features for model development.
6. **Model Building:** Training and comparing multiple regression algorithms.
7. **Model Evaluation:** Evaluating predictions using MAE, RMSE and R².
8. **Prediction Application:** Providing an interactive interface for estimating house prices.

### Technologies Used

- Python
- Pandas and NumPy
- Matplotlib and Seaborn
- Scikit-learn
- Streamlit
- Jupyter Notebook

### Explore Part A

[**View House Price Prediction – Source Code, Dataset, Notebooks and Results →**](./House_Price_Prediction/)

---

# Part B – Elemental: The Last Classifier

### Overview

**Four elements. One broken world.**

Elemental: The Last Classifier is an interactive 2D fantasy adventure designed to introduce the fundamentals of classification in Data Science through exploration, challenges and gameplay.

The player enters a world divided into four elemental classes: Fire, Water, Ice and Earth. By exploring different realms, inspecting mysterious creatures and studying their characteristics, players learn how a machine learning classifier identifies and categorizes unknown data.

The game combines a fantasy storyline with an implementation of the K-Nearest Neighbours (KNN) algorithm in JavaScript.

### How the Game Works

Players begin by choosing one of four elemental guardians:

- **Kael – Fire:** The Ember Vanguard.
- **Mira – Water:** The Tide Weaver.
- **Eira – Ice:** The Frost Sentinel.
- **Thorne – Earth:** The Root Guardian.

Each guardian has a unique elemental ability. Players move through five different realms, complete classification challenges, avoid enemies and unlock rewards.

### The Five Realms and Their Learning Concepts

| Chapter | Realm | Data Science Concept | Challenge |
|---|---|---|---|
| 1 | The Awakening | Features and Labels | Identify creatures using their measured characteristics |
| 2 | Kingdom of Tides | Training Data and Label Quality | Identify incorrectly labelled training examples |
| 3 | The Frozen Expanse | Train-Test Split and Accuracy | Classify unseen creatures and compare predictions |
| 4 | The Verdant Realm | Decision Boundaries and K | Experiment with different K values to find the best classification score |
| 5 | The Corrupted Core | Noisy Data and Classification | Defeat the final boss by correctly classifying disguised creatures |

### Understanding the Classification Model

The game implements the **K-Nearest Neighbours (KNN)** algorithm directly in JavaScript.

Each creature is represented using four numerical features:

- Temperature
- Moisture
- Density
- Energy

Every feature is assigned a value between 0 and 100.

The classifier uses Euclidean distance to measure the similarity between an unknown creature and labelled training examples.

It then selects the K nearest neighbours and uses majority voting to determine the predicted element. If votes are tied, the nearest neighbour helps decide the result.

The game contains 20 labelled creatures, divided into:
- 16 training samples.
- 4 unseen test samples.

This allows players to explore how a classification model learns from labelled examples and evaluates its predictions on unseen data.

### Additional Game Features

**1. Interactive 2D Gameplay**

- Side-scrolling environments.
- Keyboard-based character movement.
- Interactive objects, creatures and challenges.
- Mobile-friendly movement and interaction buttons.

**2. Elemental Powers**

Each guardian has a unique ability:

- Fireball – attacks enemies.
- Water Shield – protects the player.
- Freeze – temporarily freezes enemies.
- Stone Barrier – creates a defensive wall.

**3. Classifier Lab**

An interactive environment where players can:
- View a visual representation of classification regions.
- Adjust the value of K.
- Change the feature axes.
- Modify the characteristics of an unknown creature.
- Observe the predicted class.
- Compare predictions against unseen test samples.

**4. Ancient Codex**

An in-game knowledge book that introduces the guardians, elemental powers and classification concepts.

**5. Player Progression**

- Multiple player profiles on the same device.
- XP and collectible relics.
- Unlockable powers.
- Chapter progression and saved progress.
- Retry and reset options.

### Game Controls

| Key | Action |
|---|---|
| ← / → or A / D | Move the character |
| E | Interact with objects and creatures |
| Space | Use the active elemental power |
| 1–4 or Q | Switch between unlocked powers |

Touch-screen users can use the on-screen controls below the game arena.

### Technologies Used

- HTML5 – Game structure and interface.
- CSS3 – Visual design, animations and responsive layouts.
- JavaScript – Game mechanics, character movement, interactions and KNN implementation.
- HTML Canvas – Rendering the 2D game environment and classifier visualizations.
- LocalStorage – Saving player profiles and game progress.

The game does not require an external machine learning API or backend server. The classification logic runs directly in the browser.

### Play the Game

< [▶ PLAY ELEMENTAL: THE LAST CLASSIFIER](https://akshithkumarlakkakula-ux.github.io/IDSE_Project/) >

[**View Part B – Game Source Code and Assets →**](./Elemental_The_Classifier_Game/)

*The online game link becomes active after GitHub Pages deployment.*

---

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

### Part A – House Price Prediction

Navigate to the project directory and install the required dependencies:

```bash
cd House_Price_Prediction
pip install -r requirements.txt
```

Launch the interactive application:

```bash
streamlit run app.py
```

### Part B – Elemental: The Last Classifier

1. Navigate to the `Elemental_The_Classifier_Game` folder.
2. Open `index.html` in a modern web browser.
3. Choose your guardian and enter the first realm.

No additional installation or API configuration is required. Keep the `assets` folder alongside the HTML, CSS and JavaScript files.

The game can also be hosted online using GitHub Pages.

---

# Project Objective

The central idea behind this project is to explore Data Science beyond conventional implementations.

Part A demonstrates how machine learning can be applied to a practical prediction problem using structured data and regression techniques.

Part B takes a different approach by turning classification concepts into an interactive experience where players learn through exploration, experimentation and decision-making.

Together, both projects demonstrate the practical and creative applications of Data Science.

---

**Academic Project | Introduction to Data Science and Engineering (IDSE)**

Developed by Akshith Kumar.
