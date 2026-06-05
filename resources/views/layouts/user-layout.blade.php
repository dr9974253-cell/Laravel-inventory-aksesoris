<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? 'Manajemen User' }} - Inventory Aksesoris</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f1f5f9;
            min-height: 100vh;
        }

        /* ===== NAVBAR ===== */
        .navbar {
            background: linear-gradient(135deg, #8b6914, #c9a84c);
            color: white;
            padding: 0 24px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: 600;
        }
        .navbar-brand-icon {
            width: 36px;
            height: 36px;
            background: rgba(255,255,255,0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        .navbar-right {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .navbar-user {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }
        .navbar-user-icon {
            width: 32px;
            height: 32px;
            background: rgba(255,255,255,0.25);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .btn-logout {
            background: rgba(255,255,255,0.15);
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 13px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-logout:hover {
            background: rgba(255,255,255,0.25);
        }

        /* ===== CONTAINER ===== */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
        }

        /* ===== PAGE HEADER ===== */
        .page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }
        .page-title {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
        }
        .page-subtitle {
            font-size: 14px;
            color: #64748b;
            margin-top: 4px;
        }

        /* ===== CARD ===== */
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .card-header {
            padding: 16px 20px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .card-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }
        .card-body {
            padding: 20px;
        }

        /* ===== BUTTONS ===== */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 9px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            text-decoration: none;
        }
        .btn-primary {
            background: linear-gradient(135deg, #8b6914, #c9a84c);
            color: white;
        }
        .btn-primary:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
        }
        .btn-secondary {
            background: #f1f5f9;
            color: #475569;
            border: 1px solid #e2e8f0;
        }
        .btn-secondary:hover {
            background: #e2e8f0;
        }
        .btn-warning {
            background: #fef3c7;
            color: #92400e;
        }
        .btn-warning:hover {
            background: #fde68a;
        }
        .btn-danger {
            background: #fee2e2;
            color: #991b1b;
        }
        .btn-danger:hover {
            background: #fecaca;
        }
        .btn-sm {
            padding: 6px 10px;
            font-size: 12px;
        }

        /* ===== TABLE ===== */
        .table-container {
            overflow-x: auto;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background: #f8fafc;
            color: #64748b;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 12px 16px;
            text-align: left;
            border-bottom: 2px solid #e2e8f0;
        }
        td {
            padding: 14px 16px;
            font-size: 14px;
            color: #334155;
            border-bottom: 1px solid #f1f5f9;
        }
        tr:hover td {
            background: #f8fafc;
        }
        tr:last-child td {
            border-bottom: none;
        }

        /* ===== BADGE ===== */
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        .badge-admin {
            background: #dbeafe;
            color: #1e40af;
        }
        .badge-viewer {
            background: #f1f5f9;
            color: #475569;
        }

        /* ===== FORM ===== */
        .form-group {
            margin-bottom: 18px;
        }
        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 6px;
        }
        .form-label span.required {
            color: #dc2626;
        }
        .form-input {
            width: 100%;
            padding: 10px 14px;
            font-size: 14px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #fafafa;
            color: #1e293b;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
            outline: none;
            border-color: #c9a84c;
            box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
            background: white;
        }
        .form-input.error {
            border-color: #dc2626;
        }
        .form-error {
            font-size: 12px;
            color: #dc2626;
            margin-top: 4px;
        }
        .form-hint {
            font-size: 12px;
            color: #94a3b8;
            margin-top: 4px;
        }

        /* ===== ALERT ===== */
        .alert {
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .alert-success {
            background: #f0fdf4;
            border: 1px solid #86efac;
            color: #166534;
        }
        .alert-error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #991b1b;
        }
        .alert-warning {
            background: #fffbeb;
            border: 1px solid #fde68a;
            color: #92400e;
        }

        /* ===== UTILITIES ===== */
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .mb-0 { margin-bottom: 0; }
        .mt-4 { margin-top: 16px; }

        /* ===== EMPTY STATE ===== */
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #94a3b8;
        }
        .empty-state-icon {
            font-size: 48px;
            margin-bottom: 12px;
        }
        .empty-state-text {
            font-size: 14px;
        }

        /* ===== ACTIONS ===== */
        .actions {
            display: flex;
            gap: 8px;
        }

        /* ===== MODAL ===== */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay.show {
            display: flex;
        }
        .modal {
            background: white;
            border-radius: 12px;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow: auto;
        }
        .modal-header {
            padding: 16px 20px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .modal-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #94a3b8;
            cursor: pointer;
            line-height: 1;
        }
        .modal-close:hover {
            color: #475569;
        }
        .modal-body {
            padding: 20px;
        }
        .modal-footer {
            padding: 16px 20px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        /* ===== FOOTER ===== */
        .footer {
            text-align: center;
            padding: 20px;
            color: #94a3b8;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="navbar-brand">
            <div class="navbar-brand-icon">💍</div>
            <span>Inventory Aksesoris</span>
        </div>
        <div class="navbar-right">
            <div class="navbar-user">
                <div class="navbar-user-icon">👤</div>
                <span>{{ auth()->user()->name }}</span>
                <span style="opacity: 0.7; font-size: 12px;">({{ ucfirst(auth()->user()->role) }})</span>
            </div>
            <form method="POST" action="{{ route('logout') }}" style="display: inline;">
                @csrf
                <button type="submit" class="btn-logout">Logout</button>
            </form>
        </div>
    </nav>

    <!-- CONTENT -->
    <div class="container">
        @yield('content')
    </div>

    <!-- FOOTER -->
    <div class="footer">
        &copy; {{ date('Y') }} Inventory Aksesoris - Manajemen User
    </div>

    <!-- DELETE CONFIRMATION MODAL -->
    <div class="modal-overlay" id="deleteModal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Konfirmasi Hapus</h3>
                <button type="button" class="modal-close" onclick="closeDeleteModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Apakah Anda yakin ingin menghapus user <strong id="deleteUserName"></strong>?</p>
                <p style="margin-top: 8px; color: #94a3b8; font-size: 13px;">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeDeleteModal()">Batal</button>
                <form id="deleteForm" method="POST" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Hapus</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        function confirmDelete(userId, userName) {
            document.getElementById('deleteUserName').textContent = userName;
            document.getElementById('deleteForm').action = '/users/' + userId;
            document.getElementById('deleteModal').classList.add('show');
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.remove('show');
        }

        // Close modal on outside click
        document.getElementById('deleteModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeDeleteModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeDeleteModal();
            }
        });
    </script>
</body>
</html>