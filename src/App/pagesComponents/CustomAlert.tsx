import type React from "react"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedAlertProps {
  title?: string
  message: string
  variant?: "default" | "destructive"
  isOpen: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
  icon?: React.ReactNode
}

export function CustomAlert({
  title = "Error",
  message,
  variant = "destructive",
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 3000,
  icon = <AlertCircle className="h-4 w-4" />,
}: EnhancedAlertProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)

      if (autoClose) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(onClose, 300) // Allow animation to complete
        }, autoCloseTime)

        return () => clearTimeout(timer)
      }
    } else {
      setIsVisible(false)
    }
  }, [isOpen, autoClose, autoCloseTime, onClose])

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-300 ease-in-out px-4",
        "sm:top-4 sm:mx-auto sm:max-w-md",
        "bottom-4 sm:bottom-auto",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <Alert variant={variant} className="shadow-lg border-2">
        {icon}
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}
