<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    /**
     * Display a listing of the lessons.
     */
    public function index(): Response
    {
        $lessons = Lesson::all();
        
        return Inertia::render('Admin/Lessons/Index', [
            'lessons' => $lessons
        ]);
    }

    /**
     * Show the form for creating a new lesson.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Lessons/Create');
    }

    /**
     * Store a newly created lesson in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Lesson::create($validated);

        return redirect()->route('admin.lessons.index')->with('success', 'Lesson created successfully.');
    }

    /**
     * Display the specified lesson.
     */
    public function show(Lesson $lesson)
    {
        //
    }

    /**
     * Show the form for editing the specified lesson.
     */
    public function edit(Lesson $lesson): Response
    {
        return Inertia::render('Admin/Lessons/Edit', [
            'lesson' => $lesson
        ]);
    }

    /**
     * Update the specified lesson in storage.
     */
    public function update(Request $request, Lesson $lesson)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $lesson->update($validated);

        return redirect()->route('admin.lessons.index')->with('success', 'Lesson updated successfully.');
    }

    /**
     * Remove the specified lesson from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return redirect()->route('admin.lessons.index')->with('success', 'Lesson deleted successfully.');
    }
}