import {Component, Input, OnInit} from '@angular/core';

declare var PDFObject: any;

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  @Input()
  src: string;

  constructor() { }

  ngOnInit() {
    PDFObject.embed(this.src, '#pdfContent');
  }

}
