<?php namespace NavplanTest;


use Navplan\Shared\DbConnection;


class DbConnectionMock extends DbConnection
{
    private $mockResult;


    public function __construct($mockResult)
    {
        $this->mockResult = $mockResult;
    }


    public function query(string $query)
    {
        return $this->mockResult;
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
