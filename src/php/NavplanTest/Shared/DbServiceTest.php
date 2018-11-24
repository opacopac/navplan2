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
    public function testExecSingleResultQueryReturnsSingleResult() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_1_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execSingleResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @throws DbException
     */
    public function testExecSingleResultQueryReturnsEmptyList() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_0_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execSingleResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     */
    public function testExecSingleResultQueryThrowsExceptionWithEmptyList() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_0_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        DbService::execSingleResultQuery($conn, "dummy", false);
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     */
    public function testExecSingleResultQueryThrowsExceptionWithMultiList() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_2_ENTRIES);
        $conn = $this->getDbConnection($expectedResult);

        DbService::execSingleResultQuery($conn, "dummy", false);
    }

    /**
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)error executing single result query(.*)/
     */
    public function testExecSingleResultQueryThrowsExceptionWithDbError() {
        $conn = $this->getDbConnection(FALSE);

        DbService::execSingleResultQuery($conn, "dummy");
    }

    // endregion


    // region execMultiResultQuery

    /**
     * @throws DbException
     */
    public function testExecMultiResultQueryReturnsMultiList() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_3_ENTRIES);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execMultiResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @throws DbException
     */
    public function testExecMultiResultQueryReturnsEmptyList() {
        $expectedResult = $this->getDbResult(self::DUMMY_RESULT_LIST_0_ENTRY);
        $conn = $this->getDbConnection($expectedResult);

        $result = DbService::execMultiResultQuery($conn, "dummy");
        $this->assertEquals($expectedResult, $result);
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)error executing multi result query(.*)/
     */
    public function testExecMultiResultQueryThrowsExceptionWithDbError() {
        $conn = $this->getDbConnection(FALSE);

        DbService::execMultiResultQuery($conn, "dummy");
    }

    // endregion


    // region execCUDQuery

    /**
     * @throws DbException
     */
    public function testExecCUDQuerySuccess() {
        $conn = $this->getDbConnection(TRUE);

        $result = DbService::execCUDQuery($conn, "dummy");
        $this->assertEquals(TRUE, $result);
    }


    /**
     * @expectedException \Navplan\Shared\DbException
     * @expectedExceptionMessageRegExp /(.*)error executing query(.*)/
     */
    public function testExecCUDQueryThrowsExceptionWithDbError() {
        $conn = $this->getDbConnection(FALSE);

        DbService::execCUDQuery($conn, "dummy");
    }

    // endregion
}
