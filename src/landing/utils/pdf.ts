import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportAppToPdf(): Promise<void> {
  const printArea = document.querySelector<HTMLElement>('#printable-content');
  if (!printArea) {
    console.warn('No printable content found.');
    return;
  }

  const loader = showPrintLoader();

  const prevDisplay = printArea.style.display;
  document.body.classList.add('print-mode');
  printArea.style.display = 'block';

  const sections: HTMLElement[] = [];
  const cover = printArea.querySelector<HTMLElement>('.print-cover');
  if (cover) sections.push(cover);
  printArea.querySelectorAll<HTMLElement>('.print-module').forEach((el) => sections.push(el));

  const liveSection = document.querySelector<HTMLElement>('.demo-panel');
  if (liveSection) {
    try {
      const liveCanvas = await html2canvas(liveSection, { scale: 2, useCORS: true });
      const img = document.createElement('img');
      img.src = liveCanvas.toDataURL('image/png');
      const wrap = document.createElement('div');
      wrap.className = 'print-live';
      wrap.appendChild(img);
      printArea.appendChild(wrap);
      sections.push(wrap);
    } catch (err) {
      console.warn('Failed to capture live playground', err);
    }
  }

  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();

    for (let i = 0; i < sections.length; i += 1) {
      const el = sections[i];
      const canvas = await safeCapture(el);
      if (!canvas) {
        // Skip problematic sections instead of throwing
        if (i > 0) pdf.addPage();
        pdf.text('Section unavailable', 10, 10);
        continue;
      }
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    }

    pdf.save('tsxgraph-course.pdf');
  } finally {
    // Restore
    printArea.style.display = prevDisplay;
    document.body.classList.remove('print-mode');
    if (loader?.parentElement) loader.parentElement.removeChild(loader);
  }
}

async function safeCapture(el: HTMLElement): Promise<HTMLCanvasElement | null> {
  try {
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '1100px';
    clone.style.background = '#fff';
    clone.classList.add('print-clone');
    document.body.appendChild(clone);
    const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
    clone.remove();
    return canvas;
  } catch (err) {
    console.warn('Capture failed', err);
    return null;
  }
}

function showPrintLoader(): HTMLElement {
  const overlay = document.createElement('div');
  overlay.className = 'print-loader';
  overlay.innerHTML = '<div class="print-spinner"></div><p>Preparing PDF…</p>';
  document.body.appendChild(overlay);
  return overlay;
}
