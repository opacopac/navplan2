<?php declare(strict_types=1);

namespace NavplanTest\Db\MySqlDb;

use PHPUnit\Framework\TestCase;
use Navplan\Db\Domain\DbException;
use Navplan\Db\MySqlDb\MySqlDbService;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";


class MySqlDbServiceTest extends TestCase {
    private $dbService;


    private function getDbService(): MySqlDbService {
        return $this->dbService;
    }


    protected function setUp(): void {
        global $db_host, $db_user, $db_pw, $db_name;
        parent::setUp();

        $this->dbService = MySqlDbService::getInstance();
        $this->getDbService()->init($db_host, $db_user, $db_pw, $db_name);
    }


    // region openDb

    public function test_openDb_success() {
        $this->assertFalse($this->getDbService()->isOpen());
        $this->getDbService()->openDb();
        $this->assertTrue($this->getDbService()->isOpen());
    }


    public function test_openDb_error() {
        $this->getDbService()->init('xxx', 'xxx', 'xxx', 'xxx');
        $this->expectException(DbException::class);
        $this->getDbService()->openDb();
    }

    // endregion


    // region closeDb

    public function test_closeDb_success() {
        $this->getDbService()->openDb();
        $this->getDbService()->closeDb();

        $this->assertFalse($this->getDbService()->isOpen());
    }


    public function test_closeDb_throws_dbexception_on_error() {
        $this->getDbService()->openDb();
        $this->getDbService()->closeDb();
        $this->assertFalse($this->getDbService()->isOpen());
        $this->expectException(DbException::class);
        $this->getDbService()->closeDb();
    }

    // endregion


    // region escapeString

    public function test_escapeString_success() {
        $this->getDbService()->openDb();
        $result1 = $this->getDbService()->escapeString("abcabc");
        $result2 = $this->getDbService()->escapeString("abc'abc");
        $this->assertEquals("abcabc", $result1);
        $this->assertEquals("abc\\'abc", $result2);
    }


    public function test_escapeString_throw_error_if_db_closed() {
        $this->getDbService()->openDb();
        $this->getDbService()->closeDb();
        $this->expectException(DbException::class);
        $this->getDbService()->escapeString("abc");
    }

    // endregion


    // region execSingleResultQuery

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

    // endregion


    // region execMultiResultQuery

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

    // endregion


    // region execCUDQuery

    public function test_execCUDQuery_success() {
        $query = "create temporary table temp as select 'a' as a";
        $this->getDbService()->openDb();
        $result = $this->getDbService()->execCUDQuery($query);

        $this->assertEquals(TRUE, $result);
    }

    // endregion
}
