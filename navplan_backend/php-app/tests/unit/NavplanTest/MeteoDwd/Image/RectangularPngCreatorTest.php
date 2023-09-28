<?php declare(strict_types=1);

namespace NavplanTest\MeteoDwd\Image;

use InvalidArgumentException;
use Navplan\MeteoDwd\Image\RectangularPngCreator;
use PHPUnit\Framework\TestCase;


class RectangularPngCreatorTest extends TestCase {
    public function test_create() {
        $numcols = 10;
        $numrows = 15;
        $values = array_fill(0, $numcols * $numrows, 50);

        $im = RectangularPngCreator::create($numcols, $numrows, 0, 100, $values);

        $this->assertNotNull($im);
        $this->assertEquals(15, $im->getImageHeight());
        $this->assertEquals(10, $im->getImageWidth());
    }


    public function test_too_few_values() {
        $numcols = 10;
        $numrows = 15;
        $values = array_fill(0, $numcols * $numrows - 1, 50);

        $this->expectException(InvalidArgumentException::class);

        RectangularPngCreator::create($numcols, $numrows, 0, 100, $values);
    }
}
