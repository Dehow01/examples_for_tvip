import {Component, OnInit, Renderer2} from '@angular/core';
import {ManagerService} from '../../manager.service';
import {EventMeeting} from '../../_interfaces/event';

@Component({
    selector: 'app-manager-meetings',
    templateUrl: './manager-meetings.component.html',
    styleUrls: ['./manager-meetings.component.css']
})
export class ManagerMeetingsComponent implements OnInit {
    statusArchive = false;
    events: EventMeeting[] = [];
    selectDate: string;

    constructor(private renderer: Renderer2, private managerService: ManagerService) {
    }

    ngOnInit() {
        this.getData();
    }

    deleteViewApplication(target) {
        this.renderer.setStyle(target, 'display', 'none');
    }

    updateApplicationEvent(index) {
    }

    getData() {
        if (this.statusArchive) {
            this.managerService.getEventsForMonthFull(this.selectDate).subscribe((res: any) => {
                this.events = res.results;
            });
        } else {
            this.managerService.getEventsUnaccepted().subscribe((res: any) => {
                this.events = res.results;
            });
        }
    }

    changeCategory(status) {
        if (status === 'archive') {
            this.statusArchive = true;
        } else if (status === 'unaccepted') {
            this.statusArchive = false;
        }
        this.getData();
    }

    onChangedMonth(date: any) {
        this.selectDate = date;
        if (this.statusArchive) {
            this.getData();
        }
    }

}
