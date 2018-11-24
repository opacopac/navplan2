<?php namespace Navplan\Shared;

use mysqli;
use mysqli_result;


class DbConnection
{
    private $conn;


    public function __construct(mysqli $conn)
    {
        $this->conn = $conn;
    }


    public function getMySqli(): mysqli
    {
        return $this->conn;
    }


    public function real_escape_string(string $escapeString): string
    {
        return $this->conn->real_escape_string($escapeString);
    }


    public function query(string $query)
    {
        $result = $this->conn->query($query);
        if ($result instanceof mysqli_result)
            return new DbResult($result);
        else
            return $result;
    }


    public function getInsertId()
    {
        return $this->conn->insert_id;
    }


    public function getError(): string
    {
        return $this->conn->error;
    }


    public function close(): bool {
        return $this->conn->close();
    }
}
