# AI Overview

SmartMama uses machine learning as **decision support** during maternal-health monitoring.

The current solution uses a **Random Forest classifier** to classify risk from structured household-visit information.

The AI component is not a diagnostic system.

The interface and documentation must never describe a model output as confirmation that a mother has a medical condition.

## Problem Being Solved

The model exists to support a CHV after a structured household visit.

The product problem is not "diagnose a mother with AI." It is:

> identify patterns in the collected information that may warrant increased attention or referral.

This distinction determines both model evaluation and UX requirements.

## Random Forest Model

A Random Forest is an ensemble classification method that combines multiple decision trees.

In SmartMama, the model receives the feature set defined by the risk-assessment pipeline and returns a risk classification.

The production documentation should record:

- exact model version;
- training dataset/version;
- feature list;
- preprocessing;
- class mapping;
- threshold configuration;
- serialisation format;
- inference dependency versions.

These details should be taken from the actual model repository before release.


## Input Features

The research/product design identifies structured visit information including:

- gestational age;
- blood pressure;
- body temperature;
- symptoms and observations;
- relevant pregnancy information.

The original database documentation records these fields in `visit_log`.

The exact feature vector used by the deployed Random Forest must be documented from the inference code/model artefact. A field existing in the database does not automatically mean it is used by the model.


## Data Pipeline

```text
Household visit
    ↓
Request validation
    ↓
Feature extraction
    ↓
Preprocessing / encoding
    ↓
Random Forest inference
    ↓
Risk class (+ confidence where exposed)
    ↓
Persist assessment
    ↓
Display decision-support result
    ↓
Referral/follow-up workflow
```

The pipeline must fail safely when required model inputs are missing or invalid.


## Training Process

The final production documentation must specify the actual training pipeline.

At minimum, record:

1. dataset source;
2. inclusion/exclusion criteria;
3. target labels;
4. preprocessing;
5. train/validation/test split;
6. class-imbalance handling;
7. hyperparameter selection;
8. model versioning;
9. reproducibility procedure.

Do not claim clinical validity or production readiness from a small prototype dataset.


## Evaluation

Model evaluation should go beyond overall accuracy.

Recommended measures include:

- precision;
- recall/sensitivity;
- specificity;
- F1 score;
- confusion matrix;
- per-class performance;
- calibration where probabilities are exposed;
- false-positive rate;
- false-negative rate.

Because a missed high-risk case can have a materially different consequence from an unnecessary referral, class-specific errors must be examined.


## Results

The deployed documentation should contain the **actual measured model results**, including the dataset and test conditions used.

Do not insert invented accuracy numbers.

Until the final evaluation results are committed, record:

> **Status: evaluation results to be populated from the final model evaluation artefact.**

This is preferable to presenting a prototype metric as clinical performance.


## Risk Classification

The product currently uses three conceptual risk levels:

- **Low**
- **Medium**
- **High**

The exact mapping from model output to UI state must be defined in the model/inference configuration.

The UX must make clear:

- the result is a risk indicator;
- the result is based on the information entered;
- it does not constitute a diagnosis;
- the CHV should follow the appropriate workflow;
- qualified healthcare professionals make clinical decisions.

The system should support calibrated trust: users should neither blindly follow nor automatically dismiss the model.


## Known Limitations

- Model quality depends on training data quality and representativeness.
- Missing or incorrectly entered visit data can affect classification.
- A classifier can produce false positives and false negatives.
- Model confidence is not the same as clinical certainty.
- Performance may change across populations or contexts.
- A risk classification cannot account for every clinical factor.
- The system cannot guarantee that a referral leads to treatment.
- The model should be monitored after deployment rather than treated as permanently valid.
