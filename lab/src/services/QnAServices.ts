import { HttpClient, IHttpClientOptions, HttpClientConfiguration } from "@microsoft/sp-http";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface QnAServiceConfiguration {
    context: ApplicationCustomizerContext;
}

export class QnAService {
    private context: ApplicationCustomizerContext;
    private knowledgebaseId: string = "<-- KB Base ID -->";
    private knowledgeBaseUrl: string="<-- QNA Url -->";
    private knowledgeBaseEndPointKey: string="<-- EndpointKey -->";

    constructor(config: QnAServiceConfiguration) {
        this.context = config.context;
    }

    public async getQnaAnswer(userQuery: string): Promise<String> {
        let answer: string = 'Lo siento... ¡No he podido encontrar una respuesta a tu pregunta!';
        // Build URI
        const postURL=`https://${this.knowledgeBaseUrl}/qnamaker/knowledgebases/${this.knowledgebaseId}/generateAnswer`;

        // Build body
        const body: string = JSON.stringify({
            'question': userQuery
        });

        // Build headers
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append('Authorization',`EndpointKey ${this.knowledgeBaseEndPointKey}`);

        const httpClientOptions: IHttpClientOptions = {
            body: body,
            headers: requestHeaders
        };

        let response = await this.context.httpClient.post(
            postURL,
            HttpClient.configurations.v1,
            httpClientOptions
        );

        if (response.ok) {
            let json = await response.json();
            if (json.answers[0].answer != 'No good match found in the KB')
                answer = json.answers[0].answer;
        }
        return answer;
    }
}