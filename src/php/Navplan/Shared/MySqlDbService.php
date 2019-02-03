<?php declare(strict_types=1);

namespace Navplan\Shared;

use mysqli;


class MySqlDbService implements IDbService {
    private static $instance = NULL;

    private $db_host;
    private $db_user;
    private $db_pw;
    private $db_name;
    private $connection;


    public static function getInstance(): MySqlDbService {
        if (!isset(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }


    private function __construct() {
    }


    public function init(string $db_host, string $db_user, string $db_pw, string $db_name) {
        $this->db_host = $db_host;
        $this->db_user = $db_user;
        $this->db_pw = $db_pw;
        $this->db_name = $db_name;
    }


    public function openDb(): DbConnection {
        $conn = new mysqli($this->db_host, $this->db_user, $this->db_pw, $this->db_name);
        $conn->set_charset("utf8");
        $this->connection = new DbConnection($conn);

        return $this->connection;
    }


    /***
     * @return bool
     * @throws DbException
     */
    public function closeDb(): bool {
        return $this->getConnection()->close();
    }


    public function getConnection(): DbConnection {
        return $this->connection;
    }


    /**
     * @param string $query
     * @param bool $allowZeroResults
     * @param string $errorMessage
     * @return DbResult
     * @throws DbException
     */
    public function execSingleResultQuery(string $query, bool $allowZeroResults = true, string $errorMessage = "error executing single result query"): DbResult {
        $result = $this->getConnection()->query($query);
        if ($result === FALSE
            || $result->getNumRows() > 1
            || (!$allowZeroResults && $result->getNumRows() == 0)) {
            throw new DbException($errorMessage, $this->getConnection()->getError(), $query);
        }

        return $result;
    }


    /**
     * @param string $query
     * @param string $errorMessage
     * @return DbResult
     * @throws DbException
     */
    public function execMultiResultQuery(string $query, string $errorMessage = "error executing multi result query"): DbResult {
        $result = $this->getConnection()->query($query);
        if ($result === FALSE)
            throw new DbException($errorMessage, $this->getConnection()->getError(), $query);

        return $result;
    }


    /**
     * @param string $query
     * @param string $errorMessage
     * @return bool
     * @throws DbException
     */
    public function execCUDQuery(string $query, string $errorMessage = "error executing query"): bool {
        $result = $this->getConnection()->query($query);
        if ($result === FALSE)
            throw new DbException($errorMessage, $this->getConnection()->getError(), $query);

        return $result;
    }
}
