"use client";

import { House, IdCard, ScanSearch, Store, UsersRound } from "lucide-react";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const DEBOUNCE_MS = 300;

function GNBBottomTab() {
  const pathname = usePathname();
  const router = useRouter();

  // 연속 클릭 시 마지막 클릭만 반영하기 위한 trailing debounce
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHrefRef = useRef<string | null>(null);

  const [isHydrated, setIsHydrated] = useState(false);
  const isScreenWidth800 = useMediaQuery("(max-width: 800px)");
  const { scrollDirection, isScrolled } = useScrollDirection();

  const isCurrentPath = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const shouldHideNavbar = useMemo(() => {
    return isScreenWidth800 && scrollDirection === "down" && isScrolled;
  }, [isScreenWidth800, scrollDirection, isScrolled]);

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsHydrated(true);
  }, []);

  // 하이드레이션이 완료되지 않았거나 모바일이 아닌 경우 렌더링하지 않음
  if (!isHydrated || !isScreenWidth800) return null;

  const bottomTabItems = [
    {
      name: "홈",
      icon: <House className={cn("size-22pxr")} />,
      href: "#",
      invisible: false,
      highlight: isCurrentPath("/"),
    },
    {
      name: "채용공고",
      icon: <ScanSearch className={cn("size-22pxr")} />,
      href: "#",
      invisible: false,
      highlight: isCurrentPath("/job-posting"),
    },
    {
      name: "비자 상담",
      icon: <IdCard className={cn("size-22pxr")} />,
      href: "#",
      invisible: false,
      highlight: isCurrentPath("/visa-consulting"),
    },
    {
      name: "워크몰",
      icon: <Store className={cn("size-22pxr")} />,
      href: "#",
      invisible: false,
      highlight: isCurrentPath("/work-mall"),
    },
    {
      name: "마이페이지",
      icon: <UsersRound className={cn("size-22pxr")} />,
      href: "#",
      invisible: false,
      highlight: isCurrentPath("/my-info"),
    },
  ];

  return (
    <nav
      className={cn(
        "left-0pxr right-0pxr bottom-0pxr h-76pxr fixed z-9799 hidden rounded-t-3xl border-t bg-white/60 bg-gradient-to-b from-white/5 to-white/85 shadow-[0_0_10px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-200 will-change-[transform,opacity,blur]",
        "max900:block",
        {
          "translate-y-76pxr": shouldHideNavbar,
          "translate-y-0pxr": !shouldHideNavbar,
        }
      )}
    >
      <ul
        className={cn(
          "gap-8pxr px-20pxr pb-12pxr flex h-full w-full items-center justify-between"
        )}
      >
        {bottomTabItems.map((item) => {
          if (item.invisible) return null;

          return (
            <li
              key={item.name}
              className={cn("flex h-full flex-1 items-center justify-center")}
            >
              <Link
                className={cn("w-full")}
                onClick={(e) => handleMenuClick(e, item.href)}
                href={item.href}
              >
                <button
                  className={cn(
                    "gap-4pxr group/gnbBottomTab relative flex h-full w-full flex-col items-center"
                  )}
                  type="button"
                >
                  <div
                    className={cn(
                      "inset-0pxr absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-150 group-hover/gnbBottomTab:opacity-100 group-active/gnbBottomTab:opacity-100"
                    )}
                  />
                  <span className={cn(item.highlight && "text-blueDefault")}>
                    {item.icon}
                  </span>
                  <span
                    className={cn(
                      "text-12pxr",
                      item.highlight && "text-blueDefault",
                      "mb:text-10pxr"
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { GNBBottomTab };
