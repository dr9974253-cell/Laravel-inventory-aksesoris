<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Inventory Aksesoris</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .card {
            background: #ffffff;
            border-radius: 16px;
            padding: 2.5rem 2rem;
            width: 100%;
            max-width: 380px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .logo-wrap {
            text-align: center;
            margin-bottom: 2rem;
        }
        .logo-wrap svg {
            display: block;
            margin: 0 auto 1rem;
        }
        .logo-wrap h1 {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 4px;
        }
        .logo-wrap p {
            font-size: 13px;
            color: #888;
        }
        .subtitle {
            text-align: center;
            font-size: 14px;
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        }
        label {
            display: block;
            font-size: 13px;
            color: #555;
            margin-bottom: 6px;
        }
        .input-wrap {
            position: relative;
            margin-bottom: 1rem;
        }
        .input-wrap svg {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #aaa;
        }
        input[type="email"],
        input[type="password"],
        input[type="text"] {
            width: 100%;
            padding: 10px 12px 10px 36px;
            font-size: 14px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: #fafafa;
            color: #1a1a1a;
            outline: none;
            transition: border-color 0.2s;
        }
        input:focus {
            border-color: #c9a84c;
            background: #fff;
        }
        .btn-reset {
            width: 100%;
            padding: 11px;
            margin-top: 0.5rem;
            background: linear-gradient(135deg, #8b6914, #c9a84c, #f5d97e, #c9a84c, #8b6914);
            background-size: 200% 200%;
            color: #3d2e00;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            letter-spacing: 0.5px;
        }
        .btn-reset:hover {
            filter: brightness(1.05);
        }
        .error-msg {
            background: #fff0f0;
            border: 1px solid #fcc;
            color: #c00;
            border-radius: 8px;
            padding: 10px 12px;
            font-size: 13px;
            margin-bottom: 1rem;
        }
        .success-msg {
            background: #f0fff0;
            border: 1px solid #8c8;
            color: #060;
            border-radius: 8px;
            padding: 10px 12px;
            font-size: 13px;
            margin-bottom: 1rem;
        }
        .back-link {
            display: block;
            text-align: center;
            margin-top: 1.25rem;
            font-size: 13px;
            color: #888;
        }
        .back-link a {
            color: #b8960c;
            text-decoration: none;
            font-weight: 500;
        }
        .back-link a:hover {
            text-decoration: underline;
        }
        .footer-text {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 1.5rem;
        }
    </style>
</head>
<body>
<div class="card">

    <div class="logo-wrap">
        <svg viewBox="0 0 72 72" width="72" height="72" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#c9a84c"/>
                    <stop offset="30%" style="stop-color:#f5d97e"/>
                    <stop offset="60%" style="stop-color:#c9a84c"/>
                    <stop offset="100%" style="stop-color:#8b6914"/>
                </linearGradient>
                <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#a8d8f0"/>
                    <stop offset="40%" style="stop-color:#5bb8e8"/>
                    <stop offset="100%" style="stop-color:#1a6fa8"/>
                </linearGradient>
            </defs>
            <ellipse cx="36" cy="52" rx="22" ry="8" fill="url(#goldRing)"/>
            <ellipse cx="36" cy="52" rx="14" ry="4.5" fill="#7a5c10" opacity="0.5"/>
            <path d="M14 52 Q13 36 24 28" stroke="url(#goldRing)" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M58 52 Q59 36 48 28" stroke="url(#goldRing)" stroke-width="5" fill="none" stroke-linecap="round"/>
            <ellipse cx="36" cy="28" rx="16" ry="6" fill="#b8941e"/>
            <line x1="24" y1="28" x2="21" y2="18" stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="48" y1="28" x2="51" y2="18" stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="30" y1="23" x2="28" y2="13" stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="42" y1="23" x2="44" y2="13" stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="36" cy="20" rx="13" ry="10" fill="url(#gemGrad)"/>
            <line x1="36" y1="11" x2="36" y2="29" stroke="#ffffff" stroke-width="0.6" opacity="0.4"/>
            <line x1="24" y1="18" x2="48" y2="22" stroke="#ffffff" stroke-width="0.6" opacity="0.3"/>
            <ellipse cx="31" cy="16" rx="5" ry="3.5" fill="white" opacity="0.35" transform="rotate(-20 31 16)"/>
            <line x1="55" y1="10" x2="55" y2="16" stroke="#f5d97e" stroke-width="1.2" stroke-linecap="round"/>
            <line x1="52" y1="13" x2="58" y2="13" stroke="#f5d97e" stroke-width="1.2" stroke-linecap="round"/>
            <line x1="14" y1="16" x2="14" y2="20" stroke="#f5d97e" stroke-width="1" stroke-linecap="round"/>
            <line x1="12" y1="18" x2="16" y2="18" stroke="#f5d97e" stroke-width="1" stroke-linecap="round"/>
        </svg>
        <h1>Reset Password</h1>
        <p>Inventory Aksesoris</p>
    </div>

    <p class="subtitle">Masukkan email dan password baru untuk akun Anda.</p>

    @if ($errors->any())
        <div class="error-msg">{{ $errors->first() }}</div>
    @endif

    @if (session('success'))
        <div class="success-msg">{{ session('success') }}</div>
    @endif

    <form method="POST" action="{{ route('password.reset.custom') }}" id="reset-form">
        @csrf
        <input type="hidden" name="_token" value="{{ csrf_token() }}">

        <div>
            <label for="email">Email</label>
            <div class="input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input type="email" id="email" name="email"
                       value="{{ old('email') }}"
                       placeholder="admin@inventory.com" required>
            </div>
        </div>

        <div>
            <label for="password">Password Baru</label>
            <div class="input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input type="password" id="password" name="password"
                       placeholder="Minimal 6 karakter" required minlength="6">
            </div>
        </div>

        <div>
            <label for="password_confirmation">Konfirmasi Password Baru</label>
            <div class="input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input type="password" id="password_confirmation" name="password_confirmation"
                       placeholder="Ulangi password baru" required minlength="6">
            </div>
        </div>

        <button type="submit" class="btn-reset">RESET PASSWORD</button>
    </form>

    <p class="back-link">
        <a href="{{ route('login') }}">&larr; Kembali ke Login</a>
    </p>

    <p class="footer-text">&copy; {{ date('Y') }} Inventory Aksesoris</p>
</div>
</body>
</html>