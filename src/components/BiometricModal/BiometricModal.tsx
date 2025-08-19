import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, CheckCheck, XCircle, ArrowRightCircle, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Step = "select" | "scanning" | "success" | "error";

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fingers = ["Indicador - Mão-Direita", "Indicador - Mão-Esquerda"];

export const BiometricModal: React.FC<BiometricModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>("select");
  const [selectedFinger, setSelectedFinger] = useState<string | null>(null);
  const [registeredFingers, setRegisteredFingers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartScanning = () => {
    if (!selectedFinger) return;
    setStep("scanning");
    setIsLoading(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      if (isSuccess) {
        setRegisteredFingers((prev) => [...prev, selectedFinger]);
        setStep("success");
      } else {
        setStep("error");
      }
      setIsLoading(false);
    }, 3000);
  };

  const handleNextAfterSuccess = () => {
    setSelectedFinger(null);
    setStep("select");
  };

  const handleRetry = () => setStep("select");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar biometria digital</DialogTitle>
          <DialogDescription>
            {step === "select" && "Selecione abaixo o dedo que deseja cadastrar na biometria."}
            {step === "scanning" && `Posicione seu dedo ${selectedFinger} para a primeira leitura da biometria, por favor aguarde até um minuto.`}
            {step === "success" && (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCheck className="w-5 h-5" />
                Primeira leitura concluída com sucesso!
              </div>
            )}
            {step === "error"}
          </DialogDescription>
        </DialogHeader>

        {/* === STEP: Seleção === */}
        {step === "select" && (
          <div className="text-center">

            <p className="text-left mb-2 font-semi-bold">
              Digital
            </p>
            <select
              className="w-full border rounded-lg px-3 py-2 mb-6"
              value={selectedFinger || ""}
              onChange={(e) => setSelectedFinger(e.target.value)}
            >


              {fingers.map((f) => (
                <option key={f} value={f} disabled={registeredFingers.includes(f)}>
                  {f} {registeredFingers.includes(f) ? "(cadastrado)" : ""}
                </option>
              ))}
            </select>

            <img src="/hand-finger.jpeg" alt="Mão dedo azul" className="mx-auto w-36 m-6" />

            <div className="flex gap-2 justify-end">
              <Button variant="cancel" onClick={onClose}>
                <XCircle className="mr-1" />
                Cancelar
              </Button>

              <Button
                variant="next"
                onClick={handleStartScanning}
                disabled={!selectedFinger || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-1" />
                    Carregando
                  </>
                ) : (
                  <>
                    Avançar
                    <ArrowRightCircle className="ml-1" />
                  </>
                )}
              </Button>
            </div>

            {/* {registeredFingers.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Dedos cadastrados:</h3>
                <ul className="list-disc list-inside">
                  {registeredFingers.map((f) => (
                    <li key={f} className="text-green-600">{f}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        )}

        {step === "scanning" && (
          <div className="relative text-center w-fit mx-auto">
            {/* Container da imagem */}
            <div className="relative w-30 h-30 mx-auto">
              <img
                src="/finger-blue.png"
                alt="Digital azul"
                className="w-full h-full relative z-10"
              />

              {/* Gradiente animado */}
              <motion.div
                className="absolute left-0 w-full h-1.5 bg-blue-400 opacity-60"
                initial={{ top: "-4px" }}    // começa um pouco acima do container
                animate={{ top: "100%" }}    // desce até o fim do container
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>

            {/* Barra de progresso */}
            <div className="flex justify-center mb-6 mt-4">
              <div className="w-1/2 bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                  className="bg-blue-600 h-2 rounded-full origin-left"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-2 justify-end">
              <Button variant="cancel" onClick={onClose}>
                <XCircle className="mr-1" />
                Cancelar
              </Button>
              <Button variant="next" disabled className="opacity-70 cursor-not-allowed">
                <Loader2 className="animate-spin mr-1" />
                Carregando
              </Button>
            </div>
          </div>
        )}


        {/* === STEP: Success === */}
        {step === "success" && (
          <div className="text-center">
            <img src="/finger-green.png" alt="Digital verde" className="mx-auto w-30 m-6" />
            <div className="flex justify-end gap-2">
              <Button
                variant="next"
                onClick={handleStartScanning}
                disabled={!selectedFinger || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-1" />
                    Carregando
                  </>
                ) : (
                  <>
                    Avançar
                    <ArrowRightCircle className="ml-1" />
                  </>
                )}
              </Button>
              {/* <button
                onClick={onClose}
                className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Salvar todas as digitais
              </button> */}
            </div>
          </div>
        )}

        {/* === STEP: Error === */}
        {step === "error" && (
          <div className="text-left">
            <p className="ml-2 flex text-zinc-500 font-medium text-sm mb-4">
              <X className="text-red-600 mr-1" />
              As leituras da digital não coincidem. Certifique-se de usar o mesmo dedo da primeira leitura e tente novamente.
            </p>
            <img src="/finger-red.png" alt="Digital vermelha" className="mx-auto w-30 m-5" />

            <div className="flex justify-end gap-2">
              <Button variant="cancel" onClick={onClose}>
                <XCircle className="mr-1" />
                Fechar
              </Button>
              <Button variant="next" onClick={onClose}>
                Tentar novamente
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

