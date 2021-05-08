<?php declare(strict_types=1);

namespace NavplanTest\System\MySqlDb;

use NavplanTest\System\Mock\MockDbConnection;
use NavplanTest\System\Mock\MockDbResult;
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


    public function getDbConnection($dbResult): MockDbConnection {
        return new MockDbConnection($dbResult);
    }


    public function getDbResult(array $resultList): MockDbResult {
        return new MockDbResult($resultList);
    }


    public function getDbConnectionFromResultList(array $resultList): MockDbConnection {
        $result = self::getDbResult($resultList);
        return self:: getDbConnection($result);
    }


    public function addMockResultsFromResultList(MockDbConnection $conn, array $resultList) {
        $result = self::getDbResult($resultList);
        $conn->addMockResult($result);
    }
}
