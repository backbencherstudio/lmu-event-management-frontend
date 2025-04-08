import Image from "next/image";
import Landingpage from "./(client)/_components/landingpage";
import Menu from "./(client)/_components/menu";
export default function Home() {
  return (
    <>
    
      <Menu />
      { <Landingpage /> }


    </>

  );
}
