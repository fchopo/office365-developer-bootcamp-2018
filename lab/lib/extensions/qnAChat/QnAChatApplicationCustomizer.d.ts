import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
export interface IQnAChatApplicationCustomizerProperties {
    testMessage: string;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class QnAChatApplicationCustomizer extends BaseApplicationCustomizer<IQnAChatApplicationCustomizerProperties> {
    private _bottomPlaceholder;
    onInit(): Promise<void>;
    private _renderFooter();
    private _onDispose();
}
