<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use PHPUnit\Framework\TestCase;
use Navplan\Shared\MySqlDbService;

require_once __DIR__ . "/../../config_test.php";


class MySqlDbServiceTest extends TestCase {
    private $dbService;


    private function getDbService(): MySqlDbService {
        return $this->dbService;
    }


    protected function setUp() {
        global $db_host, $db_user, $db_pw, $db_name;
        parent::setUp();

        $this->dbService = MySqlDbService::getInstance();
        $this->getDbService()->init($db_host, $db_user, $db_pw, $db_name);
    }


    public function test_openDb() {
        $conn = $this->getDbService()->openDb();

        $this->assertNotNull($conn);
        $this->assertTrue($conn instanceof DbConnection);
    }


    public function test_closeDb_success() {
        $this->getDbService()->openDb();
        $result = $this->getDbService()->closeDb();

        $this->assertTrue($result);
    }


    public function test_closeDb_throws_dbexception_on_error() {
        $this->getDbService()->openDb();
        $result = $this->getDbService()->closeDb();
        $this->assertTrue($result);
        $this->expectException(DbException::class);
        $this->getDbService()->closeDb();
    }


    public function test_getConnection() {
        $conn1 = $this->getDbService()->openDb();
        $conn2 = $this->getDbService()->getConnection();

        $this->assertNotNull($conn2);
        $this->assertTrue($conn2 instanceof DbConnection);
        $this->assertEquals($conn1, $conn2);
    }


    public function test_execSingleResultQuery_success() {
        $query = "SELECT 3";
        $this->getDbService()->openDb();
        $result = $this->getDbService()->execSingleResultQuery($query);

        $this->assertEquals(1, $result->getNumRows());
    }


    public function test_execSingleResultQuery_throws_error_for_multiple_results() {
        $query = "SELECT 3 UNION SELECT 4";
        $this->getDbService()->openDb();

        $this->expectException(DbException::class);
        $this->getDbService()->execSingleResultQuery($query);
    }


    public function test_execSingleResultQuery_throws_error_for_invalid_query() {
        $query = "SELOECT 3";
        $this->getDbService()->openDb();

        $this->expectException(DbException::class);
        $this->getDbService()->execSingleResultQuery($query);
    }


    public function test_execSingleResultQuery_0_results_success() {
        $query = "SELECT (SELECT 3) LIMIT 0";
        $this->getDbService()->openDb();
        $result = $this->getDbService()->execSingleResultQuery($query);

        $this->assertEquals(0, $result->getNumRows());
    }


    public function test_execSingleResultQuery_0_results_error() {
        $query = "SELECT (SELECT 3) LIMIT 0";
        $this->getDbService()->openDb();

        $this->expectException(DbException::class);
        $this->getDbService()->execSingleResultQuery($query, false);
    }


    public function test_execMultiResultQuery_success() {
        $query = "SELECT 3 UNION SELECT 4";
        $this->getDbService()->openDb();
        $result = $this->getDbService()->execMultiResultQuery($query);

        $this->assertEquals(2, $result->getNumRows());
    }


    public function test_execMultiResultQuery_throws_error_for_invalid_query() {
        $query = "SELOECT 3";
        $this->getDbService()->openDb();

        $this->expectException(DbException::class);
        $this->getDbService()->execMultiResultQuery($query);
    }


    public function test_execCUDQuery_success() {
        $query = "create temporary table temp as select 'a' as a";
        $this->getDbService()->openDb();
        $result = $this->getDbService()->execCUDQuery($query);

        $this->assertEquals(TRUE, $result);
    }
}
