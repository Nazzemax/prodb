/* eslint-disable @typescript-eslint/no-explicit-any */

import { Spinner } from "../spinner";

interface RequestHandlerProps {
    isLoading?: boolean;
    error?: any;
    data: any;
    children: React.ReactNode;
}

export const RequestHandler: React.FC<RequestHandlerProps> = ({ isLoading, error, data, children }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                <p>Ошибка загрузки данных. Попробуйте позже.</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Нет данных для отображения.</p>
            </div>
        );
    }

    return <>{children}</>;
};