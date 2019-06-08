<?php declare(strict_types=1);

namespace Navplan\Db\MySqlDb;

use Exception;
use mysqli;
use Navplan\Db\Domain\DbException;
use Navplan\Db\UseCase\IDbService;
use Navplan\Db\UseCase\IDbResult;


class MySqlDbService implements IDbService {
    private static $instance = NULL;

    private $db_host;
    private $db_user;
    private $db_pw;
    private $db_name;
    private $connection;


    private function getConnection(): mysqli {
        return $this->connection;
    }


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


    /**
     * @throws DbException
     */
    public function openDb() {
        try {
            $this->connection = new mysqli($this->db_host, $this->db_user, $this->db_pw, $this->db_name);
            $this->connection->set_charset("utf8");
        } catch (Exception $ex) {
            throw new DbException('error opening DB', $ex->getMessage());
        }
    }


    public function isOpen() {
        return $this->connection !== NULL;
    }


    /***
     * @throws DbException
     */
    public function closeDb() {
        if ($this->connection === NULL) {
            throw new DbException('error closing DB', 'no db connection');
        }

        try {
            $this->getConnection()->close();
            $this->connection = NULL;
        } catch (Exception $ex) {
            throw new DbException('error closing DB', $ex->getMessage());
        }
    }


    /**
     * @param string $escapeString
     * @return string
     * @throws DbException
     */
    public function escapeString(string $escapeString): string {
        if ($this->connection === NULL) {
            throw new DbException('error escaping string', 'no db connection');
        }

        return $this->getConnection()->real_escape_string($escapeString);
    }


    /**
     * @param string $query
     * @param bool $allowZeroResults
     * @param string $errorMessage
     * @return MySqlDbResult
     * @throws DbException
     */
    public function execSingleResultQuery(string $query, bool $allowZeroResults = true, string $errorMessage = "error executing single result query"): IDbResult {
        $result = $this->getConnection()->query($query);
        if ($result === FALSE
            || $result->num_rows > 1
            || (!$allowZeroResults && $result->num_rows == 0)
        ) {
            throw new DbException($errorMessage, $this->getConnection()->error, $query);
        }

        return new MySqlDbResult($result);
    }


    /**
     * @param string $query
     * @param string $errorMessage
     * @return MySqlDbResult
     * @throws DbException
     */
    public function execMultiResultQuery(string $query, string $errorMessage = "error executing multi result query"): IDbResult {
        $result = $this->getConnection()->query($query);
        if ($result === FALSE) {
            throw new DbException($errorMessage, $this->getConnection()->error, $query);
        }

        return new MySqlDbResult($result);
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
            throw new DbException($errorMessage, $this->getConnection()->error, $query);

        return $result;
    }


    public function getInsertId(): int {
        return intval($this->getConnection()->insert_id);
    }
}
