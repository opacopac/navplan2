<?php declare(strict_types=1);

namespace NavplanTest\System\MySqlDb;

use InvalidArgumentException;
use Navplan\System\MySqlDb\DbHelper;
use NavplanTest\System\Mock\MockDbService;


class DbHelperTest extends DbTestCase {
    private MockDbService $dbService;


    protected function setUp(): void {
        $this->dbService = new MockDbService();
    }


    public function test_getStringValue() {
        $result1 = DbHelper::getDbStringValue($this->dbService,'abc');
        $result2 = DbHelper::getDbStringValue($this->dbService,'');
        $result3 = DbHelper::getDbStringValue($this->dbService,NULL);
        $result4 = DbHelper::getDbStringValue($this->dbService,NULL, "''");

        $this->assertEquals("'abc'", $result1);
        $this->assertEquals("''", $result2);
        $this->assertEquals("NULL", $result3);
        $this->assertEquals("''", $result4);
    }


    public function test_getIntValue() {
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


    public function test_getFloatValue() {
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


    public function test_getBoolValue() {
        $result1 = DbHelper::getDbBoolValue(TRUE);
        $result2 = DbHelper::getDbBoolValue(FALSE);
        $result3 = DbHelper::getDbBoolValue(NULL);
        $result4 = DbHelper::getDbBoolValue(NULL, "'0'");

        $this->assertEquals("'1'", $result1);
        $this->assertEquals("'0'", $result2);
        $this->assertEquals("NULL", $result3);
        $this->assertEquals("'0'", $result4);
    }


    public function test_getDbTimeString() {
        $timestampS = 1560461028;

        $result = DbHelper::getDbUtcTimeString($timestampS);

        $this->assertEquals("2019-06-13 21:23:48", $result);
    }


    public function test_getDbTimeString_invalid_timestamp_ms() {
        $timestampS = 1560549600000;
        $this->expectException(InvalidArgumentException::class);

        $result = DbHelper::getDbUtcTimeString($timestampS);
    }

}
