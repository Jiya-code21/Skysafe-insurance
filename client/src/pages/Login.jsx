import React, { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = () => {
    if (loginWithGoogle()) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-blue-900 font-sans overflow-hidden">
      
      {/* Left Panel: Feature Image */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-end p-12">
        <img 
          src="https://images.unsplash.com/photo-1620912189866-474843af5ec8?auto=format&fit=crop&q=80&w=1500" 
          alt="Safety Concept" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent"></div>
        
        {/* Glassmorphic Overlay Card */}
        <div className="relative z-10 glass-card p-8 rounded-bento max-w-lg mb-8 mx-auto xl:mx-0">
          <Shield size={48} className="text-brand-blue mb-6" />
          <h2 className="text-4xl font-display font-bold mb-4">Uncompromising Safety & Security</h2>
          <p className="text-blue-900 text-lg tracking-wide">
            Experience parametric insurance designed for the modern world. Instant approvals, zero paperwork, automated payouts.
          </p>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="absolute inset-0 bg-white lg:bg-transparent"></div> {/* Background for mobile */}
        
        <div className="w-full max-w-md relative z-10 bg-white lg:bg-transparent p-8 lg:p-0 rounded-bento shadow-glass lg:shadow-none border border-blue-100 lg:border-none backdrop-blur-xl lg:backdrop-blur-none">
          
          {/* Mobile/Tablet Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8 group">
             <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Shield size={24} className="text-brand-blue" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-blue-900">
                Sky<span className="text-brand-blue">Safe</span>
              </span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-display font-bold mb-2 text-blue-900">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-blue-900">
              {isLogin ? 'Enter your details to access your account.' : 'Sign up to start protecting what matters.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-900">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 pl-10 text-blue-900 placeholder:text-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all"
                  />
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-900">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 pl-10 text-blue-900 placeholder:text-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all"
                  required
                />
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-blue-900">Password</label>
                {isLogin && <a href="#" className="text-xs text-brand-blue hover:text-brand-blue/80 transition-colors">Forgot password?</a>}
              </div>
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 pl-10 text-blue-900 placeholder:text-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all"
                  required
                />
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900" />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary mt-6 !py-3.5">
              <span>{isLogin ? 'Sign in' : 'Create account'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4 before:h-px before:flex-1 before:bg-blue-200 after:h-px after:flex-1 after:bg-blue-200">
            <span className="text-xs text-blue-900 uppercase font-medium tracking-wider">Or continue with</span>
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-blue-200 rounded-bento py-3 transition-colors text-sm font-medium text-blue-900 hover:bg-blue-50"
            >
              <span className="text-brand-blue font-bold text-lg leading-none">G</span> Continue with Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-blue-900">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-brand-blue hover:text-brand-darkBlue font-medium transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;

