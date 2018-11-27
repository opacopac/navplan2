<?php namespace NavplanTest;


use Navplan\Shared\DbConnection;


class DbConnectionMock extends DbConnection
{
    private $mockResultList = [];


    public function __construct($mockResult)
    {
        $this->addMockResult($mockResult);
    }


    public function addMockResult($mockResult)
    {
        array_push($this->mockResultList, $mockResult);
    }


    public function query(string $query)
    {
        return array_shift($this->mockResultList);
    }


    public function real_escape_string(string $escapeString): string
    {
        return $escapeString;
    }


    public function getError(): string
    {
        return "error";
    }


    public function close(): bool
    {
        return TRUE;
    }
}
