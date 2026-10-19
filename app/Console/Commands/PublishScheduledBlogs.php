<?php

namespace App\Console\Commands;

use App\Services\BlogService;
use Illuminate\Console\Command;

class PublishScheduledBlogs extends Command
{
    protected $signature = 'blogs:publish-scheduled';

    protected $description = 'Publish blog posts whose schedule time has arrived';

    public function handle(BlogService $blogs): int
    {
        $count = $blogs->publishDueScheduled();

        if ($count === 0) {
            $this->info('No scheduled blogs due.');
        } else {
            $this->info("Published {$count} scheduled blog(s).");
        }

        return self::SUCCESS;
    }
}
