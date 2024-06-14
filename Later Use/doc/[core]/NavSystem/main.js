"use client";
import { useState } from 'react'
import SidenavDesk from './nav'
import HeaderDoc from './topbar'

export default function NavSystemMain() {
    const [IsOpen, setIsOpen] = useState(false);
    return [
        <SidenavDesk key={1} NavControl={IsOpen}  />,
        <HeaderDoc key={2} NavControl={IsOpen} setNavControl={setIsOpen}  />
    ]
}