<?php declare(strict_types=1);

use NavplanTest\Search\Mocks\DummySearchByTextQuery1;
use PHPUnit\Framework\TestCase;


class SearchByTextQueryTest extends TestCase {
    public function test__construct() {
        $query = DummySearchByTextQuery1::create();
        $this->assertNotNull($query);
    }
}
