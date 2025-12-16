import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from './api/api';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [bio, setBio] = useState('');
  const [mood, setMood] = useState('');

  useEffect(() => {
    getProfile().then((data) => {
      setUser(data);
      setBio(data.bio);
      setMood(data.mood);
    });
  }, []);

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      const updatedUser = await updateProfile({ bio, mood });
      setUser(updatedUser);
      setIsEditing(false); 
    } catch (error) {
      alert("Failed to save."); // Requirements say show alert on error [cite: 155]
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get color based on mood
  const getMoodColor = (currentMood: string) => {
    switch (currentMood) {
      case 'Happy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Busy': return 'bg-red-100 text-red-800 border-red-200';
      case 'Focused': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Relaxed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    // Background: Slate gradient for a clean "Tech" look
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      
      {/* Card: Added shadow-xl and backdrop blur for depth */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20 animate-fade-in transition-all">
        
        {/* Avatar Placeholder: Uses first letter of username */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Header: Username [cite: 141] */}
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-2 tracking-tight">
          {user.username}
        </h1>

        {!isEditing ? (
          // === VIEW MODE ===
          <div className="text-center space-y-6">
            
            {/* Badge: Mood [cite: 143] - Now Dynamic! */}
            <div className="flex justify-center">
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border shadow-sm transition-colors ${getMoodColor(user.mood)}`}>
                {user.mood}
              </span>
            </div>

            {/* Body: Bio [cite: 142] */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600 italic">
              "{user.bio}"
            </div>

            {/* Action: Edit Button [cite: 144] */}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3 px-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 hover:shadow-lg transform active:scale-95 transition-all duration-200"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          // === EDIT MODE ===
          <div className="space-y-5 animate-fade-in">
            
            {/* Mood Input [cite: 149] */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Current Status
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="Happy">😄 Happy</option>
                <option value="Busy">🔴 Busy</option>
                <option value="Focused">⚡ Focused</option>
                <option value="Relaxed">☕ Relaxed</option>
              </select>
            </div>

            {/* Bio Input [cite: 148] */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                About You
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={200}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows={4}
                placeholder="Write something about yourself..."
              />
              <div className="text-right text-xs text-slate-400 mt-1">
                {bio.length}/200
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center transition-all"
              >
                {isLoading ? (
                  // Loading Spinner
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;