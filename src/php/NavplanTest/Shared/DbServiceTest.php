<?php namespace NavplanTest\Shared;

use Navplan\Shared\DbService;
use Navplan\Shared\DbException;
use NavplanTest\DbTestCase;


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
     * @expectedException \Navplan\Shared\DbException
     */
    public function test_execSingleResultQuery_throws_exception_for_empty_list() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_0_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        DbService::execSingleResultQuery($conn, "dummy", false);
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     */
    public function test_execSingleResultQuery_throws_exception_for_multi_list() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_2_ENTRIES);
        $conn = $this->getDbConnection($expectedResult);

        DbService::execSingleResultQuery($conn, "dummy", false);
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)error executing single result query(.*)/
     */
    public function test_execSingleResultQuery_throws_exception_for_query_error() {
        $conn = $this->getDbConnection(FALSE);

        DbService::execSingleResultQuery($conn, "dummy");
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)custom error text(.*)/
     */
    public function test_execSingleResultQuery_throws_exception_with_custom_text() {
        $conn = $this->getDbConnection(FALSE);

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
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)error executing multi result query(.*)/
     */
    public function test_execMultiResultQuery_throws_exception_for_query_error() {
        $conn = $this->getDbConnection(FALSE);

        DbService::execMultiResultQuery($conn, "dummy");
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)custom error text(.*)/
     */
    public function test_execMultiResultQuery_throws_exception_with_custom_text() {
        $conn = $this->getDbConnection(FALSE);

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
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)error executing query(.*)/
     */
    public function test_execCUDQuery_throws_exception_for_query_error() {
        $conn = $this->getDbConnection(FALSE);

        DbService::execCUDQuery($conn, "dummy");
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)custom error text(.*)/
     */
    public function test_execCUDQuery_throws_exception_with_custom_text() {
        $conn = $this->getDbConnection(FALSE);

        DbService::execCUDQuery($conn, "dummy", "custom error text");
    }

    // endregion
}
