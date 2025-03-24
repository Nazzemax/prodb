import { Spinner } from '../spinner';

export const PageLoader = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Spinner/>
        </div>
    );
};