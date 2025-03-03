import { Heading } from "@/components/atoms/heading";

interface CaseStatsProps {
    stats: { header: string; title: string; description: string; }[];
}

export const CaseStats = ({
    stats
}: CaseStatsProps) => {
    return (
        <article className="max-w-[1120px] m-auto my-8 md:my-16 px-5 flex flex-col gap-y-5">
            <Heading as="h4" className="font-normal uppercase text-base md:text-lg text-gray2 min-w-[320px]">{stats[0]?.header}</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stats.map((stat, idx) => (
                    <div key={idx}>
                        <h3 className="text-accent text-[32px] md:text-[40px] font-bold">{stat.title}</h3>
                        <p className="text-gray2 text-sm md:text-base">{stat.description}</p>
                    </div>
                ))}
            </div>
        </article>
    )
}
