import { notFound } from "next/navigation";

/**
 * This route is not used. Business Functions content lives on the landing (/#business-functions).
 * Only category routes like /demos/business-functions/recruitment-hr are valid.
 */
export default function BusinessFunctionsIndexPage() {
  notFound();
}
