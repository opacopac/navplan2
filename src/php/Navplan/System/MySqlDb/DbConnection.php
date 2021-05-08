<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use Exception;
use mysqli;
use mysqli_result;
use Navplan\System\DomainModel\DbException;


class DbConnection
{
    public function __construct(private mysqli $conn) {
    }


    public function getMySqli(): mysqli {
        return $this->conn;
    }


    public function real_escape_string(string $escapeString): string {
        return $this->conn->real_escape_string($escapeString);
    }


    public function query(string $query) {
        $result = $this->conn->query($query);
        if ($result instanceof mysqli_result)
            return new MySqlDbResult($result);
        else
            return $result;
    }


    public function getInsertId() {
        return $this->conn->insert_id;
    }


    public function getError(): string {
        return $this->conn->error;
    }


    /***
     * @return bool
     * @throws DbException
     */
    public function close(): bool {
        try {
            return $this->conn->close();
        } catch (Exception $ex) {
            throw new DbException('error closing DB', $ex->getMessage(), 'n/a');
        }
    }
}
