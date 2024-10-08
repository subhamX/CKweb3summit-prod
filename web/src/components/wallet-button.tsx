"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export default function WalletButton() {

  const { connectors, connect } = useConnect()
  const { address } = useAccount()

  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  const { data, error, status } = useEnsName({ address })
  const { disconnect } = useDisconnect()


  console.log("ensName", ensName, address)

  return (
    <div suppressHydrationWarning>
      {!address ? (
        <div suppressHydrationWarning>
          <Dialog>
            <DialogTrigger asChild>
              <Button suppressHydrationWarning className="rounded-lg flex items-center gap-2 bg-foreground/20 backdrop-blur hover:bg-foreground/10 text-foreground">
                Connect Wallet
                <ArrowUpRight
                  size={22}
                  className="rounded-full bg-foreground text-background p-1"
                  strokeWidth={1}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle suppressHydrationWarning>Connect wallet</DialogTitle>
              <div className="flex flex-col gap-3 items-start">
                {!!connectors.length ? (
                  connectors.map((connector) => (
                    <button
                      key={connector.uid}
                      suppressHydrationWarning
                      onClick={() => connect({ connector })}
                    >
                      {connector.name}
                    </button>
                  ))
                ) : (
                  <p suppressHydrationWarning>No wallet found. Please download a supported Solana wallet</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

      ) : (
        <div suppressHydrationWarning>
          <div suppressHydrationWarning className="flex flex-col justify-center gap-1">
            <div suppressHydrationWarning className="text-xs">
              {/* {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                {address && (
                  <div>
                    {ensName ? `${ensName} (${address})` : address}
                  </div>
                )} */}
            </div>

            <Button
              size="sm"
              className="font-link leading"
              onClick={() => disconnect()}
              suppressHydrationWarning
            >
              Disconnect wallet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
