import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private api = "https://api.flickr.com/services/rest/?";
  private apiKey = "aa41d73d4c817ec8720dbe254c8fe21a";
  private format = "json";
  private nojsoncallback = "1";

  constructor(private httpClient: HttpClient) { }

  public searchFlickr(searchText: string, per_page: number, page: number): Observable<{}> {
    const httpParams = new HttpParams()
      .set("method", "flickr.photos.search")
      .set("api_key", this.apiKey)
      .set("text", searchText)
      .set("per_page", per_page.toString())
      .set("page", page.toString())
      .set("format", this.format)
      .set("nojsoncallback", this.nojsoncallback);
    return this.httpClient.get<{}>(this.api, { params: httpParams });
  }

  public getSizesFlickr(photo_id: number): Observable<{}> {
    const httpParams = new HttpParams()
      .set("method", "flickr.photos.getSizes")
      .set("api_key", this.apiKey)
      .set("photo_id", photo_id.toString())
      .set("format", this.format)
      .set("nojsoncallback", this.nojsoncallback);
    return this.httpClient.get<{}>(this.api, { params: httpParams });
  }

  public getPhotoInfoFlickr(photo_id: number): Observable<{}> {
    const httpParams = new HttpParams()
      .set("method", "flickr.photos.getInfo")
      .set("api_key", this.apiKey)
      .set("photo_id", photo_id.toString())
      .set("format", this.format)
      .set("nojsoncallback", this.nojsoncallback);
    return this.httpClient.get<{}>(this.api, { params: httpParams });
  }

  public getUserPhotosFlickr(user_id: string, per_page: number, page: number): Observable<{}> {
    const httpParams = new HttpParams()
      .set("method", "flickr.people.getPublicPhotos")
      .set("api_key", this.apiKey)
      .set("user_id", user_id)
      .set("per_page", per_page.toString())
      .set("page", page.toString())
      .set("format", this.format)
      .set("nojsoncallback", this.nojsoncallback);
    return this.httpClient.get<{}>(this.api, { params: httpParams });
  }
}
