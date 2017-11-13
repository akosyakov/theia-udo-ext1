/**
 * Generated using theia-extension-generator
 */

import {  UdosSecondExtensionCommandContribution, UdosSecondExtensionMenuContribution } from './udos-second-extension-contribution';
import { MINI_WIDGET_FACTORY_ID, MiniWidget } from './udos-second-extension-contribution';
import { HelloWorldHandler} from './udos-second-extension-contribution';

import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";


 import { WidgetFactory } from "@theia/core/lib/browser";

import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(HelloWorldHandler).toSelf().inSingletonScope();
    bind(CommandContribution).to(UdosSecondExtensionCommandContribution).inSingletonScope();
    bind(MenuContribution).to(UdosSecondExtensionMenuContribution).inSingletonScope();
    bind(MiniWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => ({
        id: MINI_WIDGET_FACTORY_ID,
        createWidget: () => context.container.get<MiniWidget>(MiniWidget)
    })).inSingletonScope();

});