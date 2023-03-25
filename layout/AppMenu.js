import getConfig from "next/config";
import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const model = [
    {
      label: "Home",
      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      label: "Umum",
      items: [
        {
          label: "Surat",
          icon: "pi pi-fw pi-id-card",
          items: [
            {
              label: "Data Surat",
              icon: "pi pi-id-card",
              to: "/pages/surat_umum/",
            },
            {
              label: "Upload Surat",
              icon: "pi pi-upload",
              to: "/pages/surat_umum/upload",
            },
          ],
        },
        {
          label: "Undangan",
          icon: "pi pi-fw pi-id-card",
          items: [
            {
              label: "Data Surat Undangan",
              icon: "pi pi-id-card",
              to: "/pages/surat_undangan/",
            },
            {
              label: "Upload Surat",
              icon: "pi pi-upload",
              to: "/pages/surat_undangan/upload",
            },
          ],
        },
      ],
    },
    {
      label: "Agenda",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Agenda",
          icon: "pi pi-fw pi-id-card",
          items: [
            {
              label: "Agenda Kegiatan",
              icon: "pi pi-calendar",
              to: "/pages/agenda",
            },
            {
              label: "Upload Surat",
              icon: "pi pi-upload",
              to: "/pages/kepegawaian/upload",
            },
          ],
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
