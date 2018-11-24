<?php namespace NavplanTest;

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbResult;
use PHPUnit\Framework\TestCase;


abstract class DbTestCase extends TestCase
{
    public const DUMMY_RESULT_LIST_0_ENTRY = [];
    public const DUMMY_RESULT_LIST_1_ENTRY = [array("id" => 1, "name" => "first")];
    public const DUMMY_RESULT_LIST_2_ENTRIES = [
        array("id" => 1, "name" => "first"),
        array("id" => 2, "name" => "second")];
    public const DUMMY_RESULT_LIST_3_ENTRIES = [
        array("id" => 1, "name" => "first"),
        array("id" => 2, "name" => "second"),
        array("id" => 3, "name" => "third")];


    public function getDbConnection($result): DbConnection
    {
        $conn = $this->createMock(DbConnection::class);
        $conn->method('query')
            ->willReturn($result);

        return $conn;
    }


    public function getDbResult(array $resultList): DbResult
    {
        $result = $this->createMock(DbResult::class);
        $result->method('getNumRows')
            ->willReturn(count($resultList));
        $result->method('fetch_array')
            ->willReturn(array_shift($resultList));

        return $result;
    }
}
