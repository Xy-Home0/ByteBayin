<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exercise extends Model
{
    use HasFactory;

    protected $primaryKey = 'exerciseId';
    public $incrementing = true;
    
    protected $fillable = [
        'lessons_id',
        'questions',
        'answers'
    ];

    protected $casts = [
        'questions' => 'array',
        'answers' => 'array'
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class, 'lessons_id');
    }

    public function validateAnswer(string $answer): bool
    {
        return in_array($answer, $this->answers);
    }
}