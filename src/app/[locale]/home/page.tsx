import HomePage from "@/domains/home";

export const metadata = {
    title: "Bold Brands International",
    description: "Ваш бизнес уперся в потолок? Мы — то самое креативное решение, которое вы ищите! Анализ вашего бизнеса, идентификация проблемы и разработка стратегии, которая будет соответствовать вашим целям и потребностям. Мы готовы помочь вашему бизнесу достичь новых высот!",
    openGraph: {
        title: "Главная страница компании | Bold Brands International",
        description: "Мы предлагаем креативные решения для вашего бизнеса. Узнайте, как мы можем помочь вам достичь новых высот.",
        url: "https://boldbrands.pro",
        images: [
            {
                url: "https://api.boldbrands.pro/media/banners/slide_3-min_1_imresizer.webp",
                width: 1200,
                height: 630,
                alt: "Bold Brands International - креативные решения для бизнеса"
            }
        ],
        site_name: "Bold Brands International"
    },
};

const Home = () => {
    return <HomePage />
}

export default Home;