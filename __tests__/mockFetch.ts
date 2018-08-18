const mockResponse = (status: number, statusText: string | null, response: any) => {
    return new Response(response, {
        status: status,
        statusText: statusText || "",
        headers: {
            'Content-type': 'application/json'
        }
    });
};

export {mockResponse};