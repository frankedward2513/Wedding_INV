import React from 'react';
import { WeddingConfig } from '../config/weddingData';
import { BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { Church, Wine, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';

interface WeddingDetailsSectionProps {
  config: WeddingConfig;
}

export const WeddingDetailsSection: React.FC<WeddingDetailsSectionProps> = ({ config }) => {
  // Generate .ics calendar download
  const handleAddToCalendar = () => {
    const startDate = config.schedule.weddingDateISO.replace(/[-:]/g, '').split('.')[0] + 'Z';
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aura & Bloom//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:Wedding Celebration: ${config.couple.displayName}`,
      `DESCRIPTION:Join us to celebrate the marriage of ${config.couple.displayName} at ${config.venues.ceremony.name}. Reception to follow at ${config.venues.reception.name}.`,
      `LOCATION:${config.venues.ceremony.address}, ${config.venues.ceremony.cityState}`,
      `DTSTART:${startDate}`,
      `DTEND:${startDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${config.couple.brideFirstName}_and_${config.couple.groomFirstName}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Wedding of ${config.couple.displayName}`
  )}&dates=${config.schedule.weddingDateISO.replace(/[-:]/g, '').split('.')[0]}Z/${config.schedule.weddingDateISO.replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(
    `Wedding celebration of ${config.couple.displayName}. Ceremony at ${config.venues.ceremony.name}, reception at ${config.venues.reception.name}.`
  )}&location=${encodeURIComponent(
    `${config.venues.ceremony.address}, ${config.venues.ceremony.cityState}`
  )}`;

  return (
    <section id="details" className="relative py-24 px-4 bg-[#F5EFE6]/60 overflow-hidden border-t border-b border-[#E8DCCF]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.9} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
            Where &amp; When
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3E342B] font-normal">
            Wedding Details
          </h2>
          <FloralDivider className="my-4" />
          <p className="text-sm sm:text-base text-[#6C5E4E] font-serif italic">
            {config.schedule.dayOfWeek}, {config.schedule.displayDate}
          </p>
        </ScrollReveal>

        {/* Two Column Grid for Ceremony and Reception */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* 1. The Ceremony Card */}
          <ScrollReveal direction="up" distance={40} duration={1} delay={100}>
            <div className="h-full bg-[#FFFDF9] rounded-2xl p-8 sm:p-10 border border-[#C5A059]/30 shadow-xl relative flex flex-col justify-between">
              <BotanicalCorner position="top-left" size={45} className="text-[#C5A059]/40" />
              <BotanicalCorner position="top-right" size={45} className="text-[#C5A059]/40" />

              <div>
                {/* Icon & Subtitle */}
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] border border-[#C5A059]/30 text-[#B58D3D] mb-5 shadow-sm">
                  <Church className="w-6 h-6" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold text-center block mb-1">
                  The Sacred Union
                </span>
                <h3 className="font-serif text-3xl text-[#3E342B] text-center mb-6">
                  The Ceremony
                </h3>

                <div className="space-y-4 my-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#5C4D3E]">
                    <Clock className="w-4 h-4 text-[#B58D3D]" />
                    <span className="font-medium">{config.schedule.ceremonyTime}</span>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-medium text-[#3E342B]">
                      {config.venues.ceremony.name}
                    </h4>
                    <p className="text-xs text-[#8C7A6B] font-serif italic mb-1">
                      {config.venues.ceremony.hall}
                    </p>
                    <p className="text-sm text-[#5C4D3E]">
                      {config.venues.ceremony.address}
                    </p>
                    <p className="text-sm text-[#7A6E5F]">
                      {config.venues.ceremony.cityState}
                    </p>
                  </div>

                  <p className="text-xs text-[#8C7A6B] bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DCCF]/60 max-w-sm mx-auto">
                    {config.venues.ceremony.notes}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E8DCCF]/60 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={config.venues.ceremony.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#5C4D3E] hover:bg-[#43372B] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#EED7CF]" />
                  <span>View Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#EED7CF]/70" />
                </a>

                <button
                  onClick={handleAddToCalendar}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#5C4D3E] border border-[#C5A059]/40 text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-[#B58D3D]" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* 2. The Reception Card */}
          <ScrollReveal direction="up" distance={40} duration={1} delay={250}>
            <div className="h-full bg-[#FFFDF9] rounded-2xl p-8 sm:p-10 border border-[#C5A059]/30 shadow-xl relative flex flex-col justify-between">
              <BotanicalCorner position="top-left" size={45} className="text-[#C5A059]/40" />
              <BotanicalCorner position="top-right" size={45} className="text-[#C5A059]/40" />

              <div>
                {/* Icon & Subtitle */}
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] border border-[#C5A059]/30 text-[#B58D3D] mb-5 shadow-sm">
                  <Wine className="w-6 h-6" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold text-center block mb-1">
                  Dinner &amp; Dancing
                </span>
                <h3 className="font-serif text-3xl text-[#3E342B] text-center mb-6">
                  The Reception
                </h3>

                <div className="space-y-4 my-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#5C4D3E]">
                    <Clock className="w-4 h-4 text-[#B58D3D]" />
                    <span className="font-medium">{config.schedule.receptionTime}</span>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-medium text-[#3E342B]">
                      {config.venues.reception.name}
                    </h4>
                    <p className="text-xs text-[#8C7A6B] font-serif italic mb-1">
                      {config.venues.reception.hall}
                    </p>
                    <p className="text-sm text-[#5C4D3E]">
                      {config.venues.reception.address}
                    </p>
                    <p className="text-sm text-[#7A6E5F]">
                      {config.venues.reception.cityState}
                    </p>
                  </div>

                  <p className="text-xs text-[#8C7A6B] bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DCCF]/60 max-w-sm mx-auto">
                    {config.venues.reception.notes}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E8DCCF]/60 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={config.venues.reception.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#5C4D3E] hover:bg-[#43372B] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#EED7CF]" />
                  <span>View Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#EED7CF]/70" />
                </a>

                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#5C4D3E] border border-[#C5A059]/40 text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-[#B58D3D]" />
                  <span>Google Calendar</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
