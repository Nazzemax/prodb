export async function POST(req: Request) {
    try {
        // Собираем URLSearchParams из того, что прислал клиент (корректно парсит пустую строку)
        const params = await req.text();

        // params.set('FIELDS[CATEGORY_ID]', '60');
        const url = `https://boldbrands.bitrix24.kz/rest/1854/7ddadajkaoif2g9z/crm.lead.add.json?${params}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
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