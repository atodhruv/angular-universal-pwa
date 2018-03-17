import { Component, Inject, OnInit } from '@angular/core';
import { EchoService } from '../services/echo.service';
import { Observable } from 'rxjs/Observable';
import { IPost } from '../model/ipost';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   templateUrl: `list.component.html`,
    styles: [`
        a:hover {cursor: pointer}
    `]
})
export class ListComponent implements OnInit {
   public posts: Observable<IPost[]>;
   public page: number;

   constructor(private echoService: EchoService, private activatedRoute: ActivatedRoute, private router: Router) {}

   public ngOnInit(): void {
       this.activatedRoute.queryParams.subscribe(params => {
           this.page = +params['page'] || 0;
           this.posts = this.echoService.getPosts(this.page * 10 + 1, 10);
       });
   }

   public nextPage(): void {
       this.router.navigate(['posts'], {queryParams: {page: this.page + 1}});
   }

   public previousPage(): void {
       this.router.navigate(['posts'], {queryParams: {page: this.page - 1}});
   }
}

