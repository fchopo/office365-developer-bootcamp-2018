import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'QnAChatApplicationCustomizerStrings';
import { QnAService } from '../../services/QnAServices';
import { IFooterChatProps } from './components/IFooterChatProps';
import FooterChat from './components/FooterChat';


const LOG_SOURCE: string = 'QnAChatApplicationCustomizer';


export interface IQnAChatApplicationCustomizerProperties {
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class QnAChatApplicationCustomizer
  extends BaseApplicationCustomizer<IQnAChatApplicationCustomizerProperties> {
    private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this._renderFooter();
    return Promise.resolve();
  }

  private _renderFooter(): void {
    // Instantiate QnA service
    const service = new QnAService({
      context: this.context,
    });

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }

      const element: React.ReactElement<IFooterChatProps> = React.createElement(
        FooterChat,
        {
          qnaService: service
        });

      ReactDom.render(element, this._bottomPlaceholder.domElement);
    }
  }
  private _onDispose(): void {
    console.log('Disposed custom bottom placeholders.');
  }
}
