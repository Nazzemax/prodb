import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { FC } from 'react'

interface FeedbackContactItemProps {
    icon?: React.ReactNode;
    href?: string;
    title: string;
    contact: string;
    idx: number;
    lastIdx: number;
}

export const FeedbackContactItem: FC<FeedbackContactItemProps> = ({
    icon,
    title,
    contact,
    idx,
    lastIdx,
    href
}) => {
    return (
        <div className='flex gap-2 items-start max-w-full'>
            {icon && (
                <div className='bg-accent rounded-full p-2 flex items-center justify-center'>
                    {icon}
                </div>
            )}
            <div className={cn('flex flex-col gap-y-1', idx === lastIdx - 1 ? 'pl-12 md:pl-0' : '')}>
                <span className='text-gray text-base'>{title}</span>
                {href
                    ? <Link 
                        target='_blank' 
                        href={href} 
                        className={cn('text-white text-lg hover:text-accent ', idx === lastIdx - 4? 'text-gray2' : '')}
                    >
                        {contact}
                    </Link>
                    : <span 
                        className={cn('text-white text-lg hover:text-accent', idx === lastIdx ? 'text-slate-600' : '')}
                    >
                        {contact}
                    </span>
                }
            </div>
        </div>
    )
}
