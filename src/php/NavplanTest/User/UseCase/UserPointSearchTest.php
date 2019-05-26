<?php declare(strict_types=1);

namespace NavplanTest\User\UseCase;

require_once __DIR__ . "/../../../config_test.php"; // TODO => inject config

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\User\UseCase\UserPointSearch;
use Navplan\User\UserHelper;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\UserPointRepoMock;
use PHPUnit\Framework\TestCase;


class UserPointSearchTest extends TestCase {
    private $repoMock;
    private $upSearch;
    private $expectedResult;
    private $validToken;


    private function getUserPointSearch(): UserPointSearch {
        return $this->upSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $this->repoMock = new UserPointRepoMock();
        $this->repoMock->pushMockResult($this->expectedResult);
        $this->upSearch = new UserPointSearch($this->repoMock);
        $this->validToken = UserHelper::createToken("asdf@asdf.com", FALSE);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->upSearch);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->getUserPointSearch()->searchByExtent($extent, $this->validToken);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByExtent_invalid_token() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->getUserPointSearch()->searchByExtent($extent, "XXXX");
        $this->assertEquals(0, count($result));
    }


    public function test_searchByText() {
        $result = $this->getUserPointSearch()->searchByText("FRI", 10, $this->validToken);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByText_invalid_token() {
        $result = $this->getUserPointSearch()->searchByText("FRI", 10, "XXXX");
        $this->assertEquals(0, count($result));
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->getUserPointSearch()->searchByPosition($pos, 0.5, 10, $this->validToken);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition_invalid_token() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->getUserPointSearch()->searchByPosition($pos, 0.5, 10, "XXXX");
        $this->assertEquals(0, count($result));
    }
}
