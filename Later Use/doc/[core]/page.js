"use client";

import { ScrollArea } from '@mantine/core'
import DocContent from './content'

import NavSystemMain from './NavSystem/main'



export default function main({params}) {
    const [SideNav , TopNav] = NavSystemMain();
    return ( 
        <div className="h-screen w-screen flex flex-col">
  
            <header className='w-screen bg-white/5 h-14 fixed z-40 border-b-[1px] border-solid border-gray-300  '>
                {TopNav}
            </header>

        <div className='h-screen top-14 fixed w-screen flex flex-row-reverse lg:flex-row  md:flex-row '>
            <nav>
                {SideNav}
            </nav>
            <section className='h-screen relative w-full'>
               <ScrollArea h={'100vh'}>
                    <DocContent t={params.core} />
                    <footer className='w-full h-64'>
                        Footer
                    </footer>
                </ScrollArea> 

            </section>
        </div>


        </div>
    )
}