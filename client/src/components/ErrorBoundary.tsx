// src/components/ErrorBoundary.tsx
import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { Message } from "semantic-ui-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Message negative>
          <Message.Header>Oops, something went wrong</Message.Header>
          <p>We're sorry for the inconvenience. Please try again later.</p>
        </Message>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
