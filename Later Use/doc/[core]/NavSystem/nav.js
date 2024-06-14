"use client";
import {IconHome,IconExclamationCircle, IconChevronRight} from '@tabler/icons-react';

import {  NavLink, ScrollArea  } from '@mantine/core';
import { useState } from 'react';
import React from 'react';



const data = [
  { icon: IconHome, label: 'Home', chl : ["Installation"] },
  {
    icon: IconExclamationCircle,
    label: 'Issues',
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    chl : ["Password" ]
  },
];

const NAVDESKTOP = "transition-all  w-[0px] md:w-[250px] border-r-[1px] md:border-solid border-none md:border-gray-300 translate-x-10 md:translate-x-0 ";
const NAVMOBILE = "transition-all w-[100vw] border-r-[1px] md:border-solid border-gray-300 translate-x-0 "


const isOpen = false;


 export default function SidenavDesk ( { NavControl }) {
    const [active, setActive] = useState(-1);
  
    const items = data.map((item, index) => {

      const { chl } = item;
  
      return (
        
        <NavLink
        radius="md"
          key={item.label}
          active={index === active}
          label={item.label}

          childrenOffset={28}
          rightSection={item.rightSection}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={() => setActive(index)}
        >
          {Array.isArray(chl) ? (
            <ul>
              {chl.map((subItem) => (
                <li key={subItem}>
                  <NavLink radius="md" href={`/doc/${subItem}`} label={subItem} />
                </li>
              ))}
            </ul>
          ) : (
            <span>{chl}</span>
          )}
        </NavLink>
    
      );
    });
  
    return (
       
        <div  className={`${ NavControl ? NAVMOBILE : NAVDESKTOP} `}>
             <ScrollArea h={'100vh'} type="never" >
           
                    {items}
            
            </ScrollArea>
        </div>
       
    ); 
  }