export async function POST(req: Request) {
    try {

        // Получаем строку от клиента. Ожидаем, что это query-string: "FIELDS[NAME]=John&FIELDS[PHONE]=123"
        const clientText = await req.text();

        // Собираем URLSearchParams из того, что прислал клиент (корректно парсит пустую строку)
        const params = new URLSearchParams(clientText);

        params.set('FIELDS[CATEGORY_ID]', '60');
        const url = `https://boldbrands.bitrix24.kz/rest/1854/x6xylsxfrgg4lc0t/crm.deal.add.json?`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
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