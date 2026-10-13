import { redirect } from "next/navigation";

export default function DashboardEnquiriesRedirect() {
  redirect("/dashboard?tab=enquiries");
}
