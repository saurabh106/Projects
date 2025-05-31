interface ToastStyle {
    className: string
    style: React.CSSProperties
  }
  
  export const toastStyles = {
    success: {
      className: "sonner-success",
      style: {
        "--toast-bg": "#4CAF50",
        "--toast-border": "#2E7D32",
        "--toast-text": "white",
        "--toast-description": "rgba(255, 255, 255, 0.85)",
        "--toast-icon": "white",
        "--toast-title-size": "15px",
        "--toast-title-weight": "600",
        "--toast-description-size": "14px",
        "--toast-border-width": "4px",
        fontFamily: "'Inter', sans-serif",
        borderLeft: "var(--toast-border-width) solid var(--toast-border)",
        background: "var(--toast-bg)",
        color: "var(--toast-text)",
      } as React.CSSProperties
    },
    error: {
      className: "sonner-error",
      style: {
        "--toast-bg": "#F44336",
        "--toast-border": "#C62828",
        "--toast-text": "white",
        "--toast-description": "rgba(255, 255, 255, 0.85)",
        "--toast-icon": "white",
        "--toast-title-size": "15px",
        "--toast-title-weight": "600",
        "--toast-description-size": "14px",
        "--toast-border-width": "4px",
        fontFamily: "'Inter', sans-serif",
        borderLeft: "var(--toast-border-width) solid var(--toast-border)",
        background: "var(--toast-bg)",
        color: "var(--toast-text)",
      } as React.CSSProperties
    }
  }