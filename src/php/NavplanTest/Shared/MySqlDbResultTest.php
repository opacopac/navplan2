<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use mysqli;
use Navplan\Shared\MySqlDbResult;
use PHPUnit\Framework\TestCase;

require_once __DIR__ . "/../../config_test.php";


class MySqlDbResultTest extends TestCase {
    private $connection;

    private function getConnection(): mysqli {
        return $this->connection;
    }


    protected function setUp() {
        global $db_host, $db_user, $db_pw, $db_name;
        parent::setUp();

        $this->connection = new mysqli($db_host, $db_user, $db_pw, $db_name);
        $this->connection->set_charset("utf8");
    }


    protected function tearDown() {
        parent::tearDown();

        $this->getConnection()->close();
    }


    public function test__construct_success() {
        $query = "SELECT 3";
        $result = $this->getConnection()->query($query);
        $dbResult = new MySqlDbResult($result);

        $this->assertNotNull($dbResult);
        $this->assertTrue($dbResult instanceof MySqlDbResult);
    }


    public function test_getNumRows() {
        $query = "SELECT 3 AS col1, 4 AS col2 UNION SELECT 5 AS col1, 6 AS col2";
        $result = $this->getConnection()->query($query);
        $dbResult = new MySqlDbResult($result);

        $this->assertEquals(2, $dbResult->getNumRows());
    }

    public function test_fetch_assoc() {
        $query = "SELECT 3 AS col1, 4 AS col2 UNION SELECT 5 AS col1, 6 AS col2";
        $result = $this->getConnection()->query($query);
        $dbResult = new MySqlDbResult($result);
        $row1 = $dbResult->fetch_assoc();
        $row2 = $dbResult->fetch_assoc();
        $row3 = $dbResult->fetch_assoc();

        $this->assertEquals($row1['col1'], 3);
        $this->assertEquals($row1['col2'], 4);
        $this->assertEquals($row2['col1'], 5);
        $this->assertEquals($row2['col2'], 6);
        $this->assertNull($row3);
    }
}
