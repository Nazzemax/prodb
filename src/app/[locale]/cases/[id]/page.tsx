'use client';

import { useGetPostByIdQuery } from "@/api/Post";
import { RequestHandler } from "@/components/atoms/request-handler";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { CaseItemHeader } from "@/components/molecules/case-item-header";
import { CaseImages } from "@/components/organisms/case-images";
import { CaseStats } from "@/components/organisms/case-stats";
import { CaseTaskList } from "@/components/organisms/case-task-list";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { FormLayout } from "@/components/templates/form-layout";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";


const CasePage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetPostByIdQuery(id, {
        skip: !id,
    });

    console.log(data)

    return (
        <RequestHandler
            isLoading={isLoading}
            error={error}
            data={data}
        >
            {data &&
                <CaseItemHeader
                    post={data}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Кейсы', href: '/cases' },
                        { text: data?.title, href: '/cases' }
                    ]}
                />
            }
            <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
            {data?.tasks && <CaseTaskList tasks={data?.tasks} />}
            {data?.images && data?.images.length > 0 &&
                <>
                    <CaseImages images={data?.images} />
                    <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
                </>
            }

            {data?.target && data?.target.length > 0 &&
                <>
                    <CaseTaskList tasks={data.target} />
                    <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
                </>
            }
            {data?.results && data?.results.length > 0 &&
                <>
                    <CaseStats stats={data?.results} />
                    <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
                </>
            }
            
            <CompanyPostList title="Другие кейсы" />
            <FormLayout nestedForm={<FeedbackForm />} />
        </RequestHandler>
    )
}

export default CasePage;