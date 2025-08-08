'use client';

import React, { useState } from "react";

const agendaSteps = [
  { title: "Waiting Room", subtitle: "Waiting Room", duration: "1 min" },
  { title: "Learning Objectives", subtitle: "Learning Objectives", duration: "1 min" },
  { title: "Intro Video", subtitle: "Intro Video", duration: "2 mins" },
  { title: "Grading", subtitle: "Grading", duration: "1 min" },
  { title: "Agenda", subtitle: "Agenda", duration: "1 min" },
  { title: "Discussion segment 1, part 1", subtitle: "Discussion segment 1, part 1", duration: "5 mins" },
  { title: "Discussion segment 1, part 2", subtitle: "Discussion segment 1, part 2", duration: "5 mins" },
  { title: "Discussion segment 1, part 3", subtitle: "Discussion segment 1, part 3", duration: "5 mins" },
  { title: "Discussion segment 2, part 1", subtitle: "Discussion segment 2, part 1", duration: "5 mins" },
  { title: "Discussion segment 2, part 2", subtitle: "Discussion segment 2, part 2", duration: "5 mins" },
  // Add more steps as needed
];

export default function ExperienceModule() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < agendaSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (idx) => {
    setCurrentStep(idx);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
        <div className="fw-bold ms-2">Welcome</div>
        <button className="btn btn-dark me-2" onClick={handleNext}>
          Next Slide &nbsp; &rarr;
        </button>
      </div>

      {/* Main Content */}
      <div className="row flex-grow-1">
        {/* Center Card */}
        <div className="col-md-8 d-flex align-items-center justify-content-center">
          <div className="card w-100" style={{ background: "#FFD600", minHeight: 400 }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h1 className="fw-bold text-center mb-3" style={{ fontSize: "2.5rem" }}>
                Welcome to your <br /> Breakout Room.
              </h1>
              <p className="text-center mb-2" style={{ maxWidth: 500 }}>
                When your entire group has arrived, your group leader will advance to the next slide to begin the experience!
              </p>
              <hr style={{ width: "60%" }} />
              <div className="text-center mt-3">
                <div>We hope you enjoy</div>
                <div className="fw-bold mt-2" style={{ fontSize: "1.3rem" }}>
                  Customer Discovery
                </div>
                <div>Practical Market Research for Startups</div>
                <div className="mt-4">
                  Sincerely,<br />
                  The Breakout Learning Team
                </div>
                <div className="mt-2">
                  <span role="img" aria-label="logo">🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-md-4 border-start bg-white d-flex flex-column p-0">
          {/* Tabs */}
          <div className="d-flex border-bottom">
            <button className="btn btn-link flex-fill fw-bold text-dark border-0 border-bottom border-3 border-dark rounded-0">
              Agenda
            </button>
            <button className="btn btn-link flex-fill text-secondary border-0 rounded-0">
              Exhibits
            </button>
          </div>
          {/* Module Info */}
          <div className="p-3 border-bottom">
            <div className="d-flex align-items-center mb-2">
              <span className="me-2" style={{ fontSize: "1.5rem" }}>🔍</span>
              <div>
                <div className="fw-bold">Customer Discovery</div>
                <div className="text-muted small">
                  In this module, students will discuss the essential process of customer discovery and validation for...
                </div>
              </div>
            </div>
          </div>
          {/* Agenda Steps */}
          <div className="flex-grow-1 overflow-auto">
            <ul className="list-group list-group-flush">
              {agendaSteps.map((step, idx) => (
                <li
                  key={idx}
                  className={`list-group-item d-flex justify-content-between align-items-center ${idx === currentStep ? "active" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStepClick(idx)}
                >
                  <div>
                    <div className="fw-bold">{step.title}</div>
                    <div className="small text-muted">{step.subtitle}</div>
                  </div>
                  <span className="badge bg-light text-dark">{step.duration}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Footer */}
          <div className="p-3 border-top">
            <div className="text-muted small">Time Left in Session: 49 mins</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="d-flex justify-content-start align-items-center p-3">
        <button className="btn btn-danger rounded-circle">
          <i className="bi bi-telephone-x"></i>
        </button>
      </div>
    </div>
  );
}