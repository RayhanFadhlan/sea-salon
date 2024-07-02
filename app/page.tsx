import { ClientPage } from "./clientPage";
import { getServicesWithLoc } from "./actions/actions";

export default async function Home() {
  const servicesloc = await getServicesWithLoc();
  console.log(servicesloc);
  return <ClientPage services={servicesloc} />;
}
