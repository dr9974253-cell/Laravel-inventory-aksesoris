<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'kode_supplier',
        'nama_supplier',
        'telepon',
        'email',
        'alamat',
        'keterangan',
    ];

    /**
     * Get the stock ins for the supplier.
     */
    public function stockIns(): HasMany
    {
        return $this->hasMany(StockIn::class);
    }
}
