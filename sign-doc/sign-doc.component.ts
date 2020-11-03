import {Component, Input, OnInit, Renderer2, Output, EventEmitter, OnChanges} from '@angular/core';
import {CryptoPro} from 'ruscryptojs';
import {NotifierService} from 'angular-notifier';
import {IDoc} from '../_interfaces/IDoc';
import {HttpService} from '../http.service';
import {AuthenticationService} from "../_services/authentication.service";

@Component({
    selector: 'app-sign-doc',
    templateUrl: './sign-doc.component.html',
    styleUrls: ['./sign-doc.component.css']
})
export class SignDocComponent implements OnChanges {
    @Input() documents: File[] = [];
    signFile: IDoc[] = [];
    listCerts = [];
    loadingDoc = [];
    currentInfo;
    cryptopro;

    constructor(private renderer2: Renderer2, private notifier: NotifierService, private httpService: HttpService, private authenticationService: AuthenticationService) {
        this.cryptopro = new CryptoPro();
    }

    ngOnChanges() {
        for (let i = 0; i < this.documents.length; i++) {
            this.signFile[i] = {
                file: this.documents[i]
            };
        }
    }

    setSignDoc(e) {
        const idx = e.value;
        if (this.authenticationService.currentUserValue.userRole[0] === 'ROLE_UNCONFIRMED_USER') {
            this.notifier.notify('warning', 'Для подписи документов необходимо загрузить сертификат электронной подписи');
            return;
        }
        this.signDoc(this.documents[idx], idx);
    }

    signDoc(file, index) {
        if (!this.currentInfo) {
            this.notifier.notify('warning', 'Выберите сертификат для подписания');
            return;
        }
        this.loadingDoc[index] = true;
        const thumbprint = this.currentInfo.Thumbprint;
        this.httpService.getBase64(file).then((data) => {
            this.cryptopro.signData(data, thumbprint)
                .then(sign => {
                    this.signFile[index] = {
                        file,
                        sign
                    };
                }).catch(e => {
                this.notifier.notify('error', e.message);
            })
                .finally(() => {
                    this.loadingDoc[index] = false;
                });
        });
    }

    refresh() {
        this.cryptopro.init().then((info) => {
            return this.cryptopro.listCertificates();
        }).then(certs => {
            if (certs.length) {
                this.listCerts = certs;
            }
        }).catch(e => {
            this.notifier.notify('error', e.message);
        });
    }

    setCertificate(event) {
        const targetId = event.target.value;
        this.currentInfo = null;
        if (!targetId) {
            return;
        }
        this.resetCertSelected();
        this.cryptopro.init().then(info => {
            return this.cryptopro.certificateInfo(targetId);
        }).then(info => {
            this.currentInfo = info;
        }).catch(e => {
            this.notifier.notify('error', e.message);
        });
    }


    getFilesAndSign() {
        return this.signFile;
    }

    resetData() {
        this.signFile = [];
        this.loadingDoc = [];
    }

    resetCertSelected() {
        for (let i = 0; i < this.signFile.length; i++) {
            this.signFile[i] = {
                file: this.documents[i],
                sign: null
            };
        }
    }
}
