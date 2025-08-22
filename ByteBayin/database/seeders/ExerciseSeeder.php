<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    public function run()
    {
        $lessons = Lesson::all();

        if ($lessons->isEmpty()) {
            $this->command->info('No lessons found. Please run LessonSeeder first.');
            return;
        }

        foreach ($lessons as $lesson) {
            Exercise::create([
                'lessons_id' => $lesson->lessonId, // Match the column name in your database
                'questions' => json_encode([
                    'What is the first letter of Baybayin?',
                    'How many vowels are in Baybayin?',
                    'What is the symbol for "ka" in Baybayin?'
                ]),
                'answers' => json_encode([
                    'a',
                    '3',
                    'ᜃ'
                ])
            ]);
        }
    }
}