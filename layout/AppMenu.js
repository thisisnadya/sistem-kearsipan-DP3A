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
          label: "Surat Masuk",
          icon: "pi pi-fw pi-id-card",
          items: [
            {
              label: "Data Surat Masuk",
              icon: "pi pi-fw pi-id-card",
              to: "/pages/surat_masuk/",
            },
            {
              label: "Upload Surat",
              icon: "pi pi-upload",
              to: "/pages/surat_masuk/upload",
            },
          ],
        },
        {
          label: "Surat Keluar",
          icon: "pi pi-fw pi-id-card",
          items: [
            {
              label: "Data Surat Keluar",
              icon: "pi pi-fw pi-id-card",
              to: "/pages/surat_keluar/",
            },
            {
              label: "Upload Surat",
              icon: "pi pi-upload",
              to: "/pages/surat_keluar/upload",
            },
          ],
        },
      ],
    },
    {
      label: "Kepegawaian",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Arsip Kepegawaian",
          icon: "pi pi-fw pi-id-card",
          items: [
            {
              label: "Upload Surat",
              icon: "pi pi-upload",
              to: "/pages/kepegawaian/upload",
            },
            {
              label: "Arsip Surat",
              icon: "pi pi-fw pi-id-card",
              to: "/pages/kepegawaian",
            },
          ],
        },
      ],
    },
    {
      label: "Hierarchy",
      items: [
        {
          label: "Submenu 1",
          icon: "pi pi-fw pi-bookmark",
          items: [
            {
              label: "Submenu 1.1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
              ],
            },
            {
              label: "Submenu 1.2",
              icon: "pi pi-fw pi-bookmark",
              items: [{ label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" }],
            },
          ],
        },
        {
          label: "Submenu 2",
          icon: "pi pi-fw pi-bookmark",
          items: [
            {
              label: "Submenu 2.1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
              ],
            },
            {
              label: "Submenu 2.2",
              icon: "pi pi-fw pi-bookmark",
              items: [{ label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" }],
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
