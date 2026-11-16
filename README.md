# IDSE Project: House Price Prediction + Elemental Game

[![Play the game](https://img.shields.io/badge/▶_Play_the_game-live-brightgreen?style=for-the-badge)](https://akshithkumarlakkakula-ux.github.io/IDSE_Project_/)

This repository holds two projects that cover the two classic supervised-learning tasks:

| Part | Task | What it is |
|---|---|---|
| **1. House Price Prediction System** | Regression | Predicts a house's price from its features |
| **2. Elemental: The Last Classifier** | Classification | A playable fantasy game that teaches classification with a real KNN model |

## 🎮 Part 2: Elemental, The Last Classifier

### ▶️ [**Play it now in your browser**](https://akshithkumarlakkakula-ux.github.io/IDSE_Project_/)

No download or install. Best on a laptop or desktop with a keyboard.

<p align="center">
  <img src="images/gameplay.gif" alt="Gameplay: walking, casting a power and classifying a creature" width="760">
</p>

### What it is

You are an elemental guardian walking through five realms. Each realm teaches one idea of classification, from features and labels to decision boundaries and noisy data. Under the story, a **K-Nearest Neighbours** model written from scratch in JavaScript decides what each creature is.

### Screenshots

| Choose your guardian | Gameplay |
|:--:|:--:|
| <img src="images/guardians.png" width="380"> | <img src="images/gameplay-1.png" width="380"> |
| **Classify a creature** | **Classifier Lab (decision boundary)** |
| <img src="images/classify.png" width="380"> | <img src="images/lab.png" width="380"> |

### The Ancient Codex

An in-game book with the guardians and their powers. Powers you haven't earned yet stay hidden behind a **?**.

| Guardian page | Locked power page |
|:--:|:--:|
| <img src="images/codex-character.png" width="380"> | <img src="images/codex-locked.png" width="380"> |

### The four guardians

| Guardian | Element | Power |
|---|---|---|
| Kael | 🔥 Fire | Fireball |
| Mira | 💧 Water | Water Shield |
| Eira | ❄️ Ice | Freeze |
| Thorne | 🌿 Earth | Stone Barrier |

### What each realm teaches

| # | Realm | Classification idea |
|---|---|---|
| 1 | The Awakening | Features and labels |
| 2 | Kingdom of Tides | Training data quality (poisoned labels) |
| 3 | The Frozen Expanse | Train/test split and accuracy |
| 4 | The Verdant Realm | Decision boundaries and choosing K |
| 5 | The Corrupted Core | Noisy real-world data (boss fight) |

### Controls

| Key | Action |
|---|---|
| ← → or A / D | Walk |
| E | Interact |
| Space | Cast power |
| 1–4 or Q | Switch power |

### The model

K-Nearest Neighbours with Euclidean distance on four features (temperature, moisture, density, energy), majority vote, and a deterministic 16/4 train/test split. Full walkthrough: see the game's `docs/BEHIND_THE_SCENES.md`.

## 🏠 Part 1: House Price Prediction System

> **TODO (fill this in):** replace the lines below with your real details.

- **Problem:** predict the sale price of a house from its features.
- **Dataset:** *(name, source, number of rows, main features)*
- **Models tried:** *(e.g. Linear Regression, Random Forest)*
- **Results:** *(e.g. MAE, RMSE, R² on the test set, and which model won)*
- **How to run:** `pip install -r requirements.txt` then `python app.py` *(adjust to your files)*

## How the two parts connect

Part 1 is **regression** (predict a number). Part 2 is **classification** (predict a category). Together they cover the two main supervised-learning problems.

## Project structure

```
IDSE_Project_/
├── images/                  screenshots and GIFs used in this README
├── (house price files)      Part 1
├── (game files)             Part 2: index.html, styles.css, game.js, assets/
└── README.md
```

## Credits

Developed by **Akshith Kumar** · [akshithkumarlakkakula@gmail.com](mailto:akshithkumarlakkakula@gmail.com)
