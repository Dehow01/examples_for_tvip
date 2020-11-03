import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ManagerService} from '../../manager.service';
import {IEmitentInfo} from '../../_interfaces/IEmitentInfo';

interface IResult {
    count: number;
    results: IEmitentInfo[];
}

@Component({
    selector: 'app-change-user-data',
    templateUrl: './change-user-data.component.html',
    styleUrls: ['./change-user-data.component.css']
})

export class ChangeUserDataComponent implements OnInit {
    emitentsData: IEmitentInfo[] = [];
    emitentsUpdated: IEmitentInfo[] = [];
    page = 0;
    showMoreEmitentsButton = false;
    formSearch: FormGroup;

    constructor(private managerService: ManagerService, private renderer: Renderer2) {
        this.formSearch = new FormGroup({
            searchLine: new FormControl('')
        });
    }

    ngOnInit() {
        this.getUserUpdated();
        this.getUserInfo();
    }

    getUserUpdated() {
        this.managerService.getUpdatedUser().subscribe((res: IResult) => {
            if (res.results) {
                this.emitentsUpdated = res.results;
            }
        });
    }

    getUserInfo(searchLine: string = '') {
        this.managerService.getDataUserForChange(searchLine, this.page).subscribe((res: IResult) => {
            if (res.results) {
                this.emitentsData = this.emitentsData.concat(res.results);
                this.showMoreEmitentsButton = (res.results.length >= 20);
            }
        });
    }


    searchEmitent() {
        this.emitentsData = [];
        this.page = 0;
        const searchLine = this.formSearch.value.searchLine;
        this.getUserInfo(searchLine);
    }

    getMoreEmitents() {
        this.page++;
        this.getUserInfo();
    }
}
