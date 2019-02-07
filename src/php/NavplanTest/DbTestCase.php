<?php declare(strict_types=1);

namespace NavplanTest;

use PHPUnit\Framework\TestCase;


abstract class DbTestCase extends TestCase {
    public const DUMMY_RESULT_LIST_0_ENTRY = [];
    public const DUMMY_RESULT_LIST_1_ENTRY = [array("id" => 1, "name" => "first")];
    public const DUMMY_RESULT_LIST_2_ENTRIES = [
        array("id" => 1, "name" => "first"),
        array("id" => 2, "name" => "second")];
    public const DUMMY_RESULT_LIST_3_ENTRIES = [
        array("id" => 1, "name" => "first"),
        array("id" => 2, "name" => "second"),
        array("id" => 3, "name" => "third")];


    public function getDbConnection($dbResult): DbConnectionMock {
        return new DbConnectionMock($dbResult);
    }


    public function getDbResult(array $resultList): DbResultMock {
        return new DbResultMock($resultList);
    }


    public function getDbConnectionFromResultList(array $resultList): DbConnectionMock {
        $result = self::getDbResult($resultList);
        return self:: getDbConnection($result);
    }


    public function addMockResultsFromResultList(DbConnectionMock $conn, array $resultList) {
        $result = self::getDbResult($resultList);
        $conn->addMockResult($result);
    }
}
