import jsPDF from 'jspdf';

export function exportPlotPDF(plotName, result, corners) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Plot Details Report', 20, 20);

  doc.setFontSize(12);
  doc.text(`Plot Name: ${plotName || 'Untitled Plot'}`, 20, 35);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 43);

  doc.setFontSize(14);
  doc.text('Measurements', 20, 58);
  doc.setFontSize(11);
  doc.text(`Area: ${result.areaSqMeters.toFixed(2)} sq meters`, 25, 67);
  doc.text(`Perimeter: ${result.perimeterMeters.toFixed(2)} meters`, 25, 74);

  doc.setFontSize(14);
  doc.text('Unit Conversions', 20, 88);
  doc.setFontSize(11);
  doc.text(`Square Feet: ${result.units.sqFeet}`, 25, 97);
  doc.text(`Square Yards (Gaj): ${result.units.sqYards}`, 25, 104);
  doc.text(`Acres: ${result.units.acres}`, 25, 111);
  doc.text(`Hectares: ${result.units.hectares}`, 25, 118);

  doc.setFontSize(14);
  doc.text('Corner Coordinates', 20, 132);
  doc.setFontSize(10);
  let y = 141;
  corners.forEach((c, i) => {
    doc.text(`Point ${i + 1}: Lat ${c.lat.toFixed(6)}, Lng ${c.lng.toFixed(6)}`, 25, y);
    y += 7;
  });

  doc.save(`${(plotName || 'plot-report').replace(/\s+/g, '-')}.pdf`);
}
