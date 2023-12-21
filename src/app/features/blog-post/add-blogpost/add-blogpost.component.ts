import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.models';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogPostComponent implements OnInit {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  private addBlogPostSubscription ?: Subscription;

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: [] 
    }
  }
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllcategories();

    
  }

  onFormSubmit() {
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }
  
  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

}
