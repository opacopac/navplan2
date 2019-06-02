<?php declare(strict_types=1);

namespace NavplanTest\Db\MySqlDb;

use Navplan\Db\MySqlDb\DbHelper;
use NavplanTest\Db\Mock\DbServiceMock;


class DbHelperTest extends DbTestCase {
    private $dbService;


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
    }


    public function test_getStringValue() {
        $result1 = DbHelper::getStringValue($this->dbService,'abc');
        $result2 = DbHelper::getStringValue($this->dbService,'');
        $result3 = DbHelper::getStringValue($this->dbService,NULL);
        $result4 = DbHelper::getStringValue($this->dbService,NULL, "''");

        $this->assertEquals("'abc'", $result1);
        $this->assertEquals("''", $result2);
        $this->assertEquals("NULL", $result3);
        $this->assertEquals("''", $result4);
    }


    public function test_getIntValue() {
        $result1 = DbHelper::getIntValue(123);
        $result2 = DbHelper::getIntValue(-123);
        $result3 = DbHelper::getIntValue(0);
        $result4 = DbHelper::getIntValue(NULL);
        $result5 = DbHelper::getIntValue(NULL, "'0'");

        $this->assertEquals("'123'", $result1);
        $this->assertEquals("'-123'", $result2);
        $this->assertEquals("'0'", $result3);
        $this->assertEquals("NULL", $result4);
        $this->assertEquals("'0'", $result5);
    }


    public function test_getFloatValue() {
        $result1 = DbHelper::getFloatValue(123.456);
        $result2 = DbHelper::getFloatValue(0 - 123.456);
        $result3 = DbHelper::getFloatValue(0.0);
        $result4 = DbHelper::getFloatValue(NULL);
        $result5 = DbHelper::getFloatValue(NULL, "'0'");

        $this->assertEquals("'123.456'", $result1);
        $this->assertEquals("'-123.456'", $result2);
        $this->assertEquals("'0'", $result3);
        $this->assertEquals("NULL", $result4);
        $this->assertEquals("'0'", $result5);
    }


    public function test_getBoolValue() {
        $result1 = DbHelper::getBoolValue(TRUE);
        $result2 = DbHelper::getBoolValue(FALSE);
        $result3 = DbHelper::getBoolValue(NULL);
        $result4 = DbHelper::getBoolValue(NULL, "'0'");

        $this->assertEquals("'1'", $result1);
        $this->assertEquals("'0'", $result2);
        $this->assertEquals("NULL", $result3);
        $this->assertEquals("'0'", $result4);
    }
}
