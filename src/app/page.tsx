"use client";
import React, { useState } from "react";
import { BiometricModal } from "../components/BiometricModal/BiometricModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setIsOpen(true)}>Cadastrar Biometria</button>
      <BiometricModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;