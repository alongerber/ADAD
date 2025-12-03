import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    // Clear any problematic state and go home
    try {
      // Don't clear user profile, just reload
      window.location.href = '/';
    } catch {
      window.location.reload();
    }
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-900 flex items-center justify-center p-4"
          dir="rtl"
        >
          <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle size={40} className="text-red-400" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black text-white mb-2">
              אופס! משהו השתבש
            </h1>

            {/* Message */}
            <p className="text-white/60 mb-6">
              קרתה תקלה בלתי צפויה. אל דאגה, ההתקדמות שלך נשמרה!
            </p>

            {/* Error details (collapsed by default) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-right">
                <summary className="text-xs text-white/40 cursor-pointer hover:text-white/60">
                  פרטי השגיאה (למפתחים)
                </summary>
                <pre className="mt-2 p-3 bg-black/40 rounded-lg text-xs text-red-400 overflow-auto max-h-32 text-left">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={this.handleRefresh}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all"
              >
                <RefreshCw size={18} />
                <span>רענן</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
              >
                <Home size={18} />
                <span>חזרה הביתה</span>
              </button>
            </div>

            {/* Contact info */}
            <p className="mt-6 text-xs text-white/40">
              אם הבעיה חוזרת, נשמח לשמוע ממך:
              <br />
              <a
                href="mailto:feedback@matmati-bis.app?subject=דיווח על תקלה"
                className="text-amber-400 hover:underline"
              >
                feedback@matmati-bis.app
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
