import React from 'react'
import { Badge, Avatar, Switch } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";


function NavbarComponent() {

    const [isInvisible, setIsInvisible] = React.useState(false);


    return (
        <div className='h-[60px] py-5 bg-white flex justify-between items-center px-5 shadow-xl shadow-gray-200'>
            <div className='w-96 h-full'>
                {/* <span>Dashboard</span> */}
            </div>

            <div className='w-96 h-full flex justify-end items-center gap-x-3'>

                {/* <Switch isSelected={!isInvisible} onValueChange={(value) => setIsInvisible(!value)}>
                    Show badge
                </Switch> */}


                <Badge color="danger" content={5} isInvisible={isInvisible} shape="circle">
                    <NotificationIcon className="fill-current" size={30} />


                </Badge>
                <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <div className='flex flex-col'>
                    <h2 className='font-bold'>Jose</h2>
                    <span className='text-sm'>Admin</span>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent
