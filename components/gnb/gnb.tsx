"use client";

import { LogIn } from "lucide-react";
import Image from "next/image";

import { useEffect } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useModal } from "@/hooks/use-modal";
import globalIcon from "@/public/images/svgs/global.svg";
import logoHorizontalIcon from "@/public/images/svgs/logo_black_horizontal.svg";
import peopleIcon from "@/public/images/svgs/people.svg";
import { useLanguageModalStore } from "@/stores/use-language-modal-store";
import { useLocaleStore } from "@/stores/use-locale-store";
import { useUserStore } from "@/stores/use-user-store";
import { cn } from "@/utils/cn";

import { Button } from "../button/button";
import { ModalDim } from "../modal/modal-dim";
import { ModalLanguageSelection } from "../modal/modal-language-selection/modal-language-selection";
import { Portal } from "../portal/portal";

import { GnbMenu } from "./gnb-menu";
import { SideMenu } from "./side-menu";
import { SideMenuButton } from "./side-menu-button";
import Link from "next/link";

function Gnb() {
  const {
    dimRef: sideMenuDimRef,
    isModalOpen: isSideMenuModalOpen,
    closeModal: closeSideMenuModal,
    toggleModal: toggleSideMenuModal,
  } = useModal();
  const {
    dimRef: selectLanguageDimRef,
    isModalOpen: isSelectLanguageModalOpen,
    openModal: openSelectLanguageModal,
    closeModal: closeSelectLanguageModal,
  } = useLanguageModalStore();
  const { locale, setLocale } = useLocaleStore();
  const isScreenWidth900 = useMediaQuery("(max-width: 900px)");

  const { accessToken, user } = useUserStore();
  // const { handleSignOutClick } = useSignOut()

  const handleMenuClick = () => {
    toggleSideMenuModal();
  };

  const handleSelectLanguageModal = () => {
    openSelectLanguageModal();
  };

  useEffect(() => {
    if (!isScreenWidth900) {
      closeSideMenuModal();
    }
  }, [isScreenWidth900, closeSideMenuModal]);

  return (
    <>
      <div className={cn("absolute z-9800")}>
        <div
          className={cn(
            "left-20pxr top-24pxr mb:top-16pxr absolute z-9802 hidden",
            "max900:block"
          )}
        >
          <SideMenuButton
            isSideMenuModalOpen={isSideMenuModalOpen}
            handleMenuClick={handleMenuClick}
          />
        </div>
        <div className={cn("fixed z-9801")}>
          <SideMenu
            userType={user?.userType}
            isSideMenuOpen={isSideMenuModalOpen}
            onSideMenuClose={closeSideMenuModal}
          />
        </div>
        {isSideMenuModalOpen && (
          <ModalDim dimRef={sideMenuDimRef} onDimClick={closeSideMenuModal} />
        )}
      </div>
      <div
        className={cn(
          "top-0pxr h-88pxr px-32pxr py-24pxr max900:px-20pxr mb:h-70pxr z-8000 flex w-full items-center justify-center",
          "border-b border-white/20 bg-white/60 backdrop-blur-md",
          "bg-gradient-to-b from-white/5 to-white/85",
          "shadow-lg shadow-black/5",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "inset-0pxr pointer-events-none absolute bg-gradient-to-r from-blue-50/10 via-transparent to-purple-50/10"
          )}
        />

        <div
          className={cn(
            "max-w-1400pxr gap-12pxr relative z-10 flex w-full items-center justify-between"
          )}
        >
          <div className={cn("max900:block hidden")}>
            <div className="max900:w-60pxr" />
          </div>

          <div className={cn("max900:mx-auto")}>
            <Link href="/">
              <div className={cn("group relative")}>
                <div
                  className={cn(
                    "-inset-8pxr absolute rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-200 will-change-[opacity] group-hover:opacity-100 group-active:opacity-100"
                  )}
                />
                <Image
                  className={cn(
                    "mb:w-120pxr relative z-10 transition-transform duration-200 group-hover:scale-105 group-active:scale-105"
                  )}
                  src={logoHorizontalIcon}
                  alt=""
                  width={180}
                  priority
                />
              </div>
            </Link>
          </div>

          <div className={cn("mx-auto", "max900:hidden")}>
            <GnbMenu userType={user?.userType} />
          </div>

          <div
            className={cn("gap-24pxr flex items-center", "max900:gap-16pxr")}
          >
            {accessToken ? (
              <Link href="/my-info">
                <button
                  type="button"
                  className={cn(
                    "group relative flex items-center justify-center",
                    "p-8pxr rounded-full backdrop-blur-sm hover:bg-white/50 active:bg-white/50",
                    "transition-all duration-200 hover:scale-110 active:scale-110",
                    "max800:hidden"
                  )}
                >
                  <div
                    className={cn(
                      "inset-0pxr absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-200 will-change-auto group-hover:opacity-100 group-active:opacity-100"
                    )}
                  />
                  <Image
                    className={cn("mb:size-20pxr relative z-10")}
                    src={peopleIcon}
                    width={24}
                    height={24}
                    alt="People Icon"
                  />
                </button>
              </Link>
            ) : (
              <>
                <Link className={cn("max900:hidden")} href="/signin">
                  <Button
                    variant="primaryLine"
                    size="small"
                    className={cn(
                      "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 active:bg-gradient-to-r active:from-blue-50 active:to-purple-50",
                      "border-blackLight/30 shadow-sm backdrop-blur-sm hover:shadow-md active:shadow-md",
                      "transition-all duration-200 hover:scale-105 active:scale-105",
                      "max700:text-12pxr mb:py-2pxr"
                    )}
                  >
                    {"Sign Up / Sign In"}
                  </Button>
                </Link>
                <Link
                  className={cn("hidden", "max900:block", "max800:hidden")}
                  href="/signin"
                >
                  <button
                    type="button"
                    className={cn(
                      "group relative flex items-center justify-center",
                      "p-8pxr rounded-full backdrop-blur-sm hover:bg-white/50 active:bg-white/50",
                      "transition-all duration-200 hover:scale-110 active:scale-110"
                    )}
                  >
                    <div
                      className={cn(
                        "inset-0pxr absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-200 will-change-auto group-hover:opacity-100 group-active:opacity-100"
                      )}
                    />
                    <LogIn
                      className={cn(
                        "size-26pxr text-blueDefault relative z-10",
                        "mb:size-20pxr",
                        "transition-all duration-200 group-hover:drop-shadow-sm group-active:drop-shadow-sm"
                      )}
                    />
                  </button>
                </Link>
              </>
            )}

            <button
              type="button"
              className={cn(
                "group/translationModalButton relative flex items-center justify-center rounded-full",
                "p-8pxr backdrop-blur-sm hover:bg-white/50 active:bg-white/50",
                "transition-all duration-200 hover:scale-110 active:scale-110"
              )}
              aria-label="Change Language"
              onClick={handleSelectLanguageModal}
            >
              <div
                className={cn(
                  "inset-0pxr absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-200 will-change-auto group-hover/translationModalButton:opacity-100 group-active/translationModalButton:opacity-100"
                )}
              />

              <Image
                className={cn(
                  "mb:size-20pxr relative z-10 transition-all duration-200 group-hover/translationModalButton:drop-shadow-sm group-active/translationModalButton:drop-shadow-sm"
                )}
                src={globalIcon}
                width={24}
                height={24}
                alt="Global Icon"
              />
            </button>
            <Portal id="portal1" isPortalOpen={isSelectLanguageModalOpen}>
              <ModalDim
                dimRef={selectLanguageDimRef}
                onDimClick={closeSelectLanguageModal}
              >
                <ModalLanguageSelection
                  locale={locale}
                  onLocaleChange={(lo) => {
                    setLocale(
                      lo || {
                        locale: "ko",
                        originalText: "Korean",
                        koreanText: "한국어",
                      }
                    );
                  }}
                  isGlobal
                  onCloseClick={closeSelectLanguageModal}
                />
              </ModalDim>
            </Portal>
          </div>
        </div>
      </div>
    </>
  );
}

export { Gnb };
