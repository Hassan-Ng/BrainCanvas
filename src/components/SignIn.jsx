import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Layers, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function SignIn({ theme = 'dark' }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // API call to sign in
    try {
      const res = await fetch("https://braincanvasapi-production.up.railway.app/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
    
      const data = await res.json();
    
      if (!res.ok) {
        alert(data.error || "Sign in failed");
        setIsLoading(false);
        return;
      }
    
      // Store token and user info in localStorage or context
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    
      // Redirect to homepage
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error, please try again later.");
    } finally {
      setIsLoading(false);
    }    
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className={`min-h-screen flex transition-all duration-700 ${
      theme === 'dark' ? 'bg-[#171717]' : 'bg-gray-50'
    } ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Left Panel - Hero Section */}
      <div className='w-1/2 p-4'>
        <div className={`w-full h-full relative overflow-hidden rounded-3xl transition-all duration-1000 ${
          mounted ? 'translate-x-0' : '-translate-x-full'
        } ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900' 
            : 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
        }`}>
          {/* Animated background elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
          
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 text-white h-full">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-1000 delay-300 ${
              mounted ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            } ${theme === 'dark' ? 'bg-blue-600' : 'bg-white/20 backdrop-blur-sm'}`}>
              <Layers className="w-10 h-10 text-white" />
            </div>
            
            <h1 className={`text-4xl font-bold mb-4 transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              One Platform to Streamline
            </h1>
            <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent transition-all duration-1000 delay-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              All Creative Workflows
            </h2>
            
            <p className={`text-lg text-blue-100 max-w-md leading-relaxed transition-all duration-1000 delay-900 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Your creative work will be growing 2x faster with our intuitive 
              whiteboard and collaboration tools.
            </p>
            
            {/* Progress dots */}
            <div className={`flex space-x-2 mt-12 transition-all duration-1000 delay-1100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-white/40 rounded-full" />
              <div className="w-2 h-2 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className={`w-1/2 flex items-center justify-center p-12 transition-all duration-1000 delay-300 ${
        mounted ? 'translate-x-0' : 'translate-x-full'
      } ${theme === 'dark' ? 'bg-[#171717]' : 'bg-white'}`}>
        <div className={`w-full max-w-md transition-all duration-1000 delay-600 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600'
              }`}>
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            
            <h1 className={`text-2xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome back to BrainCanvas!
            </h1>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Please enter your details to sign in to your account
            </p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="space-y-3 mb-6">
            <button className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            <button className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className={`absolute inset-0 flex items-center ${
              theme === 'dark' ? 'text-zinc-600' : 'text-gray-300'
            }`}>
              <div className="w-full border-t border-current" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${
                theme === 'dark' ? 'bg-[#171717] text-zinc-400' : 'bg-white text-gray-500'
              }`}>
                Or sign in with
              </span>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="minimum 8 characters"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className={`ml-2 text-sm ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={`mt-8 text-center text-xs ${
            theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'
          }`}>
            <div className="flex items-center justify-center space-x-4">
              <span>© 2024 BrainCanvas</span>
              <span>•</span>
              <Link to="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/support" className="hover:text-blue-600 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}