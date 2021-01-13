import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  shortLink: string = '';
  loading: boolean = false;
  file: File = null;

  constructor(private productServicer: ProductService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.file = event.target.files[0];
  }
  onUpload() {
    this.loading = !this.loading;
    var json = this.file;
    console.log(json);
    this.productServicer.uploadFile(json).subscribe((event: any) => {
      if (typeof event === 'object') {
        this.shortLink = event.link;
        this.loading = false;
      }
    });
  }
}
