import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpService } from "../http.service";
import { Observable, Subscription, combineLatest, of } from "rxjs";
import { map, mergeMap, mergeAll, toArray, catchError, tap } from "rxjs/operators";
import { Photo } from "../shared/photo.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {
  userPhotos$: Observable<string | {}>;
  public initialContentLoaded = false;
  public showImages = false;
  private search$: Observable<{}>;
  private photos$: Observable<string[]>;
  private infos$: Observable<Object[]>;
  private combine$: Observable<[string[], Object[]]>;
  private subscription: Subscription;
  public photos: Photo[] = [];
  private page = 1;
  public user_id: string;
  public searchText: string;

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
        (data) => {
          this.user_id = data.user_id;
          this.user_id ? this.search(12, 1, undefined, this.user_id) : this.search(12, 1, "dogs");
        });
  }

  private search(per_page: number, page: number, tag?: string, user_id?: string) {
    if (!user_id) {
      this.search$ = this.httpService.searchFlickr(tag, per_page, page);
    } else {
      this.search$ = this.httpService.getUserPhotosFlickr(user_id, per_page, page);
    }
    this.search$ = this.search$.pipe(
      tap((r) => console.log(r)),
      map(response => response["photos"]["photo"]),
      mergeAll(),
      catchError(err => of(`Error: ${err}`))
    );
    this.photos$ = this.search$.pipe(
      mergeMap(response => this.httpService.getSizesFlickr(response["id"])),
      map(response => response["sizes"]["size"][4]["source"]),
      catchError(err => of(`Error: ${err}`)),
      toArray()
    );
    this.infos$ = this.search$.pipe(
      mergeMap(response => this.httpService.getPhotoInfoFlickr(response["id"])),
      map(response => response["photo"]),
      catchError(err => of(`Error: ${err}`)),
      toArray()
    );
    this.combine$ = combineLatest(this.photos$, this.infos$);

    this.subscription = this.combine$.subscribe(response => {
      response[0].forEach((element, i) => {
        const url = response[0][i];
        const title = response[1][i]["title"]["_content"] || "[no title]";
        const owner_name = response[1][i]["owner"]["username"];
        const owner_id = response[1][i]["owner"]["nsid"];
        const date = response[1][i]["dates"]["taken"];
        const region = response[1][i]["location"]["region"]['_content'];
        const country = response[1][i]["location"]["country"]['_content'];
        const likes = Math.floor(Math.random() * 10);
        this.photos.push({
          url: url,
          title: title,
          owner_name: owner_name,
          owner_id: owner_id,
          likes: likes,
          date: date,
          region: region,
          country: country,
        });
      });
      this.showImages = true;
      this.initialContentLoaded = true;
    });
  }

  public onScroll() {
    if (this.photos.length >= 100) {
      return;
    }
    this.showImages = false;
    this.page += 1;
    if (!this.user_id) {
      this.search(this.photos.length < 88 ? 12 : 100 - this.photos.length, this.page, "dogs");
    } else {
      this.search(this.photos.length < 88 ? 12 : 100 - this.photos.length, this.page, undefined, this.user_id);
  }
}

  public onReturnToHome() {
    this.router.navigateByUrl('');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
