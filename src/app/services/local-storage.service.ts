import { Injectable } from '@angular/core';
import { GidService } from './gid.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private gid: GidService) { }
    WriteFile(FileName: string, Data: string) {
        try {
            localStorage.setItem(FileName, this.gid.ConvertToBase64String(this.gid.Compress(Data)))
        }
        catch (ex) {
            //this.gid.Mesaj(this.gid.FormatString("Uygulama depolama alanında veri oluşturulamadı.\n\n {0}", [ex.message]));
        }
    }

    ReadFile(FileName: string, Default: string): string {
        let retval = Default;
        try {
            let data = localStorage.getItem(FileName);
            if (data != null) {
                retval = this.gid.DeCompress(this.gid.ConvertFromBase64String(data));
            }
        }
        catch (ex) {
            retval = Default;
            //this.gid.ShowMessage(this.gid.FormatString("Uygulama depolama alanından veri okunamadı.\n\n {0}", [ex.message]));
        }
        return retval;
    }

    DeleteFile(FileName: string): boolean {
        let retval = true;
        try {
            localStorage.removeItem(FileName);
            localStorage.removeItem("QT" + FileName);
        }
        catch (ex) {
            retval = false;
            //this.gid.ShowMessage(this.gid.FormatString("Uygulama depolama alanında veri silinemedi.\n\n {0}", [ex.message]));
        }
        return retval;
    }

    ReadFileQueryTime(FileName: string): number {
        let retval = 0;
        try {
            let strQT = localStorage.getItem("QT" + FileName);
            if (strQT != null) {
                retval = Number(strQT);
            }
        }
        catch (ex) {
            retval = 0;
            //this.gid.ShowMessage(this.gid.FormatString("Uygulama depolama alanından dosya tarihi okunamadı.\n\n {0}", [ex.message]));
        }
        return retval;
    }

    FileExists(FileName: string): boolean {
        let retval = false;
        try {
            retval = localStorage.getItem(FileName) != null;
        }
        catch (ex) {
            retval = false;
        }
        return retval;
    }

    Clear() {
        try {
            localStorage.clear();
        }
        catch(ex) {
        }
    }
}
