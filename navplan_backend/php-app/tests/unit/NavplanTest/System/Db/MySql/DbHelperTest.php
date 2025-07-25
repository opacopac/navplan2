<?php declare(strict_types=1);

namespace NavplanTest\System\Db\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\MySql\DbHelper;
use NavplanTest\System\Db\Mock\MockDbService;


class DbHelperTest extends DbTestCase
{
    private MockDbService $dbService;


    protected function setUp(): void
    {
        $this->dbService = new MockDbService();
    }


    public function test_getStringValue()
    {
        $result1 = DbHelper::getDbStringValue($this->dbService, 'abc');
        $result2 = DbHelper::getDbStringValue($this->dbService, '');
        $result3 = DbHelper::getDbStringValue($this->dbService, NULL);
        $result4 = DbHelper::getDbStringValue($this->dbService, NULL, "''");

        $this->assertEquals("'abc'", $result1);
        $this->assertEquals("''", $result2);
        $this->assertEquals("NULL", $result3);
        $this->assertEquals("''", $result4);
    }


    public function test_getIntValue()
    {
        $result1 = DbHelper::getDbIntValue(123);
        $result2 = DbHelper::getDbIntValue(-123);
        $result3 = DbHelper::getDbIntValue(0);
        $result4 = DbHelper::getDbIntValue(NULL);
        $result5 = DbHelper::getDbIntValue(NULL, "'0'");

        $this->assertEquals("'123'", $result1);
        $this->assertEquals("'-123'", $result2);
        $this->assertEquals("'0'", $result3);
        $this->assertEquals("NULL", $result4);
        $this->assertEquals("'0'", $result5);
    }


    public function test_getFloatValue()
    {
        $result1 = DbHelper::getDbFloatValue(123.456);
        $result2 = DbHelper::getDbFloatValue(0 - 123.456);
        $result3 = DbHelper::getDbFloatValue(0.0);
        $result4 = DbHelper::getDbFloatValue(NULL);
        $result5 = DbHelper::getDbFloatValue(NULL, "'0'");

        $this->assertEquals("'123.456'", $result1);
        $this->assertEquals("'-123.456'", $result2);
        $this->assertEquals("'0'", $result3);
        $this->assertEquals("NULL", $result4);
        $this->assertEquals("'0'", $result5);
    }


    public function test_getBoolValue()
    {
        $result1 = DbHelper::getDbBoolValue(TRUE);
        $result2 = DbHelper::getDbBoolValue(FALSE);
        $result3 = DbHelper::getDbBoolValue(NULL);
        $result4 = DbHelper::getDbBoolValue(NULL, "'0'");

        $this->assertEquals("'1'", $result1);
        $this->assertEquals("'0'", $result2);
        $this->assertEquals("NULL", $result3);
        $this->assertEquals("'0'", $result4);
    }


    public function test_getDbTimeString()
    {
        $timestampS = 1560461028;

        $result = DbHelper::getDbUtcTimeString($timestampS);

        $this->assertEquals("2019-06-13 21:23:48", $result);
    }


    public function test_getDbTimeString_invalid_timestamp_ms()
    {
        $timestampS = 1560549600000;
        $this->expectException(InvalidArgumentException::class);

        DbHelper::getDbUtcTimeString($timestampS);
    }


    public function test_getDbPointStringFromPos()
    {
        // given
        $position = new Position2d(7.5, 47.5);

        // when
        $result = DbHelper::getDbPointStringFromPos($position);

        // then
        $this->assertEquals("ST_PointFromText('POINT(7.5 47.5)')", $result);
    }


    public function test_getDbLineString() {
        // given
        $pos1 = new Position2d(7.5, 47.5);
        $pos2 = new Position2d(8.0, 48.0);
        $pos3 = new Position2d(8.5, 48.5);
        $line = new Line2d([$pos1, $pos2, $pos3]);

        // when
        $result = DbHelper::getDbLineString($line);

        // then
        $this->assertEquals("ST_LineFromText('LINESTRING(7.5 47.5,8 48,8.5 48.5)')", $result);
    }


    public function test_getDbLineString_with_array() {
        // given
        $pos1 = new Position2d(7.5, 47.5);
        $pos2 = new Position2d(8.0, 48.0);
        $pos3 = new Position2d(8.5, 48.5);
        $line = [$pos1, $pos2, $pos3];

        // when
        $result = DbHelper::getDbLineString($line);

        // then
        $this->assertEquals("ST_LineFromText('LINESTRING(7.5 47.5,8 48,8.5 48.5)')", $result);
    }


    public function test_getDbPolygonString_with_ring2d()
    {
        // given
        $pos1 = new Position2d(7.5, 47.5);
        $pos2 = new Position2d(8.0, 48.0);
        $pos3 = new Position2d(8.5, 48.5);
        $pos4 = new Position2d(7.5, 47.5); // closing the ring
        $ring = new Ring2d([$pos1, $pos2, $pos3, $pos4]);

        // when
        $result = DbHelper::getDbPolygonString($ring);

        // then
        $this->assertEquals("ST_PolyFromText('POLYGON((7.5 47.5,8 48,8.5 48.5,7.5 47.5))')", $result);
    }


    public function test_getDbPolygonString_with_extent2d()
    {
        // given
        $minPos = new Position2d(7.5, 47.5);
        $maxPos = new Position2d(8.0, 48.0);
        $extent = new Extent2d($minPos, $maxPos);

        // when
        $result = DbHelper::getDbPolygonString($extent);

        // then
        $this->assertEquals("ST_PolyFromText('POLYGON((7.5 47.5,8 47.5,8 48,7.5 48,7.5 47.5))')", $result);
    }


    public function test_getDbPolygonString_with_array()
    {
        // given
        $polygon = [
            [7.5, 47.5],
            [8.0, 48.0],
            [8.5, 48.5],
            [7.5, 47.5] // closing the polygon
        ];

        // when
        $result = DbHelper::getDbPolygonString($polygon);

        // then
        $this->assertEquals("ST_PolyFromText('POLYGON((7.5 47.5,8 48,8.5 48.5,7.5 47.5))')", $result);
    }


    public function test_getDbPolygonString_with_unclosed_array() {
        // given
        $polygon = [
            [7.5, 47.5],
            [8.0, 48.0],
            [8.5, 48.5]
            // no closing point provided
        ];

        // when
        $result = DbHelper::getDbPolygonString($polygon);

        // then
        $this->assertEquals("ST_PolyFromText('POLYGON((7.5 47.5,8 48,8.5 48.5,7.5 47.5))')", $result);
    }
}
