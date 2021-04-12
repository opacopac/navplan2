<?php declare(strict_types=1);

namespace NavplanTest\Terrain\FileRepo;

use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Position3d;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use NavplanTest\System\Mock\MockFile;
use NavplanTest\System\Mock\MockFileService;
use PHPUnit\Framework\TestCase;


class FileTerrainRepoTest extends TestCase {
    private FileTerrainRepo $repo;


    private function assertEqualPosList(array $pos2dList, array $pos3dList, float $alt) {
        $this->assertSameSize($pos2dList, $pos3dList);
        for ($i = 0; $i < count($pos2dList); $i++) {
            $this->assertEqualPos($pos2dList[$i], $pos3dList[$i], $alt);
        }
    }


    private function assertEqualPos(Position2d $position2d, Position3d $position3d, float $alt) {
        $this->assertEquals($position2d->longitude, $position3d->longitude);
        $this->assertEquals($position2d->latitude, $position3d->latitude);
        $this->assertEquals($alt, $position3d->altitude->value);
        $this->assertEquals(AltitudeUnit::M, $position3d->altitude->unit);
        $this->assertEquals(AltitudeReference::MSL, $position3d->altitude->reference);
    }


    protected function setUp(): void {
        $file = new MockFile();
        $file->fseekResult = 0;
        $file->freadResult = pack("n", 123);
        $file->fcloseResult = TRUE;
        $fileService = new MockFileService();
        $fileService->fileExistsResult = true;
        $fileService->fopenResult = $file;
        $this->repo = new FileTerrainRepo($fileService);
    }


    public function test_getElevation() {
        $pos2dList = [
            new Position2d(7.0, 47.0),
            new Position2d(7.5, 47.5),
            new Position2d(8.0, 48.0),
        ];

        $pos3dList = $this->repo->readElevation($pos2dList);

        $this->assertEqualPosList($pos2dList, $pos3dList, 123);
    }


    public function test_getElevation_single_pos() {
        $pos2dList = [ new Position2d(7.0, 47.0) ];

        $pos3dList = $this->repo->readElevation($pos2dList);

        $this->assertEqualPosList($pos2dList, $pos3dList, 123);
    }


    public function test_getElevation_no_pos() {
        $pos2dList = [];

        $pos3dList = $this->repo->readElevation($pos2dList);

        $this->assertEqualPosList($pos2dList, $pos3dList, 123);
    }


    public function test_getElevation_many_random_positions() {
        $pos2dList = [];
        for ($i = 0; $i < 1000; $i++) {
            $pos2dList[] = new Position2d(rand(-179, 179), rand(-89, 89));
        }

        $pos3dList = $this->repo->readElevation($pos2dList);

        $this->assertEqualPosList($pos2dList, $pos3dList, 123);
    }
}
