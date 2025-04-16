export async function POST(req: Request) {
    try {
        const params = await req.text();  // Получаем данные с клиента (queryString)
        const response = await fetch(`https://boldbrands.bitrix24.kz/rest/1854/yov4gowfxz6loavg/crm.lead.add.json?${params}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const data = await response.json();

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