"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { PlusIcon } from "@/components/icons";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <>
      <Sidebar className="group-data-[side=left]:border-r-0 dark:group-data-[side=left]:border-r dark:group-data-[side=left]:border-zinc-800/50">
        <SidebarHeader>
          <SidebarMenu>
            <div className="flex flex-row items-center justify-between">
              <Link
                className="flex flex-row items-center"
                href="/"
                onClick={() => {
                  setOpenMobile(false);
                }}
              >
                <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                  <Image
                    src="/images/irislogoblack.png"
                    alt="Iris Intelligence"
                    width={90}
                    height={28}
                    className="dark:hidden"
                    priority
                  />
                  <Image
                    src="/images/irislogowhitebig.png"
                    alt="Iris Intelligence"
                    width={90}
                    height={28}
                    className="hidden dark:block"
                    priority
                  />
                </div>
              </Link>
              <div className="flex flex-row gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-8 p-1 md:h-fit md:p-2"
                      onClick={() => {
                        setOpenMobile(false);
                        router.push("/");
                        router.refresh();
                      }}
                      type="button"
                      variant="ghost"
                    >
                      <PlusIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end" className="hidden md:block">
                    New Chat
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarHistory user={user} />
        </SidebarContent>
        <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
      </Sidebar>
    </>
  );
}
