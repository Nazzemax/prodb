export async function POST(req: Request) {
    try {
        const raw = await req.text(); 
        const params = new URLSearchParams(raw);

        const url = `https://boldbrands.bitrix24.kz/rest/1854/7ddadajkaoif2g9z/crm.lead.add.json?`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
        });

        const data = await response.json();

        console.log(params.toString());

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