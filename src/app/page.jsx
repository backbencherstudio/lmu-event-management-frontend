import Image from "next/image";
import Landingpage from "../app/(client)/_components/landingpage";
import Menu from "./(client)/_components/menu";
export default function Home() {
  return (
    <>
    
      <Menu />
      { <Landingpage /> }


    </>

  );
}
