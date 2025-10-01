import { objectToQueryString } from "@/lib/utils";


export async function POST(req: Request) {
    try {

        const fixed = objectToQueryString({CATEGORY_ID: 60}); // Фиксированное поле CATEGORY_ID=60
        const params = await req.text();  // Получаем данные с клиента (queryString)

        const combined = params && params.length ? `${params}&${fixed}` : fixed;
        const url = `https://boldbrands.bitrix24.kz/rest/1854/x6xylsxfrgg4lc0t/crm.deal.add.json?${combined}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const data = await response.json();

        console.log('Bitrix response:', data); // Логируем ответ от Bitrix для отладки

        if (!response.ok) {
            return new Response(JSON.stringify({ error: data }), { status: response.status });
        }

        // Возвращаем успешный ответ от Bitrix
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        // Обработка ошибок
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}