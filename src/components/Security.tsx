import React, { useEffect, Component, ReactNode } from 'react';

export const SecurityWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (window.location.pathname.startsWith('/admin')) return;
      e.preventDefault();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.location.pathname.startsWith('/admin')) return;
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div className="min-h-screen bg-background text-gray-900 selection:bg-primary/30">{children}</div>;
};

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong. Please try again later.";
      try {
        const parsed = JSON.parse(this.state.error.message);
        if (parsed.error) errorMessage = `System Error: ${parsed.error}`;
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#0a0a0a] text-white">
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Application Error</h2>
            <p className="text-gray-400 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
