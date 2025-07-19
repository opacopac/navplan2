<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\Db\MySql\DbConnection;


class MockDbConnection extends DbConnection
{
    private array $mockResultList = [];


    public function __construct($mockResult) {
        $this->addMockResult($mockResult);
    }


    public function addMockResult($mockResult) {
        array_push($this->mockResultList, $mockResult);
    }


    public function query(string $query) {
        return array_shift($this->mockResultList);
    }


    public function real_escape_string(string $escapeString): string {
        return $escapeString;
    }


    public function getError(): string {
        return "error";
    }


    public function close(): bool {
        return TRUE;
    }
}
