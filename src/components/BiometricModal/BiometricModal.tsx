import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, CheckCheck, XCircle, ArrowRightCircle, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Ampliei os steps
type Step =
  | "select"
  | "scanning"
  | "success"
  | "confirm"
  | "scanningConfirm"
  | "finalSuccess"
  | "error";

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fingers = ["Indicador - Mão-Direita", "Indicador - Mão-Esquerda"];

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<Step>("select");
  const [selectedFinger, setSelectedFinger] = useState<string | null>(null);
  const [registeredFingers, setRegisteredFingers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // primeira leitura
  const handleStartScanning = () => {
    if (!selectedFinger) return;
    setStep("scanning");
    setIsLoading(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        setStep("success");
      } else {
        setStep("error");
      }
      setIsLoading(false);
    }, 3000);
  };

  // depois do primeiro sucesso → vai para confirmar dedo
  const handledefaultAfterSuccess = () => {
    setStep("confirm");
  };

  // segunda leitura (confirm)
  const handleConfirmScanning = () => {
    setStep("scanningConfirm");
    setIsLoading(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        // só adiciona à lista no final
        if (selectedFinger) {
          setRegisteredFingers((prev) => [...prev, selectedFinger]);
        }
        setStep("finalSuccess");
      } else {
        setStep("error");
      }
      setIsLoading(false);
    }, 3000);
  };

  const handleRetry = () => setStep("select");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar biometria digital</DialogTitle>
          <DialogDescription>
            {step === "select" &&
              "Selecione abaixo o dedo que deseja cadastrar na biometria."}
            {step === "scanning" &&
              `Posicione seu dedo ${selectedFinger} para a primeira leitura da biometria, por favor aguarde até um minuto.`}
            {step === "success" && (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCheck className="w-5 h-5" />
                Primeira leitura concluída com sucesso!
              </div>
            )}
            {step === "confirm" &&
              `Posicione novamente o ${selectedFinger} no leitor biométrico para finalizar a coleta.`}
            {step === "scanningConfirm" &&
              "A última leitura da sua digital está sendo analisada, por favor aguarde até um minuto."}
            {step === "finalSuccess" && (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCheck className="w-5 h-5" />
                Biometria digital concluída com sucesso!
              </div>
            )}
            {step === "error"}
          </DialogDescription>
        </DialogHeader>

        {/* === STEP: Seleção === */}
        {step === "select" && (
          <div>
            <p className="text-left mb-2 font-semi-bold">Digital</p>
            <select
              className="w-full border rounded-lg px-3 py-2 mb-6"
              value={selectedFinger || ""}
              onChange={(e) => setSelectedFinger(e.target.value)}
            >
              {fingers.map((f) => (
                <option
                  key={f}
                  value={f}
                  disabled={registeredFingers.includes(f)}
                >
                  {f} {registeredFingers.includes(f) ? "(cadastrado)" : ""}
                </option>
              ))}
            </select>

            <img
              src={
                selectedFinger === "Indicador - Mão-Direita"
                  ? "/hand-finger-right.png"
                  : selectedFinger === "Indicador - Mão-Esquerda"
                    ? "/hand-finger-left.png"
                    : "/hand-finger.png"
              }
              alt="Mão dedo azul"
              className="mx-auto w-36 m-6"
            />

            <div className="flex w-full justify-end gap-2">
              <Button variant="destructive" onClick={onClose}>
                <XCircle className="mr-1" />
                Cancelar
              </Button>

              <Button
                variant="default"
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
          </div>
        )}

        {/* === STEP: Scanning 1ª leitura === */}
        {step === "scanning" && (
          <div className="relative w-full">
            <div className="relative w-30 h-30 mx-auto overflow-hidden">
              <img
                src="/finger-blue.png"
                alt="Digital azul"
                className="w-full h-full z-0"
              />
              <motion.div
                className="absolute left-0 w-full h-1 bg-blue-400 opacity-60 z-10"
                initial={{ top: "-4px" }}
                animate={{ top: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>

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

            <div className="flex w-full justify-end gap-2 mt-4">
              <Button variant="destructive" onClick={onClose}>
                <XCircle className="mr-1" />
                Cancelar
              </Button>
              <Button
                variant="default"
                disabled
                className="opacity-70 cursor-not-allowed"
              >
                <Loader2 className="animate-spin mr-1" />
                Carregando
              </Button>
            </div>
          </div>
        )}

        {/* === STEP: Success (após primeira leitura) === */}
        {step === "success" && (
          <div>
            <img
              src="/finger-green.png"
              alt="Digital verde"
              className="mx-auto w-30 m-6"
            />
            <div className="flex justify-end gap-2">
              <Button variant="default" onClick={handledefaultAfterSuccess}>
                Avançar
                <ArrowRightCircle className="ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* === STEP: Confirm (segunda leitura) === */}
        {step === "confirm" && (
          <div>
            <img
              src="/finger-blue.png"
              alt="Digital azul"
              className="mx-auto w-30 m-6"
            />
            <div className="flex justify-end gap-2">
              <Button variant="destructive" onClick={onClose}>
                <XCircle className="mr-1" />
                Cancelar
              </Button>
              <Button variant="default" onClick={handleConfirmScanning}>
                Avançar
                <ArrowRightCircle className="ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* === STEP: Scanning da confirmação === */}
        {step === "scanningConfirm" && (
          <div className="relative w-full">
            <div className="relative w-30 h-30 mx-auto overflow-hidden">
              <img
                src="/finger-blue.png"
                alt="Digital azul"
                className="w-full h-full z-0"
              />
              <motion.div
                className="absolute left-0 w-full h-1 bg-blue-400 opacity-60 z-10"
                initial={{ top: "-4px" }}
                animate={{ top: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>

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

            <div className="flex w-full justify-end gap-2 mt-4">
              <Button variant="destructive" onClick={onClose}>
                <XCircle className="mr-1" />
                Cancelar
              </Button>
              <Button
                variant="default"
                disabled
                className="opacity-70 cursor-not-allowed"
              >
                <Loader2 className="animate-spin mr-1" />
                Carregando
              </Button>
            </div>
          </div>
        )}

        {/* === STEP: Final Success === */}
        {step === "finalSuccess" && (
          <div>
            <img
              src="/finger-green.png"
              alt="Digital verde"
              className="mx-auto w-30 m-6"
            />
            <div className="flex justify-end gap-2">
              <Button variant="destructive" onClick={() => setStep("select")}>
                Cadastrar outra digital
              </Button>
              <Button variant="default" onClick={onClose}>
                Salvar
              </Button>
            </div>
          </div>
        )}

        {/* === STEP: Error === */}
        {step === "error" && (
          <div className="text-left">
            <p className="ml-2 flex text-zinc-500 font-medium text-sm mb-4">
              <X className="text-red-600 mr-1" />
              As leituras da digital não coincidem. Certifique-se de usar o mesmo
              dedo da primeira leitura e tente novamente.
            </p>
            <img
              src="/finger-red.png"
              alt="Digital vermelha"
              className="mx-auto w-30 m-5"
            />

            <div className="flex justify-end gap-2">
              <Button variant="destructive" onClick={onClose}>
                <XCircle className="mr-1" />
                Fechar
              </Button>
              <Button variant="default" onClick={handleRetry}>
                Tentar novamente
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

