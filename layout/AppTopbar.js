import getConfig from "next/config";
import { Toast } from "primereact/toast";
import { Menu } from "primereact/menu";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { SignOut } from "@/lib/firebase";

const IMAGE_URL =
  process.env.NODE_ENV == "production"
    ? "/sakai-react/images/logo_pemkot_semarang.png"
    : "/images/logo_pemkot_semarang.png";

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const menu = useRef(null);
  //const router = useRouter();
  const toast = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  const items = [
    {
      label: "Sign Out",
      icon: <FaSignOutAlt />,
      command: async () => {
        const status = await SignOut();
        console.log(status);
      },
    },
  ];

  return (
    <div className="layout-topbar">
      <Link legacyBehavior href="/">
        <a className="layout-topbar-logo">
          <>
            <Image src={IMAGE_URL} alt="logo" width={35} height={50} />
            <span>DP3A</span>
          </>
        </a>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <Link href={"/pages/agenda"}>
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-calendar"></i>
          </button>
        </Link>

        <>
          <Toast ref={toast}></Toast>
          <Menu model={items} popup ref={menu} />
          <button
            type="button"
            className="p-link layout-topbar-button"
            onClick={(e) => menu.current.toggle(e)}
          >
            <i className="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </>
      </div>
    </div>
  );
});

export default AppTopbar;
