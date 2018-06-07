import { Component, Input } from "@angular/core";
import { Photo } from "../../shared/photo.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  private isLiked: boolean;
  @Input() photo: Photo;

  constructor(public router: Router) {}

  public onAuthorPhotos() {
    this.router.navigate(['/user/' + this.photo.owner_id]);
  }

  public toggleLike() {
    !this.isLiked ? this.photo.likes += 1 : this.photo.likes -= 1 ;
    this.isLiked = !this.isLiked;
  }

}
