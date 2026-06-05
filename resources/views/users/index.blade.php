@extends('layouts.user-layout')

@section('content')
<!-- PAGE HEADER -->
<div class="page-header">
    <div>
        <h1 class="page-title">Manajemen User</h1>
        <p class="page-subtitle">Kelola akun pengguna sistem inventory</p>
    </div>
    <a href="{{ route('users.create') }}" class="btn btn-primary">
        <span>+</span> Tambah User
    </a>
</div>

<!-- ALERTS -->
@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

@if(session('error'))
    <div class="alert alert-error">{{ session('error') }}</div>
@endif

<!-- CARD -->
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Daftar User</h3>
        <span style="color: #94a3b8; font-size: 13px;">{{ $users->count() }} user</span>
    </div>
    <div class="card-body" style="padding: 0;">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th style="width: 5%;">No</th>
                        <th style="width: 30%;">Nama</th>
                        <th style="width: 30%;">Email</th>
                        <th style="width: 15%;">Role</th>
                        <th style="width: 20%;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @if($users->isEmpty())
                        <tr>
                            <td colspan="5">
                                <div class="empty-state">
                                    <div class="empty-state-icon">👤</div>
                                    <p class="empty-state-text">Belum ada data user</p>
                                </div>
                            </td>
                        </tr>
                    @else
                        @foreach($users as $index => $user)
                            <tr>
                                <td class="text-center">{{ $index + 1 }}</td>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="width: 32px; height: 32px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                                            👤
                                        </div>
                                        <div>
                                            <div style="font-weight: 500;">{{ $user->name }}</div>
                                            @if($user->id === auth()->id())
                                                <div style="font-size: 11px; color: #c9a84c;">(Anda)</div>
                                            @endif
                                        </div>
                                    </div>
                                </td>
                                <td>{{ $user->email }}</td>
                                <td>
                                    <span class="badge {{ $user->role === 'admin' ? 'badge-admin' : 'badge-viewer' }}">
                                        {{ ucfirst($user->role) }}
                                    </span>
                                </td>
                                <td>
                                    <div class="actions">
                                        <a href="{{ route('users.edit', $user->id) }}" class="btn btn-warning btn-sm">
                                            Edit
                                        </a>
                                        @if($user->id !== auth()->id())
                                            <button type="button" class="btn btn-danger btn-sm" onclick="confirmDelete({{ $user->id }}, '{{ addslashes($user->name) }}')">
                                                Hapus
                                            </button>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection