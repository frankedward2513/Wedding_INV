import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../config/weddingData';
import { BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { Heart, CheckCircle2, XCircle, Users, Mail, Utensils, Send, MessageSquare, Download, Database } from 'lucide-react';

interface RsvpRecord {
  id: string;
  fullName: string;
  email: string;
  attending: boolean;
  guestCount: number;
  mealPreference: string;
  dietaryNotes: string;
  message: string;
  timestamp: string;
}

interface RsvpSectionProps {
  config: WeddingConfig;
}

const STORAGE_KEY = 'aura_bloom_rsvp_responses';

export const RsvpSection: React.FC<RsvpSectionProps> = ({ config }) => {
  const { rsvp } = config;

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [attendance, setAttendance] = useState<'accept' | 'decline' | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [mealPreference, setMealPreference] = useState(rsvp.mealOptions[0]?.name || '');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [message, setMessage] = useState('');

  // UI status
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<RsvpRecord | null>(null);
  const [savedRecords, setSavedRecords] = useState<RsvpRecord[]>([]);
  const [showRsvpManager, setShowRsvpManager] = useState(false);

  // Load existing RSVPs
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedRecords(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!attendance) {
      setError('Please let us know whether you are able to attend.');
      return;
    }
    if (attendance === 'accept' && (guestCount < 1 || guestCount > rsvp.maxGuestsPerParty)) {
      setError(`Guest count must be between 1 and ${rsvp.maxGuestsPerParty}.`);
      return;
    }

    setIsSubmitting(true);

    const newRecord: RsvpRecord = {
      id: `rsvp_${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      attending: attendance === 'accept',
      guestCount: attendance === 'accept' ? guestCount : 0,
      mealPreference: attendance === 'accept' ? mealPreference : 'N/A',
      dietaryNotes: dietaryNotes.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      try {
        const updated = [newRecord, ...savedRecords];
        setSavedRecords(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage fallback
      }
      setIsSubmitting(false);
      setSubmittedData(newRecord);
    }, 600);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setAttendance(null);
    setGuestCount(1);
    setDietaryNotes('');
    setMessage('');
    setSubmittedData(null);
    setError(null);
  };

  const handleDownloadCsv = () => {
    if (savedRecords.length === 0) return;
    const headers = ['Full Name', 'Email', 'Attending', 'Guests', 'Meal Choice', 'Dietary Notes', 'Message', 'Timestamp'];
    const rows = savedRecords.map((r) => [
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      r.attending ? 'Yes' : 'No',
      r.guestCount,
      `"${r.mealPreference.replace(/"/g, '""')}"`,
      `"${r.dietaryNotes.replace(/"/g, '""')}"`,
      `"${r.message.replace(/"/g, '""')}"`,
      r.timestamp,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Wedding_RSVP_List_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 bg-[#F5EFE6]/60 overflow-hidden border-t border-b border-[#E8DCCF]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.9} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
            Kindly Respond
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3E342B] font-normal">
            RSVP
          </h2>
          <FloralDivider className="my-4" />
          <p className="text-sm sm:text-base text-[#6C5E4E] font-serif italic">
            Please reply by {rsvp.deadline} so we can prepare a seat and feast in your honor.
          </p>
        </ScrollReveal>

        {/* Card Container */}
        <ScrollReveal direction="up" distance={45} duration={1} delay={150}>
          <div className="bg-[#FFFDF9] rounded-2xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-xl relative">
            <BotanicalCorner position="top-left" size={50} className="text-[#C5A059]/40" />
            <BotanicalCorner position="top-right" size={50} className="text-[#C5A059]/40" />
            <BotanicalCorner position="bottom-left" size={50} className="text-[#C5A059]/40" />
            <BotanicalCorner position="bottom-right" size={50} className="text-[#C5A059]/40" />

          {submittedData ? (
            /* Success Confirmation View */
            <div className="text-center py-8">
              {submittedData.attending ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EED7CF]/50 text-[#8B5A4B] border border-[#C5A059]/40 flex items-center justify-center mx-auto shadow-sm">
                    <Heart className="w-8 h-8 fill-[#B58D3D] text-[#B58D3D]" />
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#3E342B]">
                    Thank You, {submittedData.fullName}!
                  </h3>
                  <p className="font-serif text-lg text-[#B58D3D] italic">
                    We Joyfully Await Celebrating With You
                  </p>
                  <p className="text-sm text-[#5C4D3E] max-w-md mx-auto leading-relaxed">
                    Your response has been warmly received for <strong>{submittedData.guestCount} {submittedData.guestCount === 1 ? 'guest' : 'guests'}</strong>. We have saved your meal preference and look forward to sharing this unforgettable day together.
                  </p>
                  {submittedData.message && (
                    <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DCCF]/60 max-w-md mx-auto italic text-xs text-[#6C5E4E] mt-4">
                      &ldquo;{submittedData.message}&rdquo;
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#8C7A6B] border border-[#E8DCCF] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-[#8C7A6B]" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#3E342B]">
                    Thank You, {submittedData.fullName}
                  </h3>
                  <p className="font-serif text-lg text-[#8C7A6B] italic">
                    You will be dearly missed in spirit
                  </p>
                  <p className="text-sm text-[#5C4D3E] max-w-md mx-auto leading-relaxed">
                    While we will miss celebrating together in person, we are truly grateful for your warm wishes and blessings as we begin our new life together.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-[#E8DCCF]/60 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#5C4D3E] border border-[#C5A059]/40 text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all"
                >
                  Submit Another Response
                </button>
                <button
                  onClick={() => setShowRsvpManager(true)}
                  className="px-6 py-2.5 bg-[#5C4D3E] hover:bg-[#43372B] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all"
                >
                  View Saved Guest Responses ({savedRecords.length})
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3.5 bg-[#FBEFEF] border border-[#EAC5C5] text-[#8B3632] text-xs rounded-lg text-center">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#5C4D3E] mb-2">
                  Full Name <span className="text-[#B58D3D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alistair &amp; Lady Clara"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-xl text-[#3E342B] placeholder-[#9C8F80] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#5C4D3E] mb-2">
                  Email Address <span className="text-[#8C7A6B] font-normal lowercase">(optional, for event reminders)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="clara@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-xl text-[#3E342B] placeholder-[#9C8F80] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#5C4D3E] mb-2">
                  Will You Attend? <span className="text-[#B58D3D]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('accept')}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                      attendance === 'accept'
                        ? 'bg-[#EED7CF]/50 border-[#C5A059] text-[#3E342B] shadow-sm font-semibold'
                        : 'bg-[#FAF7F2] border-[#DFC488]/40 text-[#6C5E4E] hover:border-[#C5A059]'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${attendance === 'accept' ? 'text-[#B58D3D]' : 'text-[#8C7A6B]'}`} />
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('decline')}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                      attendance === 'decline'
                        ? 'bg-[#FAF7F2] border-[#8C7A6B] text-[#3E342B] shadow-sm font-semibold'
                        : 'bg-[#FAF7F2] border-[#DFC488]/40 text-[#6C5E4E] hover:border-[#C5A059]'
                    }`}
                  >
                    <XCircle className={`w-4 h-4 ${attendance === 'decline' ? 'text-[#8C7A6B]' : 'text-[#8C7A6B]'}`} />
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Conditional Acceptance Fields */}
              {attendance === 'accept' && (
                <div className="space-y-6 pt-2 border-t border-[#E8DCCF]/60">
                  {/* Number of Guests */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#5C4D3E] mb-2">
                      Total Number of Guests Attending
                    </label>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[#8C7A6B]" />
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="px-4 py-2.5 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-xl text-[#3E342B] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                      >
                        {Array.from({ length: rsvp.maxGuestsPerParty }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      <span className="text-xs text-[#8C7A6B]">
                        (Maximum {rsvp.maxGuestsPerParty} per invitation party)
                      </span>
                    </div>
                  </div>

                  {/* Meal Preference */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#5C4D3E] mb-2">
                      Entrée Selection
                    </label>
                    <div className="space-y-2">
                      {rsvp.mealOptions.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            mealPreference === opt.name
                              ? 'bg-[#FAF7F2] border-[#C5A059] shadow-xs'
                              : 'border-[#DFC488]/30 hover:border-[#C5A059]/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mealPref"
                            value={opt.name}
                            checked={mealPreference === opt.name}
                            onChange={(e) => setMealPreference(e.target.value)}
                            className="mt-1 text-[#B58D3D] focus:ring-[#C5A059]"
                          />
                          <div>
                            <span className="font-serif text-sm font-semibold text-[#3E342B] block">
                              {opt.name}
                            </span>
                            <span className="text-xs text-[#7A6E5F]">
                              {opt.description}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#5C4D3E] mb-2">
                      Dietary Restrictions or Allergies <span className="text-[#8C7A6B] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gluten-free, nut allergy, kosher style"
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-xl text-[#3E342B] placeholder-[#9C8F80] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                    />
                  </div>
                </div>
              )}

              {/* Heartfelt Message for the Couple */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#5C4D3E] mb-2">
                  Warm Wishes / Message for the Couple <span className="text-[#8C7A6B] font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder={`Leave a blessing or sweet memory for ${config.couple.displayName}...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-xl text-[#3E342B] placeholder-[#9C8F80] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#5C4D3E] hover:bg-[#43372B] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#EED7CF]" />
                  <span>{isSubmitting ? 'Sending Response...' : 'Send RSVP Response'}</span>
                </button>
              </div>

              {/* Demo Mode / Persistence Footnote */}
              <div className="text-center pt-2 flex items-center justify-between text-[11px] text-[#8C7A6B]">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#B58D3D]" />
                  <span>RSVP responses persist locally in demo mode</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowRsvpManager(true)}
                  className="text-[#B58D3D] hover:underline font-medium"
                >
                  View Guest List ({savedRecords.length})
                </button>
              </div>
            </form>
          )}
          </div>
        </ScrollReveal>
      </div>

      {/* RSVP Responses Manager Modal for the Couple */}
      {showRsvpManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FFFDF9] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col p-6 border border-[#C5A059]/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCF]">
              <div>
                <h3 className="font-serif text-2xl text-[#3E342B]">
                  Collected RSVP Responses
                </h3>
                <p className="text-xs text-[#7A6E5F]">
                  Total RSVPs: {savedRecords.length} · Attending:{' '}
                  {savedRecords.filter((r) => r.attending).reduce((sum, r) => sum + r.guestCount, 0)} guests
                </p>
              </div>

              <button
                onClick={() => setShowRsvpManager(false)}
                className="p-1.5 text-[#7A6E5F] hover:text-[#3E342B] rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {savedRecords.length === 0 ? (
                <div className="text-center py-12 text-[#8C7A6B] text-sm">
                  No RSVP responses recorded yet. Be the first to RSVP!
                </div>
              ) : (
                savedRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DCCF]/70 text-xs text-[#4E4133]"
                  >
                    <div className="flex items-center justify-between font-serif text-base font-semibold text-[#3E342B]">
                      <span>{rec.fullName}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-sans ${
                          rec.attending
                            ? 'bg-[#EED7CF] text-[#6C3E33]'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {rec.attending ? `Attending (${rec.guestCount})` : 'Declined'}
                      </span>
                    </div>
                    {rec.email && <div className="text-[#7A6E5F]">{rec.email}</div>}
                    {rec.attending && (
                      <div className="mt-1 text-[#5C4D3E]">
                        <strong>Meal:</strong> {rec.mealPreference}{' '}
                        {rec.dietaryNotes && `• Note: ${rec.dietaryNotes}`}
                      </div>
                    )}
                    {rec.message && (
                      <div className="mt-1 italic text-[#6C5E4E]">
                        &ldquo;{rec.message}&rdquo;
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E8DCCF] flex items-center justify-between">
              <span className="text-[11px] text-[#8C7A6B]">
                Connect to Firebase Firestore by setting up a collection in production.
              </span>
              <button
                onClick={handleDownloadCsv}
                disabled={savedRecords.length === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5C4D3E] hover:bg-[#43372B] disabled:opacity-40 text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
