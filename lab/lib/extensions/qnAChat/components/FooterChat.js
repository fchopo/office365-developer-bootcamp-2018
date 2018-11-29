var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as strings from 'QnAChatApplicationCustomizerStrings';
import styles from './FooterChat.module.scss';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
var FooterChat = (function (_super) {
    __extends(FooterChat, _super);
    function FooterChat(props, _a) {
        var _this = _super.call(this, props) || this;
        _this._handleNewUserMessage = function (newMessage) {
            _this.props.qnaService.getQnaAnswer(newMessage).then(function (answer) {
                addResponseMessage(answer);
            });
        };
        _this.state = {
            items: []
        };
        return _this;
    }
    FooterChat.prototype.render = function () {
        return (React.createElement("div", { className: styles.FooterChat },
            React.createElement(Widget, { handleNewUserMessage: this._handleNewUserMessage, title: strings.ChatTitle, subtitle: strings.ChatSubtitle })));
    };
    return FooterChat;
}(React.Component));
export default FooterChat;
//# sourceMappingURL=FooterChat.js.map