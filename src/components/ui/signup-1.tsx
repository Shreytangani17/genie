import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Signup1Props {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
  onSuccess?: () => void;
}

const Signup1 = ({
  heading = "Create your CallGenie account",
  logo = {
    url: "/",
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=100&fit=crop&crop=center",
    alt: "CallGenie Logo",
    title: "CallGenie",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "/login",
  onSuccess,
}: Signup1Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      });
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error?.message || 'Please try again with valid credentials.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Google signup failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-violet-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="flex h-full min-h-screen items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105">
            <div className="flex flex-col items-center gap-y-6 mb-8">
              {/* Logo with Glow Effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-violet-600 p-4 rounded-2xl shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </div>
              </div>
              {heading && (
                <h1 className="text-3xl font-bold text-white text-center bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                  {heading}
                </h1>
              )}
            </div>
            
            <form onSubmit={handleEmailSignup} className="space-y-6">
              <div className="space-y-4">
                {/* Enhanced Email Input */}
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/20 text-white placeholder-white/50 rounded-xl h-12 px-4 focus:bg-white/10 focus:border-purple-400 transition-all duration-300 hover:bg-white/10 hover:border-violet-400"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Enhanced Password Input */}
                <div className="relative group">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/20 text-white placeholder-white/50 rounded-xl h-12 px-4 focus:bg-white/10 focus:border-purple-400 transition-all duration-300 hover:bg-white/10 hover:border-violet-400"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Enhanced Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">
                      {isLoading ? "Creating account..." : signupText}
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FcGoogle className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">
                      {isLoading ? "Signing up..." : googleText}
                    </span>
                  </button>
                </div>
              </div>
            </form>
            

          </div>
        </div>
      </div>
      
      {/* Additional Styling */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export { Signup1 }; 