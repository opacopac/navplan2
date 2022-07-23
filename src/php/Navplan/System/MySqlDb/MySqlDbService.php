<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use Exception;
use mysqli;
use Navplan\System\DomainModel\DbException;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainModel\IDbStatement;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;


class MySqlDbService implements IDbService {
    private string $db_host;
    private string $db_user;
    private string $db_pw;
    private string $db_name;
    private ?mysqli $connection = NULL;


    public function __construct(
        private ILoggingService $loggingService
    ) {
    }


    public function __destruct() {
        if ($this->isOpen()) {
            $this->closeDb();
        }
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
            $this->connection->close();
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
        $this->autoOpen(); // TODO

        return $this->connection->real_escape_string($escapeString);
    }


    public function escapeAndQuoteString(string $escapeString): string {
        return "'" . $this->escapeString($escapeString) . "'";
    }


    public function escapeAndQuoteStringOrNull(?string $escapeString): string {
        if ($escapeString !== NULL) {
            return $this->escapeAndQuoteString($escapeString);
        } else {
            return "NULL";
        }
    }


    /**
     * @param string $query
     * @param bool $allowZeroResults
     * @param string $errorMessage
     * @return MySqlDbResult
     * @throws DbException
     */
    public function execSingleResultQuery(string $query, bool $allowZeroResults = true, string $errorMessage = "error executing single result query"): IDbResult {
        $this->autoOpen();

        $result = $this->connection->query($query);
        if ($result === FALSE
            || $result->num_rows > 1
            || (!$allowZeroResults && $result->num_rows == 0)
        ) {
            throw new DbException($errorMessage, $this->connection->error, $query);
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
        $this->autoOpen();

        $result = $this->connection->query($query);
        if ($result === FALSE) {
            throw new DbException($errorMessage, $this->connection->error, $query);
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
        $this->autoOpen();

        $result = $this->connection->query($query);
        if ($result === FALSE)
            throw new DbException($errorMessage, $this->connection->error, $query);

        return $result;
    }


    /**
     * @return int
     * @throws DbException
     */
    public function getInsertId(): int {
        if ($this->connection === NULL) {
            throw new DbException('error getting insert id', 'no db connection');
        }

        return intval($this->connection->insert_id);
    }


    /**
     * @param string $query
     * @return IDbStatement
     * @throws DbException
     */
    public function prepareStatement(string $query): IDbStatement {
        $this->autoOpen();

        $stmt = $this->connection->prepare($query);
        if ($stmt !== false) {
            return new MySqlDbStatement($stmt, $this->loggingService);
        } else {
            throw new DbException("error: could not prepare statment", "", $query);
        }
    }


    /**
     * @throws DbException
     */
    private function autoOpen() {
        if (!$this->isOpen()) {
            $this->openDb();
        }
    }
}
