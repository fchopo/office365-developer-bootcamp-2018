import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
export interface QnAServiceConfiguration {
    context: ApplicationCustomizerContext;
}
export declare class QnAService {
    private context;
    private knowledgebaseId;
    constructor(config: QnAServiceConfiguration);
    getQnaAnswer(userQuery: string): Promise<String>;
}
