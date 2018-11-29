import * as React from 'react';
import * as strings from 'QnAChatApplicationCustomizerStrings';
import styles from './FooterChat.module.scss';
import { IFooterChatProps } from './IFooterChatProps';
import { Widget, addResponseMessage, renderCustomComponent, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

export default class FooterChat extends React.Component<IFooterChatProps, {}> {
    constructor(props: IFooterChatProps,{}) {
        super(props);

        this.state = {
            items: []
        };
    }

    private _handleNewUserMessage = (newMessage) => {
        this.props.qnaService.getQnaAnswer(newMessage).then((answer) => {
            addResponseMessage(answer);
        });
    }

    public render() {
        return (
            <div className={styles.FooterChat}>
                <Widget
                    handleNewUserMessage={this._handleNewUserMessage}
                    title={strings.ChatTitle}
                    subtitle={strings.ChatSubtitle}
                />
            </div>
        );
    }
}