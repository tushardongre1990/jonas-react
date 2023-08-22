import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  // const [test, setTest] = useState({ name: "Tushar" });

  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setStep((s) => s + 1);
    }
    // Bad Practice
    // test.name = "Jason";
    // setTest({ name: "Jason" });
  }
  return (
    <div>
      <button
        className="close"
        onClick={() => {
          setIsOpen((is) => !is);
        }}
      >
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step} : {messages[step - 1]}
            {/* {test.name} */}
          </p>
          <div className="buttons">
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
              <span>👈</span>Previous
            </Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  //   function Button({ textColor, bgColor, onClick, text, emoji }) {
  //     return (
  //       <button
  //         style={{ backgroundColor: bgColor, color: textColor }}
  //         onClick={onClick}
  //       >
  //         <span>{emoji}</span> {text}
  //       </button>
  //     );
  //   }
  // }

  // value of children is whatever between the opening and closing tag of component
  function Button({ textColor, bgColor, onClick, children }) {
    return (
      <button
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
export default App;
