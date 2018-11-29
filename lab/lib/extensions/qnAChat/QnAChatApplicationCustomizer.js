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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { QnAService } from '../../services/QnAServices';
import FooterChat from './components/FooterChat';
var LOG_SOURCE = 'QnAChatApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var QnAChatApplicationCustomizer = (function (_super) {
    __extends(QnAChatApplicationCustomizer, _super);
    function QnAChatApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QnAChatApplicationCustomizer.prototype.onInit = function () {
        this._renderFooter();
        return Promise.resolve();
    };
    QnAChatApplicationCustomizer.prototype._renderFooter = function () {
        // Instantiate QnA service
        var service = new QnAService({
            context: this.context,
        });
        // Handling the bottom placeholder
        if (!this._bottomPlaceholder) {
            this._bottomPlaceholder =
                this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
            // The extension should not assume that the expected placeholder is available.
            if (!this._bottomPlaceholder) {
                console.error('The expected placeholder (Bottom) was not found.');
                return;
            }
            var element = React.createElement(FooterChat, {
                qnaService: service
            });
            ReactDom.render(element, this._bottomPlaceholder.domElement);
        }
    };
    QnAChatApplicationCustomizer.prototype._onDispose = function () {
        console.log('Disposed custom bottom placeholders.');
    };
    __decorate([
        override
    ], QnAChatApplicationCustomizer.prototype, "onInit", null);
    return QnAChatApplicationCustomizer;
}(BaseApplicationCustomizer));
export default QnAChatApplicationCustomizer;
//# sourceMappingURL=QnAChatApplicationCustomizer.js.map