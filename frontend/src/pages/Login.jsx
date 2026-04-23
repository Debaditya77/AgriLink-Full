import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-api-key') {
         setError('Failed to log in. It looks like the Firebase config is missing API keys. Please update src/firebase.js');
      } else {
         setError('Failed to log in. Please check console for details.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-container/20 via-background to-background pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm z-10">
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold tracking-tight text-[#4A6741] font-manrope mb-2">
            AgriLink
          </div>
          <p className="font-body-md text-on-surface-variant">Sign in to your digital farmhand.</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 text-sm font-label-bold">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-outline-variant text-on-surface py-3 px-4 rounded-xl font-label-bold hover:bg-surface-variant transition-colors disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-5 h-5" />
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        <p className="mt-8 text-center text-xs text-on-surface-variant font-label-sm">
          You must configure your Firebase project in <code>src/firebase.js</code> before signing in.
        </p>
      </div>
    </div>
  );
}
