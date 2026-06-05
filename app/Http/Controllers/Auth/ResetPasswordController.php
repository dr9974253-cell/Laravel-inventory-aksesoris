<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    /**
     * Display the forgot password form.
     */
    public function showForm()
    {
        return view('auth.forgot-password');
    }

    /**
     * Handle the password reset request.
     */
    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ], [
            'password.required' => 'Password baru wajib diisi.',
            'password.min' => 'Password minimal 6 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
        ]);

        // Check if email exists in database
        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return back()
                ->withInput(['email' => $validated['email']])
                ->withErrors(['email' => 'Email tidak terdaftar dalam sistem.']);
        }

        // Update password
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        // Redirect to login with success message
        return redirect()
            ->route('login')
            ->with('success', 'Password berhasil diubah. Silakan login dengan password baru.');
    }
}