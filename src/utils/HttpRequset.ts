export interface HttpResponse {
    success: boolean
    responseType: string
    response: any
}
export class HttpRequset {
    public static doGet(url: string): HttpResponse {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("get", url, false, null, null);
        xhr.send();
        if (xhr.status === 200) {
            return {
                success: true,
                responseType: "text",
                response: xhr.response
            }
        } else {
            return {
                success: false,
                responseType: "text",
                response: xhr.response
            }
        }
    }
}