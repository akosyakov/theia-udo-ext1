import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MAIN_MENU_BAR, MessageService, CommandHandler } from "@theia/core/lib/common";
import { CommonMenus, VirtualWidget } from "@theia/core/lib/browser";
import { h } from '@phosphor/virtualdom/lib';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { FrontendApplication } from '@theia/core/lib/browser';


export const UdosSecondExtensionCommand = {
    id: 'UdosSecondExtension.command',
    label: "Shows a message"
};

@injectable()
export class UdosSecondExtensionCommandContribution implements CommandContribution {

    constructor(
        @inject(HelloWorldHandler) private readonly helloWorldHandler: HelloWorldHandler,
    ) { }


    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(UdosSecondExtensionCommand);
        registry.registerHandler(UdosSecondExtensionCommand.id, this.helloWorldHandler);
    }
}

@injectable()
export class HelloWorldHandler implements CommandHandler {

    constructor( @inject(WidgetManager) protected readonly widgetManager: WidgetManager,
        @inject(FrontendApplication) protected readonly app: FrontendApplication,
        @inject(MessageService) private readonly messageService: MessageService,
    ) {

    }
    public execute(): any {
        this.widgetManager.getOrCreateWidget(MINI_WIDGET_FACTORY_ID).then(widget => {
            this.app.shell.addToLeftArea(widget, { rank: 300 });
        });
        this.messageService.info('Hello World und Udo!');
        return null;
    }

    public isEnabled?(...args: any[]): boolean {
        return true;
    }


}

@injectable()
export class UdosSecondExtensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction([
            MAIN_MENU_BAR,
            CommonMenus.EDIT_MENU,
            CommonMenus.EDIT_MENU_FIND_REPLACE_GROUP
        ], {
                commandId: UdosSecondExtensionCommand.id,
                label: 'Say Hello to Udo'
            });
    }
}


export const MINI_WIDGET_FACTORY_ID = 'miniwidget';



export class MiniWidget extends VirtualWidget {

    protected readonly titleNode: HTMLDivElement;
    protected readonly contentNode: HTMLDivElement;
    protected readonly closeCrossNode: HTMLElement;
    protected closeButton: HTMLButtonElement | undefined;
    protected acceptButton: HTMLButtonElement | undefined;

    constructor() {
        super();
        this.id = 'udo-widget';
        this.title.label = 'Udo Widget';
        this.addClass("udo-widget");
    }

    protected render(): h.Child {
        const inputWidget = h.input({
            id: 'udo-input',
            value: "input stuff here"
        });
        const inputContainer = h.div({ className: "inputContainer" }, inputWidget);
        return [inputContainer];
    }



}