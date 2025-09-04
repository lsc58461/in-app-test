"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useRef } from "react";

import logoIcon from "@/public/images/svgs/logo_black_horizontal.svg";
import { useUserStore } from "@/stores/use-user-store";
import { TUserType } from "@/types/user";
import { cn } from "@/utils/cn";
import { gnbMenuConfig } from "@/utils/gnb-menu-config";

import { Button } from "../button/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface ISideMenuProps {
  userType: TUserType;
  isSideMenuOpen: boolean;
  onSideMenuClose: () => void;
}

const DEBOUNCE_MS = 300;

function SideMenu({
  userType,
  isSideMenuOpen,
  onSideMenuClose: handleSideMenuClose,
}: ISideMenuProps) {
  const pathname = usePathname();
  const { accessToken } = useUserStore();
  const router = useRouter();

  // 연속 클릭 시 마지막 클릭만 반영하기 위한 trailing debounce
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHrefRef = useRef<string | null>(null);

  const handleMenuClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    // 보조키(새 탭 열기 등)나 좌클릭이 아닌 경우는 기본 동작 허용
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    // 기본 내비게이션을 잠시 막고 마지막 클릭만 처리
    e.preventDefault();
    lastHrefRef.current = href;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      const target = lastHrefRef.current;
      if (target) {
        const isSamePath = pathname === target;
        const hasQuery =
          typeof window !== "undefined" && window.location.search.length > 0;

        if (isSamePath && !hasQuery) {
          // 동일 경로 + 쿼리 없음: 라우터 재사용으로 인해 요청이 스킵될 수 있으므로 강제 새로고침 이벤트 발행
          window.dispatchEvent(new Event("job-posting-refresh"));
        } else {
          router.push(target);
        }
      }
      clickTimerRef.current = null;
      lastHrefRef.current = null;
    }, DEBOUNCE_MS);
  };

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "bottom-0pxr left-0pxr top-0pxr max-w-274pxr gap-40pxr px-30pxr pb-30pxr pt-76pxr mb:pt-68pxr fixed flex w-full flex-col justify-between bg-white transition-all duration-300",
        isSideMenuOpen ? "translate-x-0pxr" : "-translate-x-full"
      )}
    >
      <nav
        className={cn("overflow-y-auto")}
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        <ul className={cn("gap-16pxr flex flex-col")}>
          {gnbMenuConfig({ userType }).map((menu) => {
            const { text, link, icon, disabled, isHighlight, isNew } = menu;

            if (disabled) {
              return null;
            }

            return (
              <li key={text} className={cn("relative")}>
                <Link href={link} onClick={(e) => handleMenuClick(e, link)}>
                  <button
                    type="button"
                    className={cn(
                      "text-14pxr text-grayDark gap-8pxr relative flex items-center text-left font-bold transition-all duration-200 hover:text-black",
                      isHighlight && pathname === link && "text-black"
                    )}
                    onClick={handleSideMenuClose}
                  >
                    {isNew && (
                      <span
                        className={cn(
                          "px-4pxr text-10pxr -right-32pxr bg-blueDefault absolute top-1/2 -translate-y-1/2 rounded text-white shadow-sm"
                        )}
                      >
                        New
                      </span>
                    )}
                    {icon} {text}
                  </button>
                </Link>
              </li>
            );
          })}
          <div className="h-1pxr w-full bg-[#1e1e1e]" />
          {accessToken ? (
            <>
              <Link href="/my-info" onClick={handleSideMenuClose}>
                <Button variant="gray" size="small">
                  {"button.myPage"}
                </Button>
              </Link>
              <Button variant="gray" size="small" onClick={() => {}}>
                {"button.signOut"}
              </Button>
            </>
          ) : (
            <Link href="/signin">
              <Button variant="gray" size="small" onClick={handleSideMenuClose}>
                {"button.signUpSignIn"}
              </Button>
            </Link>
          )}
        </ul>
      </nav>
      <Link href="/">
        <button type="button">
          <Image src={logoIcon} width={128} priority alt="WorkVisa Logo" />
        </button>
      </Link>
    </div>
  );
}

export { SideMenu };
