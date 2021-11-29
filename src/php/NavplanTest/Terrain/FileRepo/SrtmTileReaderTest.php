<?php declare(strict_types=1);

namespace NavplanTest\Terrain\FileRepo;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Terrain\FileService\SrtmTileReader;
use NavplanTest\System\Mock\MockFile;
use PHPUnit\Framework\TestCase;


class SrtmTileReaderTest extends TestCase {
    private MockFile $file;
    private SrtmTileReader $reader;


    protected function setUp(): void {
        $this->file = new MockFile();
        $this->reader = new SrtmTileReader($this->file);
    }


    public function test__construct() {
        $this->assertNotNull($this->reader);
    }


    public function test_readElevationFromFile() {
        $pos = new Position2d(7.0, 47.0);
        $this->file->fseekResult = 0;
        $this->file->freadResult = pack("n", 123);

        $result = $this->reader->readElevationFromFile($pos);

        $this->assertEquals(123, $result);
    }


    public function test_readElevationFromFile_expect_zero_if_no_file() {
        $pos = new Position2d(7.0, 47.0);
        $reader = new SrtmTileReader(NULL);

        $result = $reader->readElevationFromFile($pos);

        $this->assertEquals(0.0, $result);
    }


    public function test_getTerrainFilePath() {
        $pos1 = new Position2d(7.7, 47.7);
        $pos2 = new Position2d(-130.4, -5.4);

        $path1 = SrtmTileReader::getTerrainFilePath($pos1);
        $path2 = SrtmTileReader::getTerrainFilePath($pos2);

        $this->assertRegExp('/N47E007/', $path1);
        $this->assertRegExp('/S06W131/', $path2);
    }
}
