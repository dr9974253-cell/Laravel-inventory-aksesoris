<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'kode_barang',
        'nama_barang',
        'category_id',
        'unit_id',
        'stok',
        'stok_minimum',
        'harga_beli',
        'harga_jual',
        'keterangan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'harga_beli' => 'decimal:2',
        'harga_jual' => 'decimal:2',
        'stok' => 'integer',
        'stok_minimum' => 'integer',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the unit that owns the product.
     */
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    /**
     * Get the stock ins for the product.
     */
    public function stockIns(): HasMany
    {
        return $this->hasMany(StockIn::class);
    }

    /**
     * Get the stock outs for the product.
     */
    public function stockOuts(): HasMany
    {
        return $this->hasMany(StockOut::class);
    }

    /**
     * Check if stock is below minimum threshold.
     */
    public function isLowStock(): bool
    {
        return $this->stok < $this->stok_minimum;
    }
}
