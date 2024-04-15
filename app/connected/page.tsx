import Image from "next/image";
import DropDown from "@/components/dropdown";
import Deposit from "@/components/deposit";
import NavigationTab from "@/components/navigation-tab";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    state?: string;
  };
}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="w-full lg:w-[775px] bg-[#133629CC] backdrop-blur-sm p-4 rounded-2xl flex gap-y-6 flex-col justify-start items-center">
        <div className="w-full gap-x-4 flex justify-between">
          <NavigationTab value="deposit"/>
          <NavigationTab value="withdrawal"/>
          <NavigationTab value="validator"/>
        </div>
        <Deposit />
        <div className="w-full flex justify-between">
          <div className="w-1/4 flex">
            <Image src="/logo.svg" alt="Gnosis Logo" width={45} height={24} />
            <div className="flex flex-col ml-2">
              <Image src="/gnosis.svg" alt="Gnosis Text" width={100} height={24} />
              <p className="text-[6px] lg:text-[8px] mt-2">BEACON CHAIN DEPOSIT</p>
            </div>
          </div>
          <div className="w-2/4 flex justify-center text-sm lg:text-base items-center underline">Learn more about the Gnosis Beacon Chain</div>
          <div className="w-1/4 flex justify-center items-center">
            {" "}
            <DropDown />{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
