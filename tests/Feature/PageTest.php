<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PageTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_pages_index(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.pages.index'))
            ->assertOk();
    }

    public function test_guest_cannot_view_pages_index(): void
    {
        $this->get(route('admin.pages.index'))->assertRedirect(route('login'));
    }

    public function test_page_can_be_created_with_generated_slug(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.pages.store'), [
                'title' => 'Our Story',
                'page_template' => 'default',
                'description' => '<p>Hello</p>',
                'status' => 'published',
                'seo_title' => 'Our Story',
                'seo_description' => 'About us',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.pages.index'));

        $this->assertDatabaseHas('pages', [
            'title' => 'Our Story',
            'slug' => 'our-story',
            'page_template' => 'default',
            'status' => 'published',
        ]);
    }

    public function test_page_title_is_validated_without_html_required(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->from(route('admin.pages.create'))
            ->post(route('admin.pages.store'), [
                'title' => '',
                'page_template' => 'home',
                'status' => 'draft',
            ])
            ->assertSessionHasErrors('title')
            ->assertRedirect(route('admin.pages.create'));
    }

    public function test_duplicate_titles_get_unique_slugs(): void
    {
        $admin = User::factory()->admin()->create();

        Page::factory()->create(['title' => 'Community', 'slug' => 'community']);

        $this->actingAs($admin)
            ->post(route('admin.pages.store'), [
                'title' => 'Community',
                'page_template' => 'default',
                'status' => 'draft',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('pages', ['slug' => 'community-2']);
    }

    public function test_page_can_be_updated_and_soft_deleted(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create();
        $page = Page::factory()->create(['title' => 'Events']);

        $this->actingAs($admin)
            ->put(route('admin.pages.update', $page), [
                'title' => 'Upcoming Events',
                'page_template' => 'home',
                'status' => 'published',
                'image' => UploadedFile::fake()->image('cover.jpg'),
            ])
            ->assertSessionHasNoErrors();

        $page->refresh();
        $this->assertSame('Upcoming Events', $page->title);
        $this->assertSame('events', $page->slug);
        $this->assertNotNull($page->image);

        $this->actingAs($admin)
            ->delete(route('admin.pages.destroy', $page))
            ->assertRedirect(route('admin.pages.index'));

        $this->assertSoftDeleted($page);
    }

    public function test_published_page_can_be_viewed_by_slug(): void
    {
        Page::factory()->published()->create([
            'title' => 'Home',
            'slug' => 'home',
            'page_template' => 'home',
        ]);

        Page::factory()->published()->create([
            'title' => 'About',
            'slug' => 'about',
            'page_template' => 'default',
            'description' => '<p>About us</p>',
        ]);

        $this->get('/home')->assertOk();
        $this->get('/about')->assertOk();
        $this->get('/')->assertOk();
    }

    public function test_draft_page_is_hidden_from_guests(): void
    {
        Page::factory()->create([
            'title' => 'Secret',
            'slug' => 'secret',
            'page_template' => 'default',
            'status' => Page::STATUS_DRAFT,
        ]);

        $this->get('/secret')->assertNotFound();
    }
}
