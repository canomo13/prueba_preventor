import { Component } from '@angular/core';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent {
  images: any[] = [];
  searchQuery: any = '';
  imagesFound: boolean = false;
  searching: boolean = false;
  imageSelected: any = '';
  size: string = '';
  srcResult: any = {};
  error: boolean = false;
  messageError: string = '';

  handleSucces(data: any, query: any) {
    this.imagesFound = true;
    this.error = false;

    if (data.total === 0) {
      this.handleError(query);
    } else {
      this.images = data.hits;
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  imageIsSelected(imagen: any) {
    this.imageSelected = imagen;
    this.size = imagen.imageWidth + 'x' + imagen.imageHeight;
  }

  handleError(data: any) {
    this.error = true;
    if (data === '') {
      this.messageError = 'No hay ningún texto de búsqueda';
    } else if (data) {
      this.messageError = `No se encontraron resultados para la palabra ${data}`;
    }
  }

  constructor(private _imageService: ImageService) {}

  searchImage(query: string) {
    this.searching = true;
    if (query === '') {
      this.handleError(query);
    }
    return this._imageService.getImage(query).subscribe((data) => {
      if (query === '') {
        this.handleError(query);
      } else {
        this.handleSucces(data, query);
      }
    });
  }
}
