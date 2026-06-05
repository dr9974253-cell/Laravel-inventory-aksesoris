@extends('layouts.user-layout')

@section('content')
<!-- PAGE HEADER -->
<div class="page-header">
    <div>
        <h1 class="page-title">Edit User</h1>
        <p class="page-subtitle">Perbarui data user {{ $user->name }}</p>
    </div>
    <a href="{{ route('users.index') }}" class="btn btn-secondary">
        &larr; Kembali
    </a>
</div>

<!-- ALERTS -->
@if($errors->any())
    <div class="alert alert-error">
        <strong>Terjadi kesalahan:</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<!-- CARD -->
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Form Edit User</h3>
    </div>
    <div class="card-body">
        <form method="POST" action="{{ route('users.update', $user->id) }}">
            @csrf
            @method('PUT')

            <!-- Nama Lengkap -->
            <div class="form-group">
                <label class="form-label" for="name">
                    Nama Lengkap <span class="required">*</span>
                </label>
                <input type="text" id="name" name="name" class="form-input @error('name') error @enderror"
                       value="{{ old('name', $user->name) }}" placeholder="Masukkan nama lengkap" required autofocus>
                @error('name')
                    <div class="form-error">{{ $message }}</div>
                @enderror
            </div>

            <!-- Email -->
            <div class="form-group">
                <label class="form-label" for="email">
                    Email <span class="required">*</span>
                </label>
                <input type="email" id="email" name="email" class="form-input @error('email') error @enderror"
                       value="{{ old('email', $user->email) }}" placeholder="nama@email.com" required>
                @error('email')
                    <div class="form-error">{{ $message }}</div>
                @enderror
            </div>

            <!-- Password (Optional) -->
            <div class="form-group">
                <label class="form-label" for="password">
                    Password Baru
                </label>
                <input type="password" id="password" name="password" class="form-input @error('password') error @enderror"
                       placeholder="Kosongkan jika tidak ingin mengubah password" minlength="6">
                @error('password')
                    <div class="form-error">{{ $message }}</div>
                @enderror
                <div class="form-hint">Isi hanya jika ingin mengubah password. Minimal 6 karakter.</div>
            </div>

            <!-- Konfirmasi Password -->
            <div class="form-group">
                <label class="form-label" for="password_confirmation">
                    Konfirmasi Password Baru
                </label>
                <input type="password" id="password_confirmation" name="password_confirmation" class="form-input"
                       placeholder="Ulangi password baru" minlength="6">
            </div>

            <!-- Role -->
            <div class="form-group">
                <label class="form-label" for="role">
                    Role <span class="required">*</span>
                </label>
                <select id="role" name="role" class="form-input @error('role') error @enderror" required>
                    <option value="admin" {{ old('role', $user->role) === 'admin' ? 'selected' : '' }}>Admin</option>
                    <option value="viewer" {{ old('role', $user->role) === 'viewer' ? 'selected' : '' }}>Viewer</option>
                </select>
                @error('role')
                    <div class="form-error">{{ $message }}</div>
                @enderror
                <div class="form-hint">
                    <strong>Admin:</strong> Akses penuh ke semua fitur<br>
                    <strong>Viewer:</strong> Hanya bisa melihat data
                </div>
            </div>

            <!-- BUTTONS -->
            <div style="display: flex; gap: 10px; margin-top: 24px;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">
                    💾 Simpan Perubahan
                </button>
                <a href="{{ route('users.index') }}" class="btn btn-secondary" style="flex: 1; text-align: center;">
                    Batal
                </a>
            </div>
        </form>
    </div>
</div>
@endsection