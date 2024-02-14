<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trie extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'user_name',
        'deadline_id',
        'deadline_date',
        'course_name'
    ];
}
