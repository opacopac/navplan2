<?php declare(strict_types=1);

namespace NavplanTest\User\UseCase;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\User\UseCase\SearchUserPoint\SearchUserPointUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use PHPUnit\Framework\TestCase;


class SearchUserPointUcTest extends TestCase {
    private SearchUserPointUc $searchUserPointUc;
    private array $expectedResult;
    private string $validToken;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->expectedResult = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $config->userPointRepo->pushMockResult($this->expectedResult);
        $this->searchUserPointUc = $config->getSearchUserPointUc();
        $this->validToken = $config->getTokenService()->createToken("asdf@asdf.com", FALSE);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchUserPointUc);
    }


    public function test_searchByExtent() {
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->searchUserPointUc->searchByExtent($extent, $this->validToken);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByExtent_invalid_token() {
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->searchUserPointUc->searchByExtent($extent, "XXXX");
        $this->assertCount(0, $result);
    }


    public function test_searchByText() {
        $result = $this->searchUserPointUc->searchByText("FRI", 10, $this->validToken);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByText_invalid_token() {
        $result = $this->searchUserPointUc->searchByText("FRI", 10, "XXXX");
        $this->assertCount(0, $result);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->searchUserPointUc->searchByPosition($pos, 0.5, 10, $this->validToken);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition_invalid_token() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->searchUserPointUc->searchByPosition($pos, 0.5, 10, "XXXX");
        $this->assertCount(0, $result);
    }
}
