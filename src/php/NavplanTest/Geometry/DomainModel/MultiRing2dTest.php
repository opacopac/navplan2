<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DomainModel;

use Navplan\Geometry\DomainModel\MultiRing2d;
use PHPUnit\Framework\TestCase;


class MultiRing2dTest extends TestCase
{

    public function test__construct()
    {
        $poly = new MultiRing2d([]);
        $this->assertNotNull($poly);
        $this->assertNotNull($poly->ring2dList);
        $this->assertEquals(0, count($poly->ring2dList));
    }


    public function test_createFromArray()
    {
        $ringArray1 = [[7.1, 47.1], [7.9, 47.9], [8.1, 48.1], [7.1, 47.1]];
        $ringArray2 = [[4.1, 44.1], [4.9, 44.9], [3.1, 43.1], [4.1, 44.1]];
        $multiring = MultiRing2d::createFromArray([$ringArray1, $ringArray2]);

        $this->assertEquals($multiring->toArray(), [$ringArray1, $ringArray2]);
    }
}
