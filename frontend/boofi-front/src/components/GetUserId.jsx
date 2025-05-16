async function GetUserId(token) {
    const response = await fetch("http://localhost:8080/auth/me", {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
    });

    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
    }

    const text = await response.text();
    console.log("Id пользователя:", text);

    const {id} = await JSON.parse(text);
    return id;
}

export default GetUserId;