import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  pdfMake: any;

  constructor() {}

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf(cartItems, sum) {
    let items: string[] = [];
    let itemPrice: number[] = [];
    let itemQuantity: number[] = [];

    for (let i = 0; i < cartItems.length; i++) {
      items.push(cartItems[i].name);
      itemPrice.push(cartItems[i].price * cartItems[i].quantity);
      itemQuantity.push(cartItems[i].quantity);
    }

    console.log(JSON.stringify(items));
    await this.loadPdfMaker();

    const def = {
      content: [
        {
          toc: {
            title: { text: 'Invoice', style: 'header', lineHeight: 2 },
          },
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'Item', style: 'tableHeader' },
                { text: 'Quantity', style: 'tableHeader' },
                { text: 'Price', style: 'tableHeader' },
              ],
              [items, itemQuantity, itemPrice],
              [
                {
                  text: 'Total:',
                  rowSpan: 1,
                  bold: true,
                  background: 'yellow',
                  lineHeight: 1,
                },
                '',
                sum,
              ],
            ],
          },
          layout: 'headerLineOnly',
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        header: {
          fontSize: 20,
          bold: true,
          color: 'blue',
          alignment: 'center',
        },
      },
    };
    this.pdfMake.createPdf(def).open();
  }
}
