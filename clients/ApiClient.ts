class ApiClient {
    constructor(){

    }


    async post(url: string, body: any){
        const res = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: body && JSON.stringify(body)
        });
        if(!res.ok){
            throw new Error("failed to fetch");
        }

        const json = await res.json();
        return json;
    }

    async get(url: string){
        const res = await fetch(url);
        if(!res.ok){
            throw new Error("failed to fetch");
        }

        const json = await res.json();
        return json;
    }

    async put(url: string, body: any){
        const res = await fetch(url, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: body && JSON.stringify(body)
        });
        if(!res.ok){
            throw new Error("failed to fetch");
        }

        const json = await res.json();
        return json;
    }

    async delete(url: string){
        const res = await fetch(url, {
            method: "DELETE"
        });
        if(!res.ok){
            throw new Error("failed to fetch");
        }

        const json = await res.json();
        return json;
    }
}

export default new ApiClient();