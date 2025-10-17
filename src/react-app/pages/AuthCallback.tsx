import { useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import { Sparkles } from 'lucide-react';

export default function AuthCallback() {
  const { exchangeCodeForSessionToken } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        // Redirect to home page after successful auth
        window.location.href = '/';
      } catch (error) {
        console.error('Auth callback error:', error);
        // Redirect to home page even on error
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, [exchangeCodeForSessionToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin mb-4">
          <Sparkles className="w-12 h-12 text-pink-400 mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Signing you in...
        </h2>
        <p className="text-gray-600">
          Just a moment while we complete your authentication.
        </p>
      </div>
    </div>
  );
}
