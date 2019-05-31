<?php declare(strict_types=1);

namespace NavplanTest\Db\MySqlDb;

use Navplan\Db\Domain\DbException;
use Navplan\Db\MySqlDb\DbService;


class DbServiceTest extends DbTestCase
{
    // region execSingleResultQuery

    /**
     * @throws DbException
     */
    public function test_execSingleResultQuery_returns_single_result() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_1_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execSingleResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @throws DbException
     */
    public function test_execSingleResultQuery_returns_empty_list() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_0_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execSingleResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @throws DbException
     */
    public function test_execSingleResultQuery_throws_exception_for_empty_list() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_0_ENTRY);
        $conn = $this->getDbConnection($expectedResult);
        $this->expectException(DbException::class);
        DbService::execSingleResultQuery($conn, "dummy", false);
    }


    /**
     * @throws DbException
     */
    public function test_execSingleResultQuery_throws_exception_for_multi_list() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_2_ENTRIES);
        $conn = $this->getDbConnection($expectedResult);
        $this->expectException(DbException::class);
        DbService::execSingleResultQuery($conn, "dummy", false);
    }


    /**
     * @throws DbException
     */
    public function test_execSingleResultQuery_throws_exception_for_query_error() {
        $conn = $this->getDbConnection(FALSE);
        $this->expectException(DbException::class);
        DbService::execSingleResultQuery($conn, "dummy");
    }


    /**
     * @throws DbException
     */
    public function test_execSingleResultQuery_throws_exception_with_custom_text() {
        $conn = $this->getDbConnection(FALSE);
        $this->expectException(DbException::class);
        DbService::execSingleResultQuery($conn, "dummy", false, "custom error text");
    }

    // endregion


    // region execMultiResultQuery

    /**
     * @throws DbException
     */
    public function test_execMultiResultQuery_returns_multi_list() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_3_ENTRIES);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execMultiResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @throws DbException
     */
    public function test_execMultiResultQuery_returns_empty_list() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_0_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execMultiResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @throws DbException
     */
    public function test_execMultiResultQuery_throws_exception_for_query_error() {
        $conn = $this->getDbConnection(FALSE);
        $this->expectException(DbException::class);
        DbService::execMultiResultQuery($conn, "dummy");
    }


    /**
     * @throws DbException
     */
    public function test_execMultiResultQuery_throws_exception_with_custom_text() {
        $conn = $this->getDbConnection(FALSE);
        $this->expectException(DbException::class);
        DbService::execMultiResultQuery($conn, "dummy", "custom error text");
    }


    // endregion


    // region execCUDQuery

    /**
     * @throws DbException
     */
    public function test_execCUDQuery_returns_true_on_success() {
        $conn = $this->getDbConnection(TRUE);
        $result = DbService::execCUDQuery($conn, "dummy");
        $this->assertEquals(TRUE, $result);
    }


    /**
     * @throws DbException
     */
    public function test_execCUDQuery_throws_exception_for_query_error() {
        $conn = $this->getDbConnection(FALSE);
        $this->expectException(DbException::class);
        DbService::execCUDQuery($conn, "dummy");
    }


    /**
     * @throws DbException
     */
    public function test_execCUDQuery_throws_exception_with_custom_text() {
        $conn = $this->getDbConnection(FALSE);
        $this->expectException(DbException::class);
        DbService::execCUDQuery($conn, "dummy", "custom error text");
    }

    // endregion
}
