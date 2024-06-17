"use client";
import { IconSearch,IconBrandGithub ,IconHome,IconExclamationCircle, IconChevronRight, IconMenu2, IconX} from '@tabler/icons-react';
import Image from 'next/image'
import NASJSpic from '/public/LOGO-with-text.png'
import { Group, Input  } from '@mantine/core';
import React from 'react';








  export default function HeaderDoc( { NavControl, setNavControl} ) {

    const toggle = () => {
      setNavControl(!NavControl);
    }

    return (
        <>
            <Group justify="space-between" >
                <Image alt='NAS-JS-Logo' className='ml-[0.1px]' width={120} src={NASJSpic} />
                <div className= ' bg-transparent h-14 w-[200px] md:w-[400px] flex flex-row gap-4 justify-end items-center pr-4 md:pr-0 '>
                    <Input w={180} radius="md" size="xs" rightSection={<IconSearch size={16} />} placeholder="Search" />
                    <IconBrandGithub className='w-[35px]' opacity={0.5}  />
                    {
                      NavControl ? <IconX  opacity={0.5} onClick={toggle}  className='w-[35px] md:w-0 translate-x-0 md:translate-x-[100px] ' /> : <IconMenu2 opacity={0.5} onClick={toggle}  className='w-[35px] md:w-0 translate-x-0 md:translate-x-[100px] '/>
               
                    }
                     </div>
            </Group>
        </>
    )
}





