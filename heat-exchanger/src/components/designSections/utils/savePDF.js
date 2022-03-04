import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

export default async function savePDF() {
    const sections = ["#print-main", "#print-config", "#print-detail", "#print-pressure"]
    const margin = 10;
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const pdfHeight = pdf.internal.pageSize.getHeight() - margin * 2;
    const pdfRatio = pdfHeight / pdfWidth;
    await new Promise(resolve => setTimeout(resolve, 500));
    return sections.reduce((p, section, i) => p.then(async () => {
        if (i > 0) {
            pdf.addPage();
            pdf.setPage(i + 1);
        }
        const canvas = await html2canvas(document.querySelector(section));
        const imgData = canvas.toDataURL('image/png');
        const { height: imgHeight, width: imgWidth } = pdf.getImageProperties(imgData);
        const imgRatio = imgHeight / imgWidth;
        if (imgRatio < pdfRatio) {
            const scaledImgHeight = pdfWidth * imgRatio;
            pdf.addImage(imgData, "PNG",
                margin, margin + 0.5 * (pdfHeight - scaledImgHeight), pdfWidth, scaledImgHeight);
        } else {
            const scaledImgWidth = pdfHeight / imgRatio;
            pdf.addImage(imgData, "PNG",
                margin + 0.5 * (pdfWidth - scaledImgWidth), margin, scaledImgWidth, pdfHeight);
        }
    }).then(() => {
        if (i == sections.length - 1) {
            pdf.save(`deisgn-${new Date().toLocaleString()}.pdf`);
        }
    }), Promise.resolve());
    // return html2canvas(document.querySelector("#print")).then(canvas => {
    //     console.log(canvas.width)
    //     const imgData = canvas.toDataURL('image/png')
    //     const { height: imgHeight, width: imgWidth } = pdf.getImageProperties(imgData);
    //     const imgRatio = imgHeight / imgWidth;
    //     if (imgRatio < pdfRatio) {
    //         const scaledImgHeight = pdfWidth * imgRatio;
    //         pdf.addImage(imgData, "PNG",
    //             margin, margin + 0.5 * (pdfHeight - scaledImgHeight), pdfWidth, scaledImgHeight);
    //     } else {
    //         const scaledImgWidth = pdfHeight / imgRatio;
    //         pdf.addImage(imgData, "PNG",
    //             margin + 0.5 * (pdfWidth - scaledImgWidth), margin, scaledImgWidth, pdfHeight);

    //     }
    //     pdf.save("download.pdf");
    //     return Promise.resolve();
    // });

}