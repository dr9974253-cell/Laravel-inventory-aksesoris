<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Stok Barang</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 10px;
            color: #1e293b;
            padding: 15px 20px;
            line-height: 1.4;
        }

        /* ===== HEADER ===== */
        .header {
            display: table;
            width: 100%;
            margin-bottom: 15px;
            border-bottom: 2px solid #1e293b;
            padding-bottom: 12px;
        }
        .header-left {
            display: table-cell;
            width: 50%;
            vertical-align: top;
        }
        .header-right {
            display: table-cell;
            width: 50%;
            text-align: right;
            vertical-align: top;
        }
        .company-name {
            font-size: 16px;
            font-weight: bold;
            color: #1e293b;
        }
        .company-tagline {
            font-size: 9px;
            color: #64748b;
        }
        .report-title {
            font-size: 14px;
            font-weight: bold;
            color: #1e293b;
        }
        .report-date {
            font-size: 9px;
            color: #64748b;
        }

        /* ===== INFO BOX ===== */
        .info-container {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }
        .info-box {
            display: table-cell;
            width: 50%;
            padding-right: 10px;
        }
        .info-box:last-child {
            padding-right: 0;
        }
        .info-inner {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 8px 10px;
        }
        .info-row {
            display: flex;
            margin-bottom: 3px;
            font-size: 9px;
        }
        .info-row:last-child {
            margin-bottom: 0;
        }
        .info-label {
            width: 100px;
            color: #64748b;
        }
        .info-label::after {
            content: ":";
            margin-right: 5px;
        }
        .info-value {
            color: #1e293b;
            font-weight: 600;
        }

        /* ===== SUMMARY CARDS ===== */
        .summary-container {
            display: table;
            width: 100%;
            margin-bottom: 15px;
            border-spacing: 8px;
        }
        .summary-card {
            display: table-cell;
            width: 25%;
            text-align: center;
            border-radius: 6px;
            padding: 10px 5px;
        }
        .summary-card.green {
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            border: 1px solid #86efac;
        }
        .summary-card.red {
            background: linear-gradient(135deg, #fee2e2, #fecaca);
            border: 1px solid #fca5a5;
        }
        .summary-card.blue {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            border: 1px solid #93c5fd;
        }
        .summary-card.gray {
            background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
            border: 1px solid #cbd5e1;
        }
        .summary-label {
            font-size: 8px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .summary-card.green .summary-label { color: #166534; }
        .summary-card.red .summary-label { color: #991b1b; }
        .summary-card.blue .summary-label { color: #1e40af; }
        .summary-card.gray .summary-label { color: #475569; }
        .summary-value {
            font-size: 16px;
            font-weight: bold;
        }
        .summary-card.green .summary-value { color: #15803d; }
        .summary-card.red .summary-value { color: #dc2626; }
        .summary-card.blue .summary-value { color: #2563eb; }
        .summary-card.gray .summary-value { color: #334155; }

        /* ===== TABLE ===== */
        .table-container {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        thead tr {
            background: #1e293b;
            color: white;
        }
        th {
            padding: 8px 6px;
            text-align: left;
            font-size: 9px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            border: 1px solid #334155;
        }
        th.center {
            text-align: center;
        }
        td {
            padding: 7px 6px;
            border: 1px solid #e2e8f0;
            font-size: 9px;
            vertical-align: top;
        }
        td.center {
            text-align: center;
        }
        tbody tr:nth-child(odd) {
            background: white;
        }
        tbody tr:nth-child(even) {
            background: #f8fafc;
        }

        /* ===== BADGES ===== */
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        .badge.masuk {
            background: #16a34a;
            color: white;
        }
        .badge.keluar {
            background: #dc2626;
            color: white;
        }

        /* ===== FOOTER ===== */
        .footer {
            margin-top: 25px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            display: table;
            width: 100%;
            font-size: 8px;
            color: #94a3b8;
        }
        .footer-left {
            display: table-cell;
            width: 60%;
        }
        .footer-right {
            display: table-cell;
            width: 40%;
            text-align: right;
        }

        /* ===== NO DATA ===== */
        .no-data {
            text-align: center;
            padding: 30px;
            color: #94a3b8;
            font-style: italic;
        }
    </style>
</head>
<body>
    <!-- HEADER -->
    <div class="header">
        <div class="header-left">
            <div class="company-name">📦 INVENTORY AKSESORIS</div>
            <div class="company-tagline">Sistem Informasi Persediaan Barang</div>
        </div>
        <div class="header-right">
            <div class="report-title">LAPORAN STOK BARANG</div>
            <div class="report-date">Dicetak: {{ $tanggalCetak }}</div>
        </div>
    </div>

    <!-- INFO BOX -->
    <div class="info-container">
        <div class="info-box">
            <div class="info-inner">
                <div class="info-row">
                    <span class="info-label">Periode</span>
                    <span class="info-value">{{ date('d/m/Y', strtotime(str_replace('/', '-', $tanggalMulai))) }} - {{ date('d/m/Y', strtotime(str_replace('/', '-', $tanggalSelesai))) }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Jenis Filter</span>
                    <span class="info-value">{{ ucfirst($jenis) }}</span>
                </div>
            </div>
        </div>
        <div class="info-box">
            <div class="info-inner">
                <div class="info-row">
                    <span class="info-label">Total Masuk</span>
                    <span class="info-value">{{ number_format($totalMasuk) }} unit</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Total Keluar</span>
                    <span class="info-value">{{ number_format($totalKeluar) }} unit</span>
                </div>
            </div>
        </div>
    </div>

    <!-- SUMMARY CARDS -->
    <div class="summary-container">
        <div class="summary-card green">
            <div class="summary-label">Total Masuk</div>
            <div class="summary-value">{{ number_format($totalMasuk) }}</div>
        </div>
        <div class="summary-card red">
            <div class="summary-label">Total Keluar</div>
            <div class="summary-value">{{ number_format($totalKeluar) }}</div>
        </div>
        <div class="summary-card blue">
            <div class="summary-label">Saldo</div>
            <div class="summary-value">{{ number_format($saldo) }}</div>
        </div>
        <div class="summary-card gray">
            <div class="summary-label">Transaksi</div>
            <div class="summary-value">{{ $transaksi->count() }}</div>
        </div>
    </div>

    <!-- TABLE -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 10%;">Tanggal</th>
                    <th style="width: 10%;">Jenis</th>
                    <th style="width: 12%;">Kode Barang</th>
                    <th style="width: 25%;">Nama Barang</th>
                    <th style="width: 8%;" class="center">Jumlah</th>
                    <th style="width: 12%;">No Referensi</th>
                    <th style="width: 18%;">Keterangan</th>
                </tr>
            </thead>
            <tbody>
                @if($transaksi->isEmpty())
                    <tr>
                        <td colspan="8" class="no-data">Tidak ada data transaksi dalam periode ini.</td>
                    </tr>
                @else
                    @foreach($transaksi as $index => $item)
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td>{{ $item['tanggal'] }}</td>
                            <td>
                                <span class="badge {{ $item['jenis'] }}">
                                    {{ strtoupper($item['jenis']) }}
                                </span>
                            </td>
                            <td>{{ $item['kode_barang'] }}</td>
                            <td>{{ $item['nama_barang'] }}</td>
                            <td class="center">{{ number_format($item['jumlah']) }}</td>
                            <td>{{ $item['no_referensi'] ?: '-' }}</td>
                            <td>{{ $item['keterangan'] ?: '-' }}</td>
                        </tr>
                    @endforeach
                @endif
            </tbody>
        </table>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        <div class="footer-left">
            Dokumen ini dicetak secara otomatis oleh sistem Inventory Aksesoris
        </div>
        <div class="footer-right">
            Halaman 1 dari 1
        </div>
    </div>
</body>
</html>