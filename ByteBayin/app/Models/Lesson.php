<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lesson extends Model
{
    use HasFactory;

    protected $primaryKey = 'lessonId';
    public $incrementing = true;
    
    protected $fillable = [
        'title',
        'content'
    ];

    public function exercise(): HasOne
    {
        return $this->hasOne(Exercise::class, 'lessons_id', 'lessonId');
    }

    public function getContent(): string
    {
        return $this->content;
    }
}