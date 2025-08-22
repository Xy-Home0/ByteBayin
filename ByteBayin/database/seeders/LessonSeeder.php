<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    public function run()
    {
        $lessons = [
            [
                'title' => 'Introduction to Baybayin',
                'content' => 'Baybayin is an ancient script used in the Philippines before Spanish colonization...'
            ],
            [
                'title' => 'Basic Baybayin Characters',
                'content' => 'Baybayin consists of 17 basic characters: 3 vowels and 14 consonants...'
            ],
            [
                'title' => 'Writing Baybayin Words',
                'content' => 'To write words in Baybayin, you combine the consonant and vowel characters...'
            ]
        ];

        foreach ($lessons as $lesson) {
            Lesson::create($lesson);
        }
    }
}