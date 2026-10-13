"use client";

interface KeyPointsCardProps {
  duration?: { nights: number; days: number };
  hotelRating?: string;
  keyPoints?: string[];
  isInternational?: boolean;
  flightsIncluded?: boolean;
}

export default function KeyPointsCard({
  duration = { nights: 7, days: 8 },
  hotelRating = "5-Star Luxury",
  keyPoints = [],
  isInternational = false,
  flightsIncluded = false,
}: KeyPointsCardProps) {
  // If custom key points are provided in DB, prioritize them
  const defaultItems = [
    {
      icon: "calendar_today",
      text: `${duration.nights} Nights / ${duration.days} Days`,
    },
    {
      icon: "hotel",
      text: hotelRating || "5-Star Accommodation",
    },
    {
      icon: "directions_car",
      text: "Private AC Vehicle Transfers",
    },
    {
      icon: "restaurant",
      text: "Daily Breakfast Included",
    },
    {
      icon: flightsIncluded ? "flight" : "check_circle",
      text: flightsIncluded ? "Flights Included" : (isInternational ? "Airport VIP Meet & Greet" : "Dedicated Trip Host"),
    },
    {
      icon: "support_agent",
      text: "24/7 Specialist Concierge",
    },
  ];

  const items =
    keyPoints && keyPoints.length >= 4
      ? keyPoints.slice(0, 6).map((kp, idx) => ({
          icon: idx === 0 ? "calendar_today" : idx === 1 ? "hotel" : "check_circle",
          text: kp,
        }))
      : defaultItems;

  return (
    <div className="key-points-card">
      {items.map((item, i) => (
        <div key={i} className="key-point-item">
          <span className="material-symbols-rounded">{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
