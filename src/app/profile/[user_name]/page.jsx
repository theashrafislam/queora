"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Profile = () => {
    const session = useSession();
    return (
        <div className='max-w-5xl mx-auto my-10'>
            <div className="flex justify-between items-center gap-4">
                <div>
                    {/* image and name */}
                    <div className='flex items-start gap-5'>
                        <div>{(session?.data?.user?.image || session?.data?.user?.image_url) && <Image src={session?.data?.user?.image || session?.data?.user?.image_url} height={1000} width={1000} alt={session?.data?.user?.image || session?.data?.user?.image_url} className='w-36  rounded-full border-2' />}
                        </div>
                        <div>
                            <h3 className='mt-4 text-2xl font-bold'>{session?.data?.user?.full_name || session?.data?.user?.name}</h3>
                            <p className='text-gray-500'>
                                <span>0 followers </span>
                                | 
                                <span> 0 following</span>
                            </p>
                        </div>
                    </div>
                    {/* bio  */}
                    {/* <div >hello bio</div> */}
                </div>
                <div>Credentials & Highlights</div>
            </div>
        </div>
    );
};

export default Profile;