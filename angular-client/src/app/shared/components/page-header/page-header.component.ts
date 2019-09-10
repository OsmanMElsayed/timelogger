import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {

    @Input()
    title = 'Page Title!';

    @Input()
    text: string = null;

    get showText(): boolean {
        return Boolean(this.text);
    }

}
