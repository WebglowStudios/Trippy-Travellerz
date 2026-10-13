import { redirect } from "next/navigation";

export default function DashboardReviewsRedirect() {
  redirect("/dashboard?tab=reviews");
}
