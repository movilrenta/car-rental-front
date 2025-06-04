"use client";

import { useEffect, useRef, useState } from "react";
import { useAppProvider } from "@/app/[locale]/app-provider";
import { useSelectedLayoutSegments } from "next/navigation";
import { Transition } from "@headlessui/react";
import { getBreakpoint } from "@/components/utils/utils";
import SidebarLinkGroup from "@/components/ui/sidebar-link-group";
import SidebarLink from "@/components/ui/sidebar-link";
import Image from "next/image";
import Link from "next/link";
import { LuCar } from "react-icons/lu";
import { BookIcon, CalendarDays, Map, Plus, Settings } from "lucide-react";
import { BiCarousel } from "react-icons/bi";
// import { PiUsersLight } from "react-icons/pi";
// import { TbLogs } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";

export default function Sidebar({
  variant = "default",
  authorized_roles,
  authorized_create_user,
  authorized_log,
}: {
  variant?: "default" | "v2";
  authorized_roles: boolean;
  authorized_create_user: boolean;
  authorized_log: boolean;
}) {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint()
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

  const DATA = [
    {
      value: "dashboard",
      icon: <Settings className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
    },
    {
      value: "reservas",
      icon: <BookIcon className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
      options: [
        {
          value: "ver",
        },
        {
          value: "agregar",
        },
      ],
    },
    {
      value: "vehiculos",
      icon: <LuCar className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
      options: [
        {
          value: "ver",
        },
        {
          value: "grupos",
        },
        {
          value: "marcas",
        },
      ],
    },
    {
      value: "adicionales",
      icon: <Plus className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
      options: [
        {
          value: "ver",
        },
        {
          value: "tarifas",
        },
      ],
    },
    {
      value: "fechas",
      icon: <CalendarDays className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
      options: [
        {
          value: "ver",
        },
      ],
    },
    {
      value: "sucursales",
      icon: <Map className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
      options: [
        {
          value: "ver",
        },
        {
          value: "direcciones",
        },
      ],
    },
    {
      value: "carousel",
      icon: <BiCarousel className="min-h-4 min-w-4 h-4 w-4" />,
      options: [
        {
          value: "ver",
        },
      ],
    },
    // {
    //   value: "log",
    //   icon: <TbLogs className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
    //   options: [
    //     {
    //       value: "ver",
    //     },
    //   ],
    // },
    // {
    //   value: "roles",
    //   icon: <PiUsersLight className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
    //   options: [
    //     {
    //       value: "ver",
    //     },
    //   ],
    // },
    {
      value: "crear-usuarios",
      icon: <GrUserAdmin className="min-h-4 min-w-4 h-4 w-4 stroke-2" />,
      options: [
        {
          value: "ver",
        }
      ],
    },
  ];

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [breakpoint]);

  return (
    <div className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        as="div"
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-sm"
        }`}
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Link href={"/"} className="">
            <Image
              src={"/images2/brand.png"}
              alt="logo"
              width={300}
              height={200}
              priority={true}
              className="w-auto"
            />
            {/* <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Discover Meetups</h1> */}
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Administración
              </span>
            </h3>
            <ul className="mt-3">
              {DATA.filter((item) => {
                if (item.value === "crear-usuarios")
                  return authorized_create_user;
                if (item.value === "log") return authorized_log;
                if (item.value === "roles") return authorized_roles;
                return true;
              }).map((item, index) =>
                item.options ? (
                  <SidebarLinkGroup
                    key={index}
                    open={segments.includes(item.value)}
                  >
                    {(handleClick, open) => {
                      return (
                        <>
                          <a
                            href="#0"
                            className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                              segments.includes(item.value)
                                ? ""
                                : "hover:text-gray-900 dark:hover:text-white"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              expandOnly
                                ? setSidebarExpanded(true)
                                : handleClick();
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`shrink-0 fill-current ${
                                    segments.includes(item.value)
                                      ? "text-violet-500"
                                      : "text-gray-400 dark:text-gray-500"
                                  }`}
                                >
                                  {item.icon}
                                </div>
                                <span className="capitalize text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {item.value}
                                </span>
                              </div>
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                              {item.options.map((sub) => {
                                return (
                                  <li
                                    key={sub.value}
                                    className="mb-1 last:mb-0  duration-200"
                                  >
                                    <SidebarLink
                                      href={`/admin/${item.value}/${sub.value}`}
                                    >
                                      <span className="capitalize text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        {sub.value}
                                      </span>
                                    </SidebarLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : (
                  <li
                    key={index}
                    className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                      segments.includes("inbox") &&
                      "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                    }`}
                  >
                    <SidebarLink href={`/admin/${item.value}`}>
                      <div className="flex items-center">
                        <div
                          className={`shrink-0 fill-current ${
                            segments.includes(item.value)
                              ? "text-violet-500"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span className="capitalize text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          {item.value}
                        </span>
                      </div>
                    </SidebarLink>
                  </li>
                )
              )}
            </ul>
          </div>
          {/* More group */}
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
