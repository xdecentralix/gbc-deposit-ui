"use client";

import { truncateAddress } from "@/utils/truncateAddress";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { ArrowRightStartOnRectangleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { formatEther } from "viem";
import { gnosis } from "viem/chains";
import { useAccount, useAccountEffect, useBalance, useDisconnect } from "wagmi";

export default function Deposit() {
  const account = useAccount();
  const balance = useBalance({ address: account.address, chainId: gnosis.id });
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useAccountEffect({
    onDisconnect() {
      router.push("/");
    },
  });

  return (
    <div className="w-full h-[375px] bg-[#F0EBDE] flex flex-col text-black rounded-2xl items-center px-4 py-6">
      <p className="font-bold text-2xl">Gnosis Beacon Chain Deposit</p>
      <div className="w-full flex mt-4">
        <div className="w-2/6 flex flex-col text-base">
          <div className="w-min bg-[#133629] flex items-center rounded-full mt-4 mb-7 text-white p-2">
            {truncateAddress(account.address ? account.address : "")} <DocumentDuplicateIcon className="ml-2 h-5 w-5" />
          </div>
          Balance:
          <p className="font-bold text-4xl mb-7">{Math.round(Number(formatEther(balance.data?.value || BigInt(0))))} GNO</p>
          Network:
          <p className="font-bold text-lg">{account.chain?.name}</p>
          <button
            onClick={() => {
              disconnect();
              router.push("/");
            }}
            className="flex items-center mt-8 underline"
          >
            Sign Out <ArrowRightStartOnRectangleIcon className="ml-1 h-5 w-5" />
          </button>
        </div>
        <div className="w-4/6 bg-[#FFFFFFB2] h-[280px] p-6 flex flex-col items-center rounded-2xl">
          Upload deposit date file
          <div className="flex font-bold items-center">
            deposit_data.json <InformationCircleIcon className="ml-px h-5 w-5" />
          </div>
          <Image src="/drop.svg" alt="Drop" width={80} height={24} className="my-8" />
          <div>Drag file to upload or browse</div>
        </div>
      </div>
    </div>
  );
}
