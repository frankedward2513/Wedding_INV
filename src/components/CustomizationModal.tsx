import React, { useState } from 'react';
import { WeddingConfig } from '../config/weddingData';
import { X, RotateCcw, Copy, Check, Save } from 'lucide-react';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSaveConfig: (updated: WeddingConfig) => void;
  onResetDefaults: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<WeddingConfig>(config);
  const [copied, setCopied] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-[#FFFDF9] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-[#C5A059]/40 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E8DCCF] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <h3 className="font-serif text-2xl text-[#3E342B] font-semibold">
              Live Invitation Customizer
            </h3>
            <p className="text-xs text-[#7A6E5F]">
              Edit couple names, date, venues, &amp; RSVP rules live
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6E5F] hover:text-[#3E342B] rounded-lg transition-colors"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#4E4133]">
          {savedToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-center font-medium">
              Invitation details updated successfully!
            </div>
          )}

          {/* Couple Names */}
          <div className="space-y-3 pb-4 border-b border-[#E8DCCF]">
            <h4 className="font-serif text-lg text-[#3E342B] font-semibold">
              1. The Couple
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  Bride First Name
                </label>
                <input
                  type="text"
                  value={formData.couple.brideFirstName}
                  onChange={(e) => {
                    const bride = e.target.value;
                    setFormData({
                      ...formData,
                      couple: {
                        ...formData.couple,
                        brideFirstName: bride,
                        displayName: `${bride} & ${formData.couple.groomFirstName}`,
                        initials: `${bride.charAt(0)} & ${formData.couple.groomFirstName.charAt(0)}`,
                      },
                    });
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  Groom First Name
                </label>
                <input
                  type="text"
                  value={formData.couple.groomFirstName}
                  onChange={(e) => {
                    const groom = e.target.value;
                    setFormData({
                      ...formData,
                      couple: {
                        ...formData.couple,
                        groomFirstName: groom,
                        displayName: `${formData.couple.brideFirstName} & ${groom}`,
                        initials: `${formData.couple.brideFirstName.charAt(0)} & ${groom.charAt(0)}`,
                      },
                    });
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                Welcome Subtitle
              </label>
              <input
                type="text"
                value={formData.couple.welcomeSubtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couple: { ...formData.couple, welcomeSubtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Date & Countdown */}
          <div className="space-y-3 pb-4 border-b border-[#E8DCCF]">
            <h4 className="font-serif text-lg text-[#3E342B] font-semibold">
              2. Wedding Date &amp; Countdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  Display Date
                </label>
                <input
                  type="text"
                  value={formData.schedule.displayDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, displayDate: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  Countdown ISO Date (YYYY-MM-DDTHH:MM:SS)
                </label>
                <input
                  type="text"
                  value={formData.schedule.weddingDateISO}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, weddingDateISO: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  Ceremony Time
                </label>
                <input
                  type="text"
                  value={formData.schedule.ceremonyTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, ceremonyTime: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  Reception Time
                </label>
                <input
                  type="text"
                  value={formData.schedule.receptionTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, receptionTime: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Venues */}
          <div className="space-y-3 pb-4 border-b border-[#E8DCCF]">
            <h4 className="font-serif text-lg text-[#3E342B] font-semibold">
              3. Venues &amp; Locations
            </h4>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                Ceremony Venue Name
              </label>
              <input
                type="text"
                value={formData.venues.ceremony.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    venues: {
                      ...formData.venues,
                      ceremony: { ...formData.venues.ceremony, name: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                Reception Venue Name
              </label>
              <input
                type="text"
                value={formData.venues.reception.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    venues: {
                      ...formData.venues,
                      reception: { ...formData.venues.reception, name: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* RSVP Settings */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg text-[#3E342B] font-semibold">
              4. RSVP Rules
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  RSVP Deadline
                </label>
                <input
                  type="text"
                  value={formData.rsvp.deadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rsvp: { ...formData.rsvp, deadline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-[#7A6E5F]">
                  Max Guests per Party
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.rsvp.maxGuestsPerParty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rsvp: { ...formData.rsvp, maxGuestsPerParty: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFC488]/50 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-[#E8DCCF] bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-[#6C5E4E] border border-[#DFC488]/50 rounded-lg hover:bg-stone-50 text-xs font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B58D3D]" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-[#6C5E4E] border border-[#DFC488]/50 rounded-lg hover:bg-stone-50 text-xs font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#B58D3D]" />}
              <span>{copied ? 'Copied Config!' : 'Export JSON'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#7A6E5F] hover:text-[#3E342B]"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#5C4D3E] hover:bg-[#43372B] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
