export const printLabel = (html: string) => {
  // Create or find the print container
  let printContainer = document.getElementById('print-container');

  if (!printContainer) {
    printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.top = '-9999px';
    printContainer.style.width = '10cm';
    printContainer.style.height = '10cm';
    printContainer.style.zIndex = '-1';
    printContainer.style.overflow = 'hidden';
    document.body.appendChild(printContainer);
  }

  // Inject the label HTML
  printContainer.innerHTML = `
    <style>
      @page {
        size: 10cm 10cm;
        margin: 0;
      }
      @media print {
        html, body {
          width: 10cm !important;
          height: 10cm !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        body * {
          visibility: hidden;
        }
        #print-container,
        #print-container * {
          visibility: visible;
        }
        #print-container {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          width: 10cm !important;
          height: 10cm !important;
          z-index: 9999 !important;
          overflow: hidden !important;
          background: white !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          page-break-after: avoid !important;
          page-break-before: avoid !important;
        }
        .print-label {
          width: 100% !important;
          height: 100% !important;
          padding: 25px !important;
          box-sizing: border-box !important;
          border: 1px solid #d1d5db !important;
          border-radius: 12px !important;
          background: white !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          text-align: center !important;
          font-family: 'Inter', Arial, sans-serif !important;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
      @media screen {
        .print-label {
          display: none !important;
        }
      }
    </style>
    <div class="print-label">
      ${html}
    </div>
  `;

  // Trigger print
  window.print();

  // Clean up after printing (with delay to ensure print dialog is shown)
  setTimeout(() => {
    if (printContainer) {
      printContainer.innerHTML = '';
    }
  }, 1000);
};