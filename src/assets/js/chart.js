import ApexCharts from 'apexcharts';
let salesPurchaseChartInstance = null;
const PB_URL = 'http://127.0.0.1:8090';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('salesPurchaseChart')) {
    // créer chart vide (important)
    salesPurchaseChartInstance = new ApexCharts(
      document.querySelector("#salesPurchaseChart"),
      {
        series: [],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: { show: false }
        }
      }
    );

    salesPurchaseChartInstance.render();

    // 🔥 charger données dynamiques
    loadSalesPurchaseChart('week');
  }

  // ✅ FILTRE ICI (IMPORTANT)
  document.getElementById('filter-chart')?.addEventListener('change', (e) => {
    loadSalesPurchaseChart(e.target.value);
  });

  document.getElementById('download-chart')?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!salesPurchaseChartInstance) return;

    const { imgURI } = await salesPurchaseChartInstance.dataURI();
    const link = document.createElement('a');
    link.href = imgURI;
    link.download = 'sales-chart.png';
    link.click();
  });

  if (document.getElementById('customerChart')) {
    var options = {
      series: [44, 55],
      chart: {
        height: 200,
        type: 'radialBar',
      },
      colors: ['#5BE49B', '#E66239'],
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: { fontSize: '22px' },
            value: { fontSize: '16px' },
            total: { show: false },
          },
          hollow: {
            margin: 3,
            size: '40%',
            background: 'transparent',
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: 'front',
            dropShadow: { enabled: false, top: 0, left: 0, blur: 3, opacity: 0.5 },
          },
          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: "#f0f0f0",
            strokeWidth: '45%',
            opacity: 1,
            margin: 5,
            dropShadow: { enabled: false, top: 0, left: 0, blur: 3, opacity: 0.5 },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: ['#007867', '#FFD666', '#FFAC82'],
          stops: [0, 100],
        },
      },
      stroke: { lineCap: 'round' },
      labels: ['First Time', 'Return'],
    };

    var customerChart = new ApexCharts(document.querySelector('#customerChart'), options);
    customerChart.render();
  }

  async function getAnnualSalesData() {
    const token = localStorage.getItem('pb_token');
    if (!token) return { depenses: Array(12).fill(0), gains: Array(12).fill(0) };

    const depensesData = Array(12).fill(0);
    const gainsData = Array(12).fill(0);

    const [ventesRes, depensesRes, achatsRes, dettesRes] = await Promise.all([
      fetch(`${PB_URL}/api/collections/ventes_points_vente/records?perPage=1000`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${PB_URL}/api/collections/depenses_journalier/records?perPage=1000`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${PB_URL}/api/collections/achats_journaliers/records?perPage=1000`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${PB_URL}/api/collections/dettes_journalier/records?perPage=1000`, { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    const { items: ventes } = await ventesRes.json();
    const { items: depenses } = await depensesRes.json();
    const { items: achats } = await achatsRes.json();
    const { items: dettes } = await dettesRes.json();

    const allDepenses = [...depenses, ...achats, ...dettes];

    for (let record of allDepenses) {
      const date = new Date(record.date);
      const month = date.getMonth();
      const total = Object.values(record).filter(v => typeof v === 'number').reduce((s,v)=>s+v,0);
      depensesData[month] += total;
    }

    for (let record of ventes) {
      const date = new Date(record.date);
      const month = date.getMonth();
      const total = Object.values(record).filter(v => typeof v === 'number').reduce((s,v)=>s+v,0);
      gainsData[month] += total;
    }

    return { depenses: depensesData, gains: gainsData };
  }

  if (document.getElementById('salesChart')) {
    (async () => {
      const { depenses, gains } = await getAnnualSalesData();

      const options = {
        chart: {
          id: 'sales-overview',
          type: 'area',
          height: 420,
          zoom: { enabled: false },
          toolbar: { show: false }
        },
        colors: ['#E66239', '#198754'],
        stroke: { width: [3, 2.5], curve: 'smooth' },
        markers: { size: 4, hover: { sizeOffset: 2 } },
        series: [
          { name: 'Dépenses', data: depenses },
          { name: 'Gains', data: gains }
        ],
        fill: {
          type: 'gradient',
          gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 60, 100] }
        },
        yaxis: { title: { text: 'FC (K)' }, labels: { formatter: val => (val/1000).toFixed(0) + 'K' } },
        xaxis: { categories: ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sept','Oct','Nov','Dec'], tickPlacement: 'on' },
        tooltip: { shared: true, y: { formatter: val => (val/1000).toFixed(0) + ' K FC' } },
        legend: { position: 'top', horizontalAlign: 'right' },
        responsive: [{ breakpoint: 640, options: { chart: { height: 340 }, legend: { position: 'bottom', horizontalAlign: 'center' } } }]
      };

      var salesChart = new ApexCharts(document.querySelector("#salesChart"), options);
      salesChart.render();

      document.getElementById('download-chart-annual')?.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!salesChart) return;
        const { imgURI } = await salesChart.dataURI();
        const link = document.createElement('a');
        link.href = imgURI;
        link.download = 'gains-vs-depenses.png';
        link.click();
      });

      // Exemple : afficher ou cacher la comparaison
      let showingBoth = true;
      document.getElementById('btn-update')?.addEventListener('click', () => {
        if (showingBoth) {
          salesChart.updateSeries([{ name: 'Dépenses', data: salesThisYear }]);
          document.getElementById('btn-update').textContent = 'Montrer la comparaison';
        } else {
          salesChart.updateSeries([{ name: 'Dépenses', data: salesThisYear }, { name: 'Gains', data: salesLastYear }]);
          document.getElementById('btn-update').textContent = 'Montrer Dépenses';
        }
        showingBoth = !showingBoth;
      });

      // fonction publique pour mettre à jour les données
      window.updateMonthlySales = function(depensesArray, gainsArray = null) {
        if (!Array.isArray(depensesArray) || depensesArray.length !== 12) {
          console.warn('updateMonthlySales attend un tableau de 12 nombres pour les dépenses');
          return;
        }

        const series = [{ name: 'Dépenses', data: depensesArray }];
        if (Array.isArray(gainsArray) && gainsArray.length === 12) {
          series.push({ name: 'Gains', data: gainsArray });
        }

        salesChart.updateSeries(series);
      };

    })(); // IIFE
  }
});

async function loadSalesPurchaseChart(period = 'week') {
  const token = localStorage.getItem('pb_token');
  if (!token) return;

  const today = new Date();

  function formatDateFR(date) {
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
  }

  function formatK(value) {
    return (value / 1000).toFixed(0) + 'K';
  }

  let dates = [];

  if (period === 'week') {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() + 1);
    for (let i = 0; i < 6; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }
  } else {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
  }

  const categories = dates.map(d => formatDateFR(d));
  const ventesData = new Array(dates.length).fill(0);
  const depensesData = new Array(dates.length).fill(0);

  function sumRecord(record) {
    return Object.values(record).filter(v => typeof v === 'number').reduce((s, v) => s + v, 0);
  }

  const [ventesRes, depRes, achatsRes, dettesRes] = await Promise.all([
    fetch(`${PB_URL}/api/collections/ventes_points_vente/records?perPage=200`, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(`${PB_URL}/api/collections/depenses_journalier/records?perPage=200`, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(`${PB_URL}/api/collections/achats_journaliers/records?perPage=200`, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(`${PB_URL}/api/collections/dettes_journalier/records?perPage=200`, { headers: { Authorization: `Bearer ${token}` } })
  ]);

  const { items: ventes } = await ventesRes.json();
  const { items: depenses } = await depRes.json();
  const { items: achats } = await achatsRes.json();
  const { items: dettes } = await dettesRes.json();

  dates.forEach((date, i) => {
    const dateStr = date.toISOString().split('T')[0];

    ventes.forEach(r => { if (r.date?.startsWith(dateStr)) ventesData[i] += sumRecord(r); });
    [...depenses, ...achats, ...dettes].forEach(r => { if (r.date?.startsWith(dateStr)) depensesData[i] += sumRecord(r); });
  });

  salesPurchaseChartInstance.updateOptions({
    colors: ['#f7a085', '#E66239'],
    dataLabels: { enabled: false },
    series: [
      { name: 'Somme reçue', data: ventesData },
      { name: 'Dépenses', data: depensesData }
    ],
    xaxis: { categories },
    yaxis: { title: { text: 'FC (K)' }, labels: { formatter: val => formatK(val) } },
    tooltip: { y: { formatter: val => formatK(val) + "FC " } }
  });
}