import jsPDF from "jspdf";

// ─── Types ───
export interface BookingPdfData {
  _id: string;
  bookingId?: string;
  package?: {
    _id?: string;
    name?: string;
    slug?: string;
    destination?: { name?: string; slug?: string } | string;
    duration?: { nights?: number; days?: number } | number;
    images?: string[];
    hotelRating?: string;
    isInternational?: boolean;
    visaIncluded?: boolean;
    flightsIncluded?: boolean;
    trainsIncluded?: boolean;
  };
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  primaryTraveller?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  travellersDetails?: { name: string; age?: number; dob?: string | Date; phone?: string; type?: string }[];
  travelDate?: string;
  returnDate?: string;
  status?: string;
  bookingStatus?: string;
  totalAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
  paymentStatus?: string;
  travellers?: { adults?: number; children?: number; infants?: number } | number;
  specialRequests?: string;
  contactPhone?: string;
  contactEmail?: string;
  dateChangeHistory?: { oldDate: string; newDate: string; reason: string; changedAt: string }[];
  createdAt?: string;
}

// ─── Brand Colors ───
const C = {
  brown: [88, 55, 30] as [number, number, number],
  ochre: [142, 95, 50] as [number, number, number],
  caramel: [166, 115, 65] as [number, number, number],
  cream: [250, 247, 242] as [number, number, number],
  dark: [28, 22, 18] as [number, number, number],
  body: [87, 76, 67] as [number, number, number],
  gray: [138, 128, 119] as [number, number, number],
  border: [234, 227, 216] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  green: [22, 101, 52] as [number, number, number],
  red: [185, 28, 28] as [number, number, number],
};

function s(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .replace(/₹/g, "Rs.")
    .replace(/—/g, " - ")
    .replace(/–/g, "-")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/…/g, "...")
    .replace(/•/g, "-")
    .replace(/·/g, "-")
    .replace(/×/g, "x")
    .replace(/[^\x00-\xFF]/g, "");
}

function fmt(amount?: number): string {
  return "Rs. " + new Intl.NumberFormat("en-IN").format(amount || 0);
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "Flexible Dates";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatShortDate(dateStr?: string): string {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getStatusLabel(status?: string): string {
  if (!status) return "Confirmed";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusColor(status?: string): [number, number, number] {
  switch (status?.toLowerCase() || "confirmed") {
    case "confirmed":
      return C.green;
    case "completed":
      return C.green;
    case "cancelled":
      return C.red;
    case "pending":
      return C.ochre;
    default:
      return C.ochre;
  }
}

export function generateBookingPdf(booking: BookingPdfData): void {
  const doc = new jsPDF("p", "mm", "a4");
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 16;
  const CW = W - M * 2;

  let y = 38;

  const checkPage = (neededSpace: number) => {
    if (y + neededSpace > H - 25) {
      doc.addPage();
      y = 20;
    }
  };

  // Header Banner
  doc.setFillColor(...C.brown);
  doc.rect(0, 0, W, 28, "F");
  doc.setFillColor(...C.ochre);
  doc.rect(0, 28, W, 2, "F");

  // Brand Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...C.white);
  doc.text("Trippy Travelerz", M, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(230, 215, 200);
  doc.text("CURATED LUXURY & BESPOKE EXPEDITIONS", M, 20);

  // Booking Ref
  const displayId = booking.bookingId || `TTZ-${booking._id.slice(-8).toUpperCase()}`;
  const statusStr = booking.status || booking.bookingStatus || "confirmed";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...C.white);
  doc.text(displayId, W - M, 13, { align: "right" });

  const statusColor = getStatusColor(statusStr);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...statusColor);
  doc.text(getStatusLabel(statusStr).toUpperCase(), W - M, 20, { align: "right" });

  y = 38;

  // Package Overview Card
  const rectHeight = 36;
  doc.setFillColor(...C.cream);
  doc.roundedRect(M, y, CW, rectHeight, 3, 3, "F");
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.3);
  doc.roundedRect(M, y, CW, rectHeight, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...C.brown);
  const pkgName = s(booking.package?.name || "Curated Bespoke Escape");
  const nameLines = doc.splitTextToSize(pkgName, CW - 16);
  doc.text(nameLines, M + 8, y + 10);

  const destStr = typeof booking.package?.destination === "object"
    ? booking.package?.destination?.name || ""
    : booking.package?.destination || "";
  const duration = typeof booking.package?.duration === "object" && booking.package.duration
    ? `${booking.package.duration.nights || 0}N / ${booking.package.duration.days || 0}D`
    : "";
  const hotelRating = s(booking.package?.hotelRating || "");

  const metaParts: string[] = [];
  if (destStr) metaParts.push(destStr);
  if (duration) metaParts.push(duration);
  if (hotelRating) metaParts.push(hotelRating);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.body);
  doc.text(metaParts.join("   |   "), M + 8, y + 10 + nameLines.length * 5 + 4);

  y += rectHeight + 8;

  // Booking Details Grid
  const colW = CW / 2;

  doc.setFillColor(...C.ochre);
  doc.rect(M, y, 18, 1.5, "F");
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...C.brown);
  doc.text("Reservation Summary", M, y);
  y += 8;

  function field(label: string, value: string, x: number, fy: number): number {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.gray);
    doc.text(label.toUpperCase(), x, fy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...C.dark);
    const valLines = doc.splitTextToSize(s(value), colW - 12);
    doc.text(valLines, x, fy + 5);
    return fy + 5 + valLines.length * 4.5 + 5;
  }

  let yL = y;
  yL = field("Travel Date", formatDate(booking.travelDate), M, yL);

  let travText = "1 Adult";
  if (typeof booking.travellers === "object" && booking.travellers) {
    const parts: string[] = [];
    if (booking.travellers.adults) parts.push(`${booking.travellers.adults} Adult${booking.travellers.adults > 1 ? "s" : ""}`);
    if (booking.travellers.children) parts.push(`${booking.travellers.children} Child${booking.travellers.children > 1 ? "ren" : ""}`);
    if (booking.travellers.infants) parts.push(`${booking.travellers.infants} Infant${booking.travellers.infants > 1 ? "s" : ""}`);
    travText = parts.join(", ") || "1 Adult";
  } else if (typeof booking.travellers === "number") {
    travText = `${booking.travellers} Guest${booking.travellers > 1 ? "s" : ""}`;
  }
  yL = field("Party Size", travText, M, yL);
  yL = field("Reservation Status", getStatusLabel(statusStr), M, yL);
  yL = field("Booked On", formatShortDate(booking.createdAt), M, yL);

  let yR = y;
  yR = field("Total Package Value", fmt(booking.totalAmount), M + colW, yR);
  yR = field("Amount Paid", fmt(booking.paidAmount || booking.totalAmount), M + colW, yR);
  const remaining = Math.max(0, (booking.totalAmount || 0) - (booking.paidAmount || 0));
  yR = field("Remaining Balance", fmt(remaining), M + colW, yR);
  if (booking.contactEmail || booking.user?.email) {
    yR = field("Contact Email", booking.contactEmail || booking.user?.email || "", M + colW, yR);
  }

  y = Math.max(yL, yR) + 6;

  // Primary Guest Details
  const pt = booking.primaryTraveller;
  const usr = booking.user;
  const travFirstName = pt?.firstName || usr?.firstName || "";
  const travLastName = pt?.lastName || usr?.lastName || "";
  const travEmail = pt?.email || usr?.email || booking.contactEmail || "";
  const travPhone = pt?.phone || usr?.phone || booking.contactPhone || "";

  if (travFirstName || travEmail) {
    doc.setFillColor(...C.ochre);
    doc.rect(M, y, 18, 1.5, "F");
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...C.brown);
    doc.text("Lead Traveler", M, y);
    y += 8;

    const fullName = `${travFirstName} ${travLastName}`.trim();
    if (fullName) yL = field("Full Name", fullName, M, y);
    else yL = y;
    if (travEmail) yR = field("Email Address", travEmail, M + colW, y);
    else yR = y;
    y = Math.max(yL, yR);

    if (travPhone) {
      y = field("Phone Number", travPhone, M, y);
    }
  }

  // Payment Status Card
  y += 4;
  checkPage(34);
  doc.setFillColor(...C.brown);
  doc.roundedRect(M, y, CW, 26, 3, 3, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(230, 215, 200);
  doc.text("TOTAL RESERVATION INVESTMENT", M + 10, y + 9);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...C.white);
  doc.text(fmt(booking.totalAmount), M + 10, y + 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...C.cream);
  const pStat = remaining === 0 ? "PAID IN FULL" : `BALANCE DUE: ${fmt(remaining)}`;
  doc.text(pStat, W - M - 10, y + 16, { align: "right" });

  y += 34;

  // Important Advisory
  checkPage(35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.brown);
  doc.text("Traveler Advisory & Guidelines", M, y);
  y += 6;

  const notes = [
    "Please carry a valid government ID or Passport matching the lead traveler name.",
    "Your private travel concierge will reach out 72 hours prior with operational transfers.",
    "For customized itinerary adjustments or date queries, contact support at concierge@trippytravelerz.com.",
    "Official digital confirmation generated under Trippy Travelerz reservation terms.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.body);

  for (const note of notes) {
    doc.setFillColor(...C.ochre);
    doc.circle(M + 2, y - 0.8, 0.8, "F");
    doc.text(note, M + 6, y);
    y += 5;
  }

  // Footer
  const footY = H - 18;
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.2);
  doc.line(M, footY, W - M, footY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...C.gray);
  doc.text("Trippy Travelerz  |  concierge@trippytravelerz.com  |  +91 98765 43210", M, footY + 5);
  doc.text(`Generated: ${formatShortDate(new Date().toISOString())}`, W - M, footY + 5, { align: "right" });

  doc.setFontSize(6.5);
  doc.setTextColor(...C.gray);
  doc.text("System-generated booking voucher & confirmation. No physical signature required.", M, footY + 10);

  const fileName = `TrippyTravelerz_${displayId}.pdf`;
  doc.save(fileName);
}
