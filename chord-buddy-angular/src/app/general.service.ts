import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  SERVER_ADDR = 'http://localhost:9094/';

  constructor(private httpClient: HttpClient) { }

  apiGet(urlData, callBackFunction: (data) => void) {
    this.httpClient.get(this.SERVER_ADDR + urlData).subscribe((response) => {
      callBackFunction(response);
    });
  }

  apiPost(url, postData, callBackFunction: (data) => void) {

  }
}
